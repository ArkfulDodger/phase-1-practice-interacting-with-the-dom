//#region GLOBAL VARIABLES

const counterElement = document.getElementById('counter');
const counterLikes = {};
let isPaused = false;

//#endregion


//#region CODE RUN ON DOC LOAD

addEvents();
incrementCounterEverySecond();

//#endregion


//#region HELPER FUNCTIONS

function addEvents() {
    document.getElementById('minus').addEventListener('click', decrementCounterOnce);
    document.getElementById('plus').addEventListener('click', incrementCounterOnce);
    document.getElementById('heart').addEventListener('click', likeCounterNumber);
    document.getElementById('pause').addEventListener('click', pauseApplication);
    document.getElementById('comment-form').addEventListener('submit', addComment);
}

function incrementCounterEverySecond() {    
    // inrement amount every second
    setInterval(() => !isPaused && ++counterElement.textContent, 1000);
}

function decrementCounterOnce() {
    counterElement.textContent--;
}

function incrementCounterOnce() {
    counterElement.textContent++;
}

function likeCounterNumber() {
    // initialize counter-number likes element
    let num = counterElement.textContent;
    let counterLikeElement;

    // initialize new element for num-likes and append to DOM, or get existing element
    if (!Object.keys(counterLikes).includes(num)) {
        counterLikes[num] = 0;
        counterLikeElement = document.createElement('li');
        counterLikeElement.dataset.number = num;
        document.querySelector('.likes').appendChild(counterLikeElement);
    } else {
        counterLikeElement = document.querySelector(`.likes [data-number="${num}"]`);
    }

    // increment likes for counter-number
    counterLikes[num]++;
    counterLikeElement.textContent = `${num} has been liked ${counterLikes[num]} ${counterLikes[num] === 1 ? 'time' : 'times'}`;
    console.log(counterLikes);
}

function pauseApplication() {
    isPaused = !isPaused;
    document.getElementById('pause').textContent = isPaused ? 'resume' : 'pause';
    document.getElementById('minus').disabled = isPaused ? true : false;
    document.getElementById('plus').disabled = isPaused ? true : false;
    document.getElementById('heart').disabled = isPaused ? true : false;
    document.getElementById('submit').disabled = isPaused ? true : false;
}

function addComment(e) {
    e.preventDefault();
    const commentElement = document.createElement('p');
    commentElement.textContent = document.getElementById('comment-input').value;
    document.getElementById('list').appendChild(commentElement);
    e.target.reset();
}

//#endregion

