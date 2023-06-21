'use strict';

let title = document.querySelector('.pomo_title');
let settings = document.querySelector('.settings');
let input = document.querySelectorAll('.input');

let minutes = document.getElementById('min');
let seconds = document.getElementById('sec');

let workTime = 25;
let shortBreak = 5;
let longBreak = 10;
let sec = '00';

let interval;
let visability = false;

window.onload = () => {
    minutes.innerHTML = workTime;
    seconds.innerHTML = sec;
}

function showSettings() {
    visability = !visability;
    visability?  settings.style.display = "block" : settings.style.display = "none";
}

function handleChange() {
    input.forEach(item => {
        if(item.classList.contains('work')) {
            workTime = +item.value? +item.value : 0;
        } else if(item.classList.contains('shortBreak')) {
            shortBreak = +item.value? +item.value : 0;
        } else if(item.classList.contains('longBreak')) {
            longBreak = +item.value? +item.value : 0;
        }
    })
}

function submit() {
    minutes.innerHTML = workTime;
    settings.style.display = "none";
}

function play() {
    clearInterval(interval);

    title.innerHTML = "It's time to work!";

    sec = 59;

    let workMin = workTime-1;
    let sbMin = shortBreak-1;
    let lbMin = longBreak-1;

    let breakCounter = 0;
    let sbCounter = 0;

    let timer = () => {
        minutes.innerHTML = workMin;
        seconds.innerHTML = sec < 10? '0' + sec : sec;

        sec = sec-1;

        if(sec === 0) {
            workMin = workMin - 1;
            if(workMin === -1) {
                if(breakCounter%2 === 0 && sbCounter !== 4) {
                    title.innerHTML = "It's time to rest a little!";
                    breakCounter++
                    sbCounter++
                    workMin = sbMin;
                } else if(breakCounter%2 === 0 && sbCounter === 4) {
                    title.innerHTML = "Time for a long break! You did great!";
                    sbCounter = 0;
                    breakCounter++;
                    workMin = lbMin;
                } else {
                    title.innerHTML = "It's time to work!";
                    workMin = workTime-1;
                    breakCounter++;
                }
                
            }
            sec = 59;
        }      
    }

    interval = setInterval(timer, 1000);
}

function reset() {
    clearInterval(interval);

    workTime = 25;
    shortBreak = 5;
    longBreak = 10;
    sec = '00';

    title.innerHTML = '';
    minutes.innerHTML = workTime;
    seconds.innerHTML = sec;
}

