const express = require('express')

// setting up the body parser library
const parser = require('body-parser')
const encodedParser = parser.urlencoded( {extended: true })

// setting up multer library
const multer = require('multer')
const uploadProcessor = multer( {dest: 'public/upload/' })

const app = express()

app.use(express.static('public'))
app.use(encodedParser)
app.set('view engine', 'ejs')

// setting up global variables

let posts = []

app.get('/', (request, response)=>{

    let data = {
        allPosts: posts
    }

    data.visible = true

    response.render('template.ejs', data)
})

app.get('/submit', (request, response)=>{
    // query is everything that comes after the ? in the url
    // ?guest=sam&message=hi+this+is+a+cool+site%21&submitbtn=write
    console.log(request.query.user)

    let user = request.query.user

    // object that holds the data that comes in from ONE form request
    let messageData = {

        title: request.query.title,
        displayName: request.query.user,
        text: request.query.message
        
    }

    messages.push(messageData)

    // response.send('thank you for writing a message, ' + guest) 
})

app.get('/post', (req, res)=>{

    res.render('post.ejs', data)
})

app.listen(5001, ()=>{
    console.log('server started')
})