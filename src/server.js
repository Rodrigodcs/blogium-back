import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());




const posts = [
    {
        id: 1,
        title: 'Hello World',
        coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 2
    },
    {
        id: 2,
        title: 'Test',
        coverUrl: 'https://meups.com.br/wp-content/uploads/2018/08/hunter-x-hunter-900x503.jpg',
        contentPreview: 'testandooooooo o backkkkk',
        content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 0
    }
];

const comments=[
    {
        id: 1,
        postId: 1,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
    }, 
    {
        id: 2,
        postId: 1,
        author: 'Maria',
        content: 'Como faz pra dar palmas?'
    }, 
    {
        id: 3,
        postId: 2,
        author: 'Rodrigo',
        content: 'Top demais'
    },
    {
        id: 4,
        postId: 2,
        author: 'Rodrigo',
        content: 'Achei massa'
    }
]

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id)
    res.send(posts.find(post=>post.id===id))
})

app.get("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id)
    res.send(comments.filter(comment=>comment.postId===id))
})

app.post("/posts", (req, res) => {
    const newPost={
        id:posts[posts.length-1].id+1,
        title: req.body.title,
        coverUrl: req.body.coverUrl,
        contentPreview: req.body.content.substring(0,50),
        content: req.body.content,
        commentCount: 0
    }
    posts.push(newPost)
    console.log(posts)
})

app.post("/posts/:id/comments", (req, res) => {
    const newComment={
        id: comments[comments.length-1].id+1,
        postId: parseInt(req.params.id),
        author: req.body.author,
        content: req.body.content
    }
    posts.find(post=>post.id===parseInt(req.params.id)).commentCount++
    comments.push(newComment)
})

app.put("/posts/:id", (req, res) => {
    const postToBeChanged = posts.find(post=>post.id===parseInt(req.params.id))
    postToBeChanged.title= req.body.title
    postToBeChanged.coverUrl= req.body.coverUrl
    postToBeChanged.contentPreview= req.body.content.substring(0,50),
    postToBeChanged.content= req.body.content
    console.log(posts)
})

app.delete("/posts/:id", (req, res) => {
    const index=posts.findIndex(post=>post.id===parseInt(req.params.id))
    console.log(index)
    console.log(posts)
    console.log(index)
})


app.listen(4000)