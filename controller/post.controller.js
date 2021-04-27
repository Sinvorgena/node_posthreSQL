const db = require('../db')

class PostController{
    async createPost(req, res){
        const {title, content, userId} = req.body
        const newPost = await db.query(`INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, [title, content, userId])
        res.json(newPost.rows[0])
    }
    async getPosts(req, res){
        const id = req.query.userId
        const posts = await db.query(`SELECT * FROM post where user_id = $1`,[id])
        res.json(posts.rows)
    }
    async getOnePost(req, res){
        const userId = req.query.userId
        const postId = req.query.postId
        const post = await db.query(`SELECT * FROM post where user_id = $1 AND id=$2 `,[userId,postId])
        res.json(post.rows[0])
    }
    async updatePost(req, res){
        const {id, title, content, user_id} = req.body
        const post = await db.query(`UPDATE post set title =$1, content = $2 where user_id = $4 AND id=$3 RETURNING *`,[title, content,id,user_id])
        res.json(post.rows[0])
    }
    async deletePost(req, res){
        const postId = req.query.postId
        const userId = req.query.userId
        const post = await db.query(`DELETE FROM post where user_id = $1 AND id=$2 `,[userId ,postId])
        res.json(post.rows)
    }
}

module.exports = new PostController()