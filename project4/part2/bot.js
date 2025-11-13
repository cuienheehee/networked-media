// imports the configurations set up in the .env
require('dotenv').config()

const m = require('masto')

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",

    // do NOT upload your env to the internet!!!

    accessToken: process.env.TOKEN
})

async function retrieveData(){

    // database from Anshula. Thank you Anshula!
    const url = 'http://64.227.20.125:7001/all-posts'
    const response = await fetch(url)

    const json = await response.json()
    // console.log(json)

    const posts = json.posts
    // console.log(posts)

    // food: dasEssen
    // place: dieStandort
    // thank you Anshula for clarifying the German!

    let randNum = Math.floor(Math.random() * (posts.length))
    let randDasEssen = posts[randNum].dasEssen
    let randDieStandort = posts[randNum].dieStandort
    // console.log(randDasEssen + " and " + randDieStandort)

    // adds random statement between two choices based on if randBoolean returns 0 or 1
    let randBoolean = Math.round(Math.random())
    let randStatement
    if(randBoolean == 0) {randStatement = ". Ich war lecker! 😋"}
    else {randStatement = ". MMMMMM! 😋😋😋"}

    makeStatus(randDasEssen + " ins " + randDieStandort + randStatement)
}

async function makeStatus(textStatus){
    const status = await masto.v1.statuses.create({
        status: textStatus,
        visibility: "public",
    })

    console.log(status.url)
}

// calls every 2 hours
setInterval( ()=>{
    retrieveData()
}, 1000 * 60 * 120)

retrieveData()