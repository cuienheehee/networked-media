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

let filteredLength = null
let filteredPalette = null
let filteredStatus = null

let posts = [

    //below are pre-written posts. each friend will be credited above their respective post! huge thanks to them.
    
    { 
        // Hannah's post
        "title": "LF sockmate",
        "displayName": "michael_sock",
        "text": "hi my (24m) name is michael and i'm looking for my sockmate. " +
        "i lost her in the wash club a couple days ago and i keep coming back hoping to see her but i havent seen her. " +
        "she's just like me, but my other half, and i really want to see her again. " +
        "if you look like her (boat sock, colorful) pls email me: michael.sock@sockmail.com.",
        "sockLength": "boat",
        "sockPalette": "colourful",
        "sockStatus": "found"
    },

    {
        // my post
        "title": "Let's Adventure Together",
        "displayName": "socktrek87",
        "text": "Hello I am a grey calf sock who's looking to get back into the pairing game. " +
        "I lost my sockmate in the wash two years ago and life really has not been the same. " +
        "I am looking for a grey calf sock like me who isn't afraid of a little trek and adventure. "+
        "If that sounds like you, please email me at grankle@sockmail.com. " +
        "I believe that we will have a great time together.",
        "sockLength": "calf",
        "sockPalette": "neutral",
        "sockStatus": "looking"
    },

    {
        // Rokky's post
        "title": "Seeking crew member",
        "displayName": "blues_crews",
        "text": "SINGLE CREW sock, white with blue stripes, comfortable, clean, and reliable in daily use, " +
        "seeks correspondence: no objection to old sock if somewhat matching. Lonely but eager and hardworking, " +
        "it has been many washes since I've found a pair.",
        "sockLength": "ankle",
        "sockPalette": "neutral",
        "sockStatus": "found"
    },

    {
        // Isa's post
        "title": "black floral sock",
        "displayName": "blackflowrrlace",
        "text": "I'm seeking the greater pleasures in life. Something between a fling and a soulmate, " +
        "but you're more than welcome if you believe you're the latter for me. I can be a cheeky ankle sock " +
        "that just pokes out over the top of the shoe or the daring calf sock that accents the outfit. I'm looking for someone " +
        "to be the steam of my chai tea latte, someone to be the teeth seconds away from breaking the peel of the apple, someone " +
        "who is the wind that rustles my collar and playful sticks a leaf to my side: maybe it was fleeting, temporary, but that doesn't " +
        "mean it didn't exist. I'm less fanciful than you think, and I can match with any style of sock, because I AM the style. " +
        "If that sounds like your type of life, dm me at @blackflowrrlace 🖤🌹🖤",
        // photo taken by Isa, used with permission.
        "imgSrc": "upload/isa-sock.png",
        "sockLength": "calf",
        "sockPalette": "neutral",
        "sockStatus": "found"
    },

    {
        // Audrey's post
        "title": "above the shin",
        "displayName": "socknossieur",
        "text": "i'm a black ankle sock with gray details. i grew up in a korean accessory store in flushing " +
        "among hundreds of relatives, but i've trained my individualism after losing my other half. i'm a bit of a minimalist, " +
        "but i'm far from simple — note the cashmere blend, please. i'm looking for a pair who's equally refined, " +
        "smart, and honest about who they are. so no sock puppets — been there, done that. and nothing low cut. i only date above the shin",
        // photo taken by Audrey, used with permission.
        "imgSrc": "upload/audrey-sock.jpg",
        "sockLength": "ankle",
        "sockPalette": "neutral",
        "sockStatus": "looking"

    },

    {
        // CJ's post
        "title": "SOCK SEEKING PAIR!",
        "displayName": "cj.png",
        "text": "I'm a lonely single sock looking for love, recently separated from my pair in the wash. " +
        "A bit more about me personally: I'm a well-loved blue and grey argyle crew-length sock. " +
        "I was with my previous pair for a number of years, but we amicably separated in the wash one year ago. " +
        "She's already moved on with a new sock, so now I'm jumping back into the laundry basket to look for a new pair and begin a new chapter in my life. " +
        "A few holes have been worn into my heel, but I'm willing to work on darning them with the right partner. " +
        "I'm looking for a sock who's pretty with a good personality. I'm open to a mismatched mate (after all, opposites are said to attract). " +
        "However, I don't want someone too opposite from me — otherwise we'll have nothing in common. I like socks made of more natural fibers like cotton and wool " +
        "— no polyester, please! I prefer socks made of thinner knits and socks that are quarter-length or shorter, since I'm not attracted to any socks thicker or taller than me. " +
        "My standards for a pair might seem high, but I'm a sock who knows what he wants. " +
        "Hoping to find the right fit! Please contact me if interested at (123)-456-7625.",
        "sockLength": "ankle",
        "sockPalette": "neutral",
        "sockStatus": "found"

    },


    {
        // Ahana's post
        "title": "SOCK MONKEY!!",
        "displayName": "monkeygeorge",
        "text": "hey! im george and im on the hunt for a sock mate who wants to make a sock monkey. " +
        "moving on from my ex-sockwife was hard after the incident but ive gotten past it and im " +
        "looking to rebuild with a new sockmate. preferably a curious fuzzy sock who is open to " +
        "living in a jungle. if you're interested please email me at sockmonkeyproject@sockmail.com.",
        "sockLength": "shin",
        "sockPalette": "colourful",
        "sockStatus": "looking"
    },

    {
        // Jenny's post
        "title": "need to find my one true pair",
        "displayName": "lonely_sock",
        "text": "i am a black ankle sock who's never had a pair. everyone else came paired up in the sock bundle " +
        "except for me. i think maybe they were lost in the factory, but who knows. i am not picky, u can be colourful, " +
        "monochromatic, knee high, calf, just pls pls pls email me at lonelysock123@sockmail.com. i'm a nice sock.",
        "sockLength": "ankle",
        "sockPalette": "neutral",
        "sockStatus": "found"
    },

    {
        // Xin's post
        "title": "Doting on a Dotted",
        "displayName": "notafurry",
        "text": "I am a seven inch mega furry blue-and-white striped gray cat sock who is looking for my mate. " +
                "Oh how hotted and pretty she is...Like the holes in myself. I am withering away from my owner's marathons, " +
                "but my fuzziness will never fail to match your dottedness. meowmewo!!! " +
                "(P.S. No furries please)",
        "sockLength": "ankle",
        "sockPalette": "colourful",
        "sockStatus": "found"
    },

    { 
        // Monty's post
        "title": "Novelty4Novelty",
        "displayName": "sharkluver2",
        "text": "It's been so long, stuffed in the back of the drawer. " +
        "I can't face the world without my other half. I miss the adventures, " +
        "the days we'd make people laugh just by peeking out from an ankle. " +
        "I miss when fellow shark lovers would spot us and smile. Is there another shark sock out there? " +
        "Or maybe a friendly octopus or dolphin? I'm not picky, I'm just so lonely. " +
        "Please, if you're out there, message me at loneshark32@sockmail.com. I don't want to be a single sock anymore. ",
        // photo taken and edited by Monty, used with permission.
        "imgSrc": "upload/monty-sock.jpg",
        "sockLength": "ankle",
        "sockPalette": "colourful",
        "sockStatus": "looking"
    },

     {
        // Gab's post
        "title": "hop into my life please",
        "displayName": "wonpinkbunny",
        "text": "baby pink fuzzy bunny sock with floppy ears looking for a sock who can lend a listening ear " +
        "(as if mine weren't big enough). all i want is someone to binky with.  " +
        "i don't even care about the size of your dewlap.  let's rub together and make some static.. kyu kyu.... ",
        // photo taken by Gab, used with permission.
        "imgSrc": "upload/gab-sock.jpg",
        "sockLength": "ankle",
        "sockPalette": "colourful",
        "sockStatus": "looking"
    },
]

app.get('/', (request, response)=>{

    let data = {
        allPosts: posts,
        filteredLength: filteredLength,
        filteredPalette: filteredPalette,
        filteredStatus: filteredStatus
    }

    // data.visible = true

    response.render('template.ejs', data)
})

// once this form is submitted, values will be checked to set posts that are filtered out's display value to none.
app.get('/filter', (request, response)=>{

    // console.log("i am filtering!! i'm doing it!!")

    // if the user selects a filter type, it will assign it to "filteredLength"
    // which is passed onto the data for template.ejs.
    // this will be used to assign classes to hide non-relevant posts.
    if(request.query.sockLengthFilter){
        filteredLength = request.query.sockLengthFilter
    }
    else{
        filteredLength = null
    }

    if(request.query.sockPaletteFilter){
        filteredPalette = request.query.sockPaletteFilter
    }
    else{
        filteredPalette = null
    }

    if(request.query.statusFilter){
        filteredStatus = request.query.statusFilter
    }
    else{
        filteredStatus = null
    }

    console.log(filteredPalette)
    console.log(filteredStatus)

    response.redirect("/")
})

app.post('/submit', uploadProcessor.single('imageInput'), (request, response)=>{
    // query is everything that comes after the ? in the url
    // ?guest=sam&message=hi+this+is+a+cool+site%21&submitbtn=write
    // console.log(request.query.user)

    let user = request.body.user

    // object that holds the data that comes in from ONE form request
    let postData = {

        title: request.body.title,
        displayName: request.body.user,
        text: request.body.message,        
    }

    if(request.file){
        postData.imgSrc = "/upload/" + request.file.filename
    }
    
    // adding values if radio buttons are selected.
    if(request.body.lengthPost){
        postData.sockLength= request.body.lengthPost
        // console.log(postData.sockLength)
    }

    if(request.body.palettePost){
        postData.sockPalette= request.body.palettePost
        // console.log(postData.sockPalette)
    }

    postData.sockStatus= "looking"


    posts.push(postData)

    // brings user back to home page after posting.
    response.redirect("/")
})

app.get('/post', (req, res)=>{
    
    res.render('post.ejs', {})
})

app.get('/about-us', (req, res)=>{
    
    res.render('aboutus.ejs', {})
})

app.listen(5001, ()=>{
    console.log('server started')
})