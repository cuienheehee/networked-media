// establishing condition of whether or not
// the now button was pressed to interrupt
// the countdown.
let now

// num is the number that we will be using for the countdown.
let num

// countInterval is the setInterval that will be used later,
// declaring it was unfortunately the only way to stop it from going on forever
let countInterval

// this is the countdown paragraph.
let allSpans

let title
let hands
let tick

window.onload = () => {
    alert('you will be tickled.')

    now = false
    allSpans = document.getElementsByClassName('text-body')
    title = document.getElementsByClassName('title')
    hands = document.getElementsByClassName('hand')
    tick = document.getElementById('tick')

    // establishing button
    let startButton = document.getElementById('now')  
    
    startButton.onclick = () => {
        // begin the countdown, and repurposes startButton into nowButton.
        startButton.textContent = "tickle me now!"
        title[0].textContent = "time until tickle time:"
        startButton = null
        startCount()
    }
    
}

//////////////////////////////////////////////////////////////////////////////

function startCount(){

    // continuation of nowButton's repurposing.
    let nowButton = document.getElementById('now')  
    nowButton.onclick = () => {
        now = true
    }

    // establishing a random number from 5-300 to countdown from
    num = randomNumber(5, 300)

    // vv use to troubleshoot
    // console.log("random number is " + num)

    // start counting
    // I probably could have used an anonymous function here, but
    // it would have been kind of hard for me to organize personally...

    pleaseCount()
    countInterval = setInterval(pleaseCount, 1000)
}

function pleaseCount(){

    tick.play()

    if (now == false && num > 0){
            // console.log(num)

            let minutes = Math.floor(num / 60)
            let seconds = num - (minutes * 60)

            // replaces "lets begin!" text with current countdown number
            // allSpans[0].textContent = num
            if (minutes > 0){
                allSpans[0].textContent = minutes + " minutes " + seconds + " seconds"
            }
            else{
                allSpans[0].textContent = seconds + " seconds"
            }
            num--
        }
        else {
            //stop counting 
            clearInterval(countInterval)

            // console.log("pleaseCount finished")

            // putting this here just in case something goes wrong.
            num = 0

            // console.log("num is " + num)

            // begin the party vv
            tickleTime()
        }
}

//////////////////////////////////////////////////////////////////////////

function tickleTime(){
    
    fiveSecondJoy()
    setInterval(fiveSecondJoy, 5000)

    now = false
    title[0].textContent = "TICKLE TIME!"
    
    allSpans[0].textContent = "TICKLE TICKLE TICKLE!"

    resetButton = document.getElementById('now')
    resetButton.textContent = "reset the timer"
    resetButton.onclick = () => {
        location.reload();
    }

    // show hands
    hands[0].style.display = 'inline'
    hands[1].style.display = 'inline'

    let angle = 0
    let back = false

    // I heavily suspect that this is way too overcomplicated but
    // I am too afraid to touch this because it might break if I breathed on it

        setInterval( () =>{

            if (back == false){
                angle++
            }
            else{
                angle--
            }

            hands[0].style.transform = "rotate(" + angle + "deg)"
            hands[1].style.transform = "rotate(" + angle*-1 + "deg)"

            if (angle > 30){
                back = true
            }
            else if (angle == -10){
                back = false
            }
        
        }, 15)

    console.log("tickle tickle tickle")
}

//////////////////////////////////////////////////////////////////////////


function fiveSecondJoy(){

    document.getElementById('cheer').play()

   // confetti code from catdad on github:
   // // https://github.com/catdad/canvas-confetti?tab=readme-ov-file
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

}

//////////////////////////////////////////////////////////////////////////

// function courtesy of w3schools at
// https://www.w3schools.com/js/js_random.asp
// returns random number from min to max (included)
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}