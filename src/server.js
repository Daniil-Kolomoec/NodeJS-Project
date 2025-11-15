const express = require('express')

const path = require('path')

const fsPromises = require('fs/promises')

const fs = require('fs')

const app = express()

const HOST = "localhost"
const PORT = 8001

app.use(express.json())

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, 'UTF-8'))


app.get('/', (req, res) => {
    res.json('Server is working')
})


app.get('/posts', (req, res) => {
    const skip = req.query.skip
    const take = req.query.take

    if (skip && isNaN(+skip)) {
        res.status(400).json("Skip must be an Integer")
        return
    }

    if (take && isNaN(+take)) {
        res.status(400).json("Take must be an Integer")
        return
    }

    const skipNum = +skip || 0
    const takeNum = +take || posts.length

    const result = posts.slice(skipNum, skipNum + takeNum)
    res.status(200).json(result)
})


app.get('/posts/:id', (req, res) => {
    const id = +req.params.id

    if (isNaN(id)) {
        res.status(400).json("ID must be a number")
        return
    }

    const post = posts.find(p => p.id === id)
    if (!post) {
        res.status(404).json("Post not found")
        return
    }

    res.status(200).json(post)
})

app.post('/posts', async(request, response) => {
    try {
        let body = request.body

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

        let newId = posts.length + 1
        let newPost = {
            id: newId,
            ...body
        }

        posts.push(newPost)

        await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 2))

        response.status(201).json(newPost)
    } catch (error) {
        console.log(`Error!!!\n\n${error}`)
        response.status(500).json({ message: "Random error" })
    }
})

app.listen(PORT, HOST, () => {
    console.log("Server is running on http://localhost:8001")
})

// Server is running on http://localhost:8001"