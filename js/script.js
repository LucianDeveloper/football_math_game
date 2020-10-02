'use strict';
const quest = document.getElementById("quest");
const questions = {
    '0': 'ноль',
    '1': 'один',
    '2': 'два',
    '3': 'три',
    '4': 'четыре',
    '5': 'пять',
    '6': 'шесть',
    '7': 'семь',
    '8': 'восемь',
    '9': 'девять'
};

const goal = ["img/goal/goal1.gif", "img/goal/goal2.gif", "img/goal/goal3.gif", "img/goal/goal4.gif"];
const miss = ["img/miss/miss1.gif", "img/miss/miss2.gif", "img/miss/miss3.gif", "img/miss/miss4.gif", "img/miss/miss5.gif"];

const image = document.createElement('img');

var game_stoped = true;

function generate_numbers() {
    const numbers = new Set();
    while (numbers.size < 9) {
        const n = (Math.floor(Math.random() * 10));
        numbers.add(n);
    }

    return [...numbers];
}

function fill_numbers() {
    let i = 1;
    let num_arr = generate_numbers()
    let quest_num = num_arr[Math.floor(Math.random() * num_arr.length)];
    quest.innerHTML = questions[quest_num];
    for (const item of num_arr) {
        document.getElementById(i).innerHTML = item;
        i++
    }
}

fill_numbers();

function startGame() {
    let t = 0 // strart time for revert timer
    document.getElementById("start_btn").className = "hidden";
    document.getElementById("game").className = "visible";
    game_stoped = false;

    function getTimeRemaining(endtime) {
        // var t = Date.parse(endtime) - Date.parse(new Date());
        t = t + 1000  // revert timer
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            total: t,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function initializeClock(id, endtime) {
        const timeinterval = setInterval(updateClock, 1000);
        const clock = document.getElementById(id);
        const minutesSpan = clock.querySelector(".minutes");
        const secondsSpan = clock.querySelector(".seconds");

        function updateClock() {
            const t = getTimeRemaining(endtime);
            if (t.total <= 0) {
                document.getElementById("game").className = "hidden";
                document.getElementById("message").className = "visible";
                document.getElementById("timeIsUp").className = "visible";
                clearInterval(timeinterval);
                return true;
            }
            if (game_stoped) {
                clearInterval(timeinterval);
            }
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        }

        updateClock();
    }


    const deadline = new Date(Date.parse(new Date()) + 2 * 60 * 1000);
    initializeClock("countdown", deadline);

}

function reload() {
    location.reload();
}

function get_number() {
    const answer = questions[event.target.textContent];
    document.getElementById("game").className = "hidden";
    // document.getElementById("message").classList.add("visible");
    document.getElementById("message").classList.remove("hidden");
    if (answer === quest.textContent) {
        document.getElementById("True").className = "visible";
        var goal_true = goal[Math.floor(Math.random()*goal.length)];
        image.src = goal_true;
        document.getElementById('message').appendChild(image);
        game_stoped = true;
    } else {
        // document.getElementById("False").classList.add("visible");
        document.getElementById("False").classList.remove("hidden");
        var goal_false = miss[Math.floor(Math.random()*miss.length)];
        image.src = goal_false;
        document.getElementById('message').appendChild(image);
        game_stoped = true;
    }
}
