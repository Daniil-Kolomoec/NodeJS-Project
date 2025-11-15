const PostService = require('./post.service')

const PostController = {
    async getAllPosts(request, response) {
        try {
            let skip, take;

            if (request.query.skip && !isNaN(+request.query.skip)) {
                skip = +request.query.skip
            }
            if (request.query.take && !isNaN(+request.query.take)) {
                take = +request.query.take
            }

            const result = await PostService.getAllPosts(take, skip)
            response.status(200).json(result)
        } catch (error) {
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json({ message: "Random error" })
        }
    },

    async getPostById(request, response) {
        try {
            const id = +request.params.id

            if (isNaN(id)) {
                response.status(400).json({ message: "ID must be a number" })
                return
            }

            const post = await PostService.getPostById(id)
            response.status(200).json(post)
        } catch (error) {
            if (error.message === "Post not found") {
                response.status(404).json({ message: "Post not found" })
                return
            }
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json({ message: "Random error" })
        }
    },

    async createPost(request, response) {
        try {
            const body = request.body

            if (!body.title) {
                response.status(422).json({ message: "Validation error: Title is required!" })
                return
            }
            if (!body.description) {
                response.status(422).json({ message: "Validation error: Description is required!" })
                return
            }
            if (!body.image) {
                response.status(422).json({ message: "Validation error: Image is required!" })
                return
            }

            const newPost = await PostService.createPost(body)
            response.status(201).json(newPost)
        } catch (error) {
            console.log(`Error!!!\n\n${error}`)
            response.status(500).json({ message: "Random error" })
        }
    }
}

module.exports = PostController