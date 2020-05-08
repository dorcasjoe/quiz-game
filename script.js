const startButton  =  document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')
const introSpeech = document.querySelector('.intro')
let counter = document.querySelector('.counter')
const score = document.getElementById('score')
let points = 0
let shuffledQuestions, currentQuestionIndex
 
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame() {
	console.log('started');
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() =>  Math.random()  -  .5)
	currentQuestionIndex = 0
	introSpeech.classList.add('hide')
	score.classList.remove('hide')
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
}
	
	function setNextQuestion () {
	resetState() 
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
	questionElement.innerText =  question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
				button.dataset.correct = answer.correct
	}
	button.addEventListener('click' ,  selectAnswer)
	answerButtonsElement.appendChild(button)
    })
    counter.innerText = `Question: ${(currentQuestionIndex + 1)} / 5`;
}

function resetState() {
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild (answerButtonsElement.firstChild)
	}
}
function selectAnswer(e) {
	const selectedButton = e.target
	selectedButton.classList.add('wrong')
	const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    if (correct) {
        
        points += 1; 
        score.textContent = `Correct answer: ${points} / 5`;
        if (points > 1){
            score.textContent = `Correct answers: ${points} / 5`;
        } 
    }
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
		button.disabled = true
    })
    console.log(shuffledQuestions.length)
    console.log(currentQuestionIndex)
	if (shuffledQuestions.length > currentQuestionIndex + 6) {
		nextButton.classList.remove('hide')
	} else {
		showResults()
		counter.classList.add('hide')
		score.classList.add('hide')
	}
}

const showResults = () => {

    questionContainerElement.innerHTML = "";
	const markup = `
    <div class="final" style = "text-align: center";>
            <h1>Thanks for playing!</h1>
            <h2>
            Your score is: ${points}
            </h2>
			<h4>Want to replay?</h4>
            <button id="restart" class="start-btn btn">
                Restart
            </button>
        </div>
    `;

    questionContainerElement.insertAdjacentHTML('afterbegin', markup);
    
    document.getElementById('restart').addEventListener('click', () => {
        window.location.reload(); 
    }); 
}

function setStatusClass(element, correct) {
	if (correct) {
		element.classList.remove('wrong')
		element.classList.add('correct')
		}
}
function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}
const questions = [
	{
		question: 'IP range 224-247 is',
			answers:  [
				{ text: "Reserved for experimental use", correct: false},	
				{ text:  "Used for large networks", correct: false},
				{ text:  "Reserved for multicasting", correct: true},
				{ text:  "The most common group of addresses", correct: false},
				{ text:  "Used by large corporate and Government networks", correct: false}
			]
	},
	{
		question: 'The first byte in an IP address reveals',
			answers:  [
				{ text: "The network class of the machine", correct: true},	
				{ text:  "The machine header", correct: false},
				{ text:  "The machine's network architechture", correct: false},
				{ text:  "The basic structure of the network", correct: false},
				{ text:  "The physical connection of the machine", correct: false}
			]
	},
	{
		question: 'What is a network?',
			answers:  [
				{ text: "Entry path of communication", correct: false},	
				{ text:  "Physical connection of computers", correct: false},
				{ text:  "The process of setting up a firewall", correct: false},
				{ text:  "The means of Sending data", correct: false},
				{ text:  "A way for machines to communicate", correct: true}
			]
	},
	{
		question: 'Which of these is not part of the fundamental physical piece of a network?',
			answers:  [
				{ text: "Firewall", correct: false},	
				{ text:  "Network Interface", correct: true},
				{ text:  "Router", correct: false},
				{ text:  "Switch", correct: false},
				{ text:  "Hub", correct: false}
			]
	},
	{
		question: 'Ip addresses are a series of 4 numbers between',
			answers:  [
				{ text: "1 and 255", correct: false},	
				{ text:  "0 and 225", correct: false},
				{ text:  "1 and 225", correct: false},
				{ text:  "0 and 255", correct: true},
				{ text:  "1 and 525", correct: false}
			]
	},
	{
		question: 'The IP address 127.0.0.1 is referred to as',
			answers:  [
				{ text: "Loop address", correct: false},	
				{ text:  "Loopback address", correct: true},
				{ text:  "Loopforward address", correct: false},
				{ text:  "Back address", correct: false},
				{ text:  "Forward address", correct: false}
			]
	},
	{
		question: 'Gateway Router performs?',
			answers:  [
				{ text: "TNA", correct: false},	
				{ text:  "NTA", correct: false},
				{ text:  "TAN", correct: false},
				{ text:  "ANT", correct: false},
				{ text:  "NAT", correct: true}
			]
	},
	{
		question: 'NAT stands for?',
			answers:  [
				{ text: "Network Address Tester", correct: false},	
				{ text:  "Networking and Testing", correct: false},
				{ text:  "Network Address Translation", correct: true},
				{ text:  "Network and Test", correct: false},
				{ text:  "Network and Translate", correct: false}
			]
	},
	{
		question: 'What is Subnetting?',
			answers:  [
				{ text: "Subleting a network", correct: false},	
				{ text:  "Splitting up a network into smaller portions", correct: true},
				{ text:  "Constructing a network interface", correct: false},
				{ text:  "Building a firewall", correct: false},
				{ text:  "Networking", correct: false}
			]
	},
	{
		question: 'The first value of a subnet mask must be?',
			answers:  [
				{ text: "240", correct: false},	
				{ text:  "224", correct: false},
				{ text:  "128", correct: false},
				{ text:  "255", correct: true},
				{ text:  "252", correct: false}
			]
	},
 ]
