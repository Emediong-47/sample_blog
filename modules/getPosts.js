import { db } from "../app.js";

export async function getPosts(userId) {
    const result = await db.query(
       `SELECT posts.title, posts.post_details, users.name, users.id, posts.post_id
        FROM posts
        INNER JOIN users
        ON posts.user_id = users.id
        WHERE users.id = $1
        ORDER BY posts.post_id ASC ;`, [userId]
    );
    const posts = result.rows;
    console.log(posts);
    return posts;
}