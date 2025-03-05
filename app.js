import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcryptjs";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

const posts = [];

async function getPosts(query, params = []) {
    const result = await db.query(query, params);
    const posts = result.rows;
    console.log(posts);
    return posts;
  }

app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60
    }
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/home", async(req, res) => {
    console.log(req.user);
    
    try {
        if (!req.isAuthenticated() || !req.user) {
            res.redirect("login");
        }
        console.log("Authenticated User:", req.user);

        const posts = await getPosts(
            `SELECT posts.title, posts.post_details, users.name, users.id
            FROM posts
            INNER JOIN users
            ON posts.user_id = users.id
            WHERE users.id = $1;`, [req.user.id]
        );

        res.render("home", { posts: posts, user: req.user });
        
    } catch (error) {
        console.error("Error retriving user:", error);
        res.redirect("/login");
    }
});
app.get("/new", (req, res) => {
    res.render("new");
});

app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  
app.get("/auth/google/blog", 
    passport.authenticate("google", { failureRedirect: "/login" }), 
    (req, res) => {
        console.log("Google OAuth login successful:", req.user);
        res.redirect("/home");
    }
);

app.get("/auth/facebook",
    passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
  
app.get("/auth/facebook/blog", 
    passport.authenticate("facebook", { failureRedirect: "/login" }), 
    (req, res) => {
        console.log("Facebook OAuth login successful:", req.user);
        res.redirect("/home");
    }
);

app.post("/posts", async(req, res) => {
    const { title, content } = req.body;
    if (!req.user) {
        console.log("Unauthorized: Please log in first.");
    }
    try {
        if (title && content) {
            // posts.push({ title, content });
            await db.query("INSERT INTO posts (title, post_details, user_id) VALUES ($1, $2, $3)", [title, content, req.user.id]);
        }
    res.redirect("/home");
    } catch (error) {
        console.error(error);
    }
});

app.post("/login",
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login"
    })
);


app.post("/register", async (req, res) => {
    const name = req.body["name"];
    const email = req.body["email"];
    const password = req.body["password"];

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (checkResult.rows.length > 0) {
            req.redirect("/login");
        } else {
            bcrypt.hash(password, saltRounds, async(err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err.stack);
                } else {
                    const result = await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash]);
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        console.log("Sucessfully Registered!");
                        res.redirect("/home");
                    });
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
});

passport.use("local",
    new Strategy({ usernameField: "email" }, async function verify(email, password, cb) {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const storedHashedPassword = user.password;
                bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                    if (err) {
                        console.error("Error Comparing password:", err.stack);
                        return cb(err);
                    }
                    return valid ? cb(null, user) : cb(null, false, { message: "Invalid password" });
                });
            } else {
                return cb(null, false, {message: "User not found"});
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            return cb(error)
        }
    })
);

passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/blog",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          console.log(profile);
          const result = await db.query("SELECT * FROM users WHERE email = $1", [
            profile.email,
          ]);
          let user;
          if (result.rows.length === 0) {
            const newUser = await db.query(
              "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
              [profile.displayName, profile.email, profile.id]
            );
            user = newUser.rows[0];
          } else {
            user = result.rows[0];
            return cb(null, result.rows[0]);
          }

          return cb(null, user);

        } catch (err) {
          return cb(err);
        }
      }
    )
  );

passport.use("facebook",
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/blog"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const result = await db.query("SELECT * FROM users WHERE password = $1", [profile.id]);
                let user;
                if (result.rows.length === 0) {
                  const newUser = await db.query(
                    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
                    [profile.displayName, profile.provider, profile.id]);
                    user = newUser.rows[0];
                } else {
                    user = result.rows[0];
                    return done(null, result.rows[0]);
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});