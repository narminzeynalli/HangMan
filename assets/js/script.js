// selectors
const letterButtons = document.querySelector('.letter-buttons')
const spaces = document.querySelector('.spaces')
const countMoves = document.querySelector('.count')
const warningDiv = document.querySelector('.warning')
const topics = document.querySelector('.topics')
const restartButton = document.querySelector('.restart-button')
let computers = ['monitor', 'keyboard', 'mouse', 'printer', 'scanner']
let colors = ['red', 'green', 'blue', 'orange', 'purple']
let jobs = ['teacher', 'doctor', 'lawyer', 'police']
let countries = ['azerbaijan', 'turkiye', 'spain', 'korea', 'italy', 'england', 'america']
let animals = ['cat', 'dog', 'lion', 'giraffe', 'tiger', 'koala']
let numbers = ['nineteen', 'hundred', 'twelwe', 'eighteen']
let wordsArray = []
let selectedWordLetters = []
let countTrueLetters = 0



// events
topics.addEventListener('click', selectTopic)
restartButton.addEventListener('click', ()=>{
    window.location.reload()
})
letterButtons.addEventListener('click', addLetter)



// functions
function selectTopic(event) {
    let topic = event.target
    topics.parentElement.classList.add('d-none')
    let topicName = topic.innerText.toLowerCase()
    switch(topicName) {
        case 'computers':
            wordsArray = computers
            break
        case 'colors':
            wordsArray = colors
            break
        case 'jobs':
            wordsArray = jobs
            break
        case 'countries':
            wordsArray = countries
            break
        case 'animals':
            wordsArray = animals
            break
        case 'numbers':
            wordsArray = numbers
            break
    }
    let selectedWord = selectRandomWord(wordsArray)
    for (let l in selectedWord) {
        selectedWordLetters.push(selectedWord[l])
    }
}

function addLetter(event) {
    if (Number(countMoves.innerText) > 0) {
        const item = event.target
        let selectedWord = ''
        for (let x in selectedWordLetters) {
            selectedWord += selectedWordLetters[x]
        }
        let numberOfSpaces = selectedWord.length
        if (item.classList.contains('letter')) {
            let letter = item.innerText
            item.classList.add('d-none')
            if (!selectedWordLetters.includes(letter)) {
                countMoves.innerText = countMoves.innerText - 1
                if (Number(countMoves.innerText) == 0) {
                    warningDiv.innerText = 'Oops! You hanged man!'
                    warningDiv.style.textAlign = 'center'
                }
            } else {
                for (let i=0; i<selectedWord.length; i++) {
                    if (letter == selectedWord[i]) {
                        spaces.children[i].innerText = letter
                        countTrueLetters = countTrueLetters + 1
                    }
                }
                if (numberOfSpaces == countTrueLetters) {
                    warningDiv.innerText = 'Congratulations! You saved man!'
                    warningDiv.style.textAlign = 'center'

                }
            }
        }
    }
    
    
}

function selectRandomWord(words) {
    let index = Math.floor(Math.random()*wordsArray.length)
    let randomWord = words[index]
    addSpaces(randomWord)
    return randomWord
}

function addSpaces(word) {
    for (let i=0; i<word.length; i++) {
        let newSpace = document.createElement('div')
        newSpace.classList.add('space')
        spaces.appendChild(newSpace)
        let newSpaceText = document.createTextNode('__')
        newSpace.appendChild(newSpaceText)
    }
}