const express = require('express')

// setting up the body parser
const parser = require('body-parser')
const encodedParser = parser.urlencoded( {extended: true })
const nedb = require("@seald-io/nedb")

const app = express()

// attempt to implement cookies
const cookieParser = require("cookie-parser");

app.use(express.static('public'))
app.use(parser.json());
app.use(encodedParser)
app.set('view engine', 'ejs')

//// NEW LIBRARY CONFIGURATIONS
app.use(cookieParser());

const hundredyears = 100 * 385 * 24 * 60 * 60 * 1000
let currentFlowerId

// set up the database file
const database = new nedb({
  filename: "database.txt",
  autoload: true,
});

// establishing maybe current data
let postToBeAddedToDB = {}

// homepage
app.get('/', (request, response)=>{

    if(request.cookies.flowerid){
        console.log("dear god please work")
    }

    let query = {}

    let sortQuery = {
    timestamp: -1  // sorts in reverse-chronological order
  }
    database.find(query).sort(sortQuery).exec( (err, dataInDB)=>{
    // console.log(dataInDB)
    if(err){
      response.render('error.ejs', {})
    }

    // console.log(dataInDB)
    response.render('home.ejs', { posts: dataInDB, flowerid: request.cookies.flowerid})
  })
})

// the quiz
app.get('/garden', (req, res)=>{
    
    res.render('quiz.ejs', {})
})

app.get('/error', (req, res)=>{
    
    res.render('error.ejs', {})
})

// adding flower data to database
app.post('/submit', (req, res)=>{

    //setting up stats/////////////////////////////////////////////////////////////////
        // positive = high, negative = low
        let maintenance = 0;

        // positive = warm, negative = cool
        let climate = 0;

        // positive: flower, negative = fruit
        let yields = 0;

        // positive: pack, negative = lone
        let social = 0;
    //setting up stats/////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // unfortunately I'm taking the long route for safety reasons. 
    // calculating stats.

        if(req.body.question1 == "high"){
            maintenance++
        }
        else if(req.body.question1 == "low"){
            maintenance--
        }

        if(req.body.question2 == "flower"){
            yields++
        }
        else if(req.body.question2 == "fruit"){
            yields--
        }

        if(req.body.question3 == "warm"){
            climate++
        }
        else if(req.body.question3 == "cool"){
            climate--
        }

        if(req.body.question4 == "pack"){
            social++
        }
        else if(req.body.question4 == "lone"){
            social--
        }

        if(req.body.question5 == "warm"){
            climate++
        }
        else if(req.body.question5 == "cool"){
            climate--
        }

        if(req.body.question6 == "high"){
            maintenance++
        }
        else if(req.body.question6 == "low"){
            maintenance--
        }

        if(req.body.question7 == "pack"){
            social++
        }
        else if(req.body.question7 == "lone"){
            social--
        }

        if(req.body.question8 == "warm"){
            climate++
        }
        else if(req.body.question8 == "cool"){
            climate--
        }

        if(req.body.question9 == "high"){
            maintenance++
        }
        else if(req.body.question9 == "low"){
            maintenance--
        }

        if(req.body.question10 == "pack"){
            social++
        }
        else if(req.body.question10 == "lone"){
            social--
        }

        if(req.body.question11 == "flower"){
            yields++
        }
        else if(req.body.question11 == "fruit"){
            yields--
        }

        if(req.body.question12 == "flower"){
            yields++
        }
        else if(req.body.question12 == "fruit"){
            yields--
        }
        
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let currentTime = new Date()

    let maintenanceFinal = null
    let climateFinal = null
    let socialFinal = null
    let yieldsFinal = null
    let form = null

    console.log(maintenance)
    console.log(climate)
    console.log(social)
    console.log(yields)

    // determining quiz result
    if(maintenance > 0){
        maintenanceFinal = "high"
    }else{
        maintenanceFinal = "low"
    }

    if(climate > 0){
        climateFinal = "warm"
    }else{
        climateFinal = "cool"
    }

    if(social > 0){
        socialFinal = "pack"
    }else{
        socialFinal = "lone"
    }

    if(yields > 0){
        yieldsFinal = "flower"
    }else{
        yieldsFinal = "fruit"
    }

    // big if statement monster to determine your quiz result

    if(maintenanceFinal == "high"){

        if(climateFinal == "warm"){

            if(yieldsFinal == "flower"){

                if(socialFinal == "lone"){
                    form = "flower kitty"
                }else{
                    form = "starflowers"
                }

            }else{
               
                if(socialFinal == "lone"){
                    form = "pomegranite"
                }else{
                    form = "orange-you-glad"
                }

            }

        }else{

            if(yieldsFinal == "flower"){

                if(socialFinal == "lone"){
                    form = "horsechid"
                }else{
                    form = "snow(man)drops"
                }

            }else{
               
                if(socialFinal == "lone"){
                    form = "vampire tomato"
                }else{
                    form = "fated pear"
                }

            }


        }
        
    }else{

        if(climateFinal == "warm"){

            if(yieldsFinal == "flower"){

                if(socialFinal == "lone"){
                    form = "trumpet glory"
                }else{
                    form = "coast anemone"
                }

            }else{
               
                if(socialFinal == "lone"){
                    form = "cherry panda"
                }else{
                    form = "apple bees"
                }

            }

        }else{

            if(yieldsFinal == "flower"){

                if(socialFinal == "lone"){
                    form = "sprout sprout"
                }else{
                    form = "jellovers"
                }

            }else{
               
                if(socialFinal == "lone"){
                    form = "pudding-on-a-plant"
                }else{
                    form = "wolfberries"
                }

            }
        }
    }

    postToBeAddedToDB = {

        date: currentTime.toLocaleString(),
        timestamp: currentTime.getTime(),
        maintenance: maintenanceFinal,
        climate: climateFinal,
        social: socialFinal,
        yields: yieldsFinal, 
        form: form

    }

    database.insert(postToBeAddedToDB, (err, dataThatHasBeenAdded)=>{

        if(err){
        console.log(err)
        res.redirect('/error')
        } else {
        res.redirect('/your-id')
        }
    })

    // console.log(maintenance + climate + yields + social)
})

app.get("/all-flowers", (req, res) => {

  let query = {}; // this is empty because we don't want to get any specific thing

   let sortQuery = {
    timestamp: -1  // sorts in reverse-chronological order
    }

  database.find(query).sort(sortQuery).exec((err, data) => {
    // send data back as json
    res.json({ posts: data });
  });
});

app.get('/your-id', (req, res)=>{

    let searchedQuery = {
        timestamp: postToBeAddedToDB.timestamp
    }

    console.log(searchedQuery)

    let data = {
        allData: postToBeAddedToDB
    }

    database.findOne(searchedQuery, (err, foundId) =>{
        if(err || foundId == null){
            console.log(foundId)
            res.redirect("/error")

        }else{
            let flowerId = foundId._id
            currentFlowerId = flowerId
            console.log(currentFlowerId)

            res.cookie("flowerid", currentFlowerId, {expires: new Date(Date.now() + hundredyears)})
    
            res.render('id.ejs', data)
        }
    })



    // console.log(data)
})


// start server
app.listen(7093, ()=>{
    console.log('server started')
})