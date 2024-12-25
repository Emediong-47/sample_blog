import bodyParser from "body-parser";
import express from "express"
const app = express();
const port = 3000;

const posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ title, content });
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});