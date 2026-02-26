// [] - create a list
// {} - create a dictionary that stores data in key-value pairs

const database = [
    {
        question : "what is the most venermous snake in the world?",
        options :["inland taipan", "cobra", "anaconda", "garter snake" ],
        answer : "inland taipan"
    },

    {
        question : "what is the bigest snake in the world?",
        options :["king cobra", "reticulated python", "king brown", "boa constrictor" ],
        answer : "reticulated python"
    },

    {
        question : "what are snakes worst enemy?",
        options :["other snakes", "mongoose", "owls", "hawks" ],
        answer : "mongoose"
    },

    {
        question : "how do you know if a snake is happy?",
        options :["going on you", "siting with you", "going in circles", "engaged behavior" ],
        answer : "engaged behavior"
    },

    {
        question : "what are king snakes favourite food?",
        options :["fuits", "snails", "chickens", "frogs" ],
        answer : "frogs"
    },
]
const startbutton = document.getElementById("start-btn")
const timertext = document.getElementById("timer-text")
const questionLabel = document.getElementById("question")
const optionbox = document.getElementById("optionbox")
const progressBarfill = document.getElementById("fill");
const scoreLabel = document.getElementById("score-label")
const feedbackLabel = document.getElementById("feedback-label")

const dropdown = document.getElementById("bgm")
const musicbtn = document.getElementById("music")
let Currentsong = null
let IsmusicPlaying = false
musicbtn.textContent = " 🔇 music off"



dropdown.addEventListener("change", () => {
    let selectedsong = dropdown.value

    //stop and reset previous song if any
    if(Currentsong)
    {
        Currentsong.pause()
        Currentsong.currentTime = 0
    }
    
    Currentsong= new Audio(selectedsong)
    Currentsong.loop =true
    Currentsong.volume = 1
    Currentsong.play()
    IsmusicPlaying = true
    musicbtn.textContent = "🔊 music on 🔊"
})



    musicbtn.addEventListener("click", () => {
        if(IsmusicPlaying)
        {
            Currentsong.pause()
            musicbtn.textContent = "🔇 Music Off"
            IsmusicPlaying = false
        }else
        {
            Currentsong.play()
            musicbtn.textContent = "🔊 Music On"
            IsmusicPlaying = true
        }
    })




let questionNumber = 0
let score = 0

startbutton.addEventListener("click",startquiz)


function startquiz()
{
    startbutton.style.display = 'none'
    feedbackLabel.textContent = ""
    loadquestion()
}
function loadquestion()
{
    if(questionNumber < database.length)
    {
        // rest the timer
        timertext.textContent = 10

        feedbackLabel.textContent = ""

        //update progress bar
        progressBarfill.style.width = `${ ( (questionNumber + 1) / database.length ) * 100 }%`


        // load the question from the database
        const currentQuestionSet = database[questionNumber]
        questionLabel.textContent = currentQuestionSet.question



        //remove previos optionbox
        optionbox.innerHTML = ''


        // build 4 option button
        currentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button')
            button.textContent = item;
            button.classList.add('option-btn')
            optionbox.appendChild(button)

            button.addEventListener('click',() => {
                disableAlloptionButtons()
                checkAnswer(item)
                //item = option we just selected
            })
        })
        // turn on the timer
        timer = setInterval(() => {
            // reduce timer text by 1
            timertext.textContent = parseInt(timertext.textContent) -1
            const redValue = Math.random() * 255
            const greenValue = Math.random() * 255
            const blueValue = Math.random() * 255
            timertext.style.color = `rgb(${redValue}, ${greenValue}, ${blueValue})`


            // check if the time has run out
            if(parseInt(timertext.textContent) == 0)
            {
                disableAlloptionButtons()
                checkAnswer(null)
            }


        },1000)
    } else
    {
        Endquiz()
    }
}

function disableAlloptionButtons()
{
    // latch select all option button
    const AllOptionButtons = document.querySelectorAll('.option-btn')

    AllOptionButtons.forEach(button => {
        button.disabled = true
    })
}

function checkAnswer(item)
{
    clearInterval(timer)

    //identify the actual answer key
    const answer = database [questionNumber].answer;

    if (item == answer)
    {
        score = score + 1
        feedbackLabel.textContent = "that's correct.great job!!!!"
    }else if (item ===  null)
    {
        feedbackLabel.textContent = "time up you to slow. hehe"
    }else
    {
        feedbackLabel.textContent = "that's wrong.try again!"
    }
    scoreLabel.textContent = `you scored ${score} point(s)`

    //hold for 2 seconds
    setTimeout (() => {
        questionNumber = questionNumber + 1
        loadquestion()
    },2000);

}

function Endquiz()
{
    clearInterval(timer) // reset timer
    questionLabel.textContent = "Hooray!!!!! The quiz ended!"
    optionbox.style.display = 'none';


    if(score >= 3)
    {
        feedbackLabel.textContent = "🥳🥳🥳🥳🥳🥳🥳"
        timer.textContent = "🤩"
    }else
    {
        feedbackLabel.textContent = "you need to go touch some grass"
        timertext.textContent = "😢"
    }
}

