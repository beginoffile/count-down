import './styles.css';

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countDownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


const today = new Date().toISOString().split('T')[0];

dateEl.setAttribute('min',today);

function refreshInterval(){
    const now = new Date().getTime();
    const distance = countdownValue - now;
    // console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor((distance % hour)/minute);
    const seconds = Math.floor((distance % minute)/second);

    // console.log(days, hours, minutes, seconds);

    inputContainer.hidden = true;

    if (distance < 0){
        countdownEl.hidden = true;
        clearInterval(countDownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;        
        return;
    }

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent =  `${days}`;
    timeElements[1].textContent =  `${hours}`;
    timeElements[2].textContent =  `${minutes}`;
    timeElements[3].textContent =  `${seconds}`;

    inputContainer.hidden = true;
    countdownEl.hidden = false;
    completeEl.hidden = true;

}

function updateDOM(){
    countDownActive = setInterval(() => {
        refreshInterval();
    }, second);
}

console.log(today);

function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    
    // console.log('a',countdownTitle, countdownDate);
    savedCountdown = {
        title:countdownTitle,
        date: countdownDate,
    };

    // console.log(savedCountdown);
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));

    if (countdownDate === ''){
        alert('Please select a Date for the countdown')
        return       
    }

    countdownValue = new Date(countdownDate).getTime();
    // console.log('countDown',countdownValue);
    updateDOM();
}

function reset(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countDownActive);
    countdownTitle = '';
    countdownDate = '';
    countdownForm.elements[0].value = ''
    countdownForm.elements[1].value = ''
    localStorage.removeItem('countdown');

}
function restorePreviousCountdown(){
    let savedCountdownStr = localStorage.getItem('countdown')
console.log(savedCountdownStr)
    if (savedCountdownStr){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(savedCountdownStr);
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountdown();