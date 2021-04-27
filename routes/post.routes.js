const Router = require('express')
const router = new Router()
const postController = require("../controller/post.controller")

router.post('/post', postController.createPost)
router.get('/post', postController.getPosts)
router.get('/onePost', postController.getOnePost)
router.put('/post', postController.updatePost)
router.del('/post/', postController.deletePost)



module.exports = router