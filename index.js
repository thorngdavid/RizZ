let currentQuestionGifIndex = 1;
let currentMessageGifIndex = 1;
let questionGifInterval;
let messageGifInterval;
let isNoButtonRotated = false;
let isSidebarVisible = false;
let isAnimationRunning = true;
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    isSidebarVisible = !isSidebarVisible;
    const menuIcon = document.getElementById('menu');
    if (isSidebarVisible) {
        sidebar.style.top = '50px';
        menuIcon.src = "closemenu.png";
    } else {
        sidebar.style.top = '-130px';
        menuIcon.src = "menu.png";
    }
}

document.querySelector('nav ul li:last-child img').addEventListener('click', toggleSidebar);

function showGifsAndQuestion() {
    document.getElementById('container').style.display = 'block';
    document.getElementById('question').style.display = 'block';
    showNextQuestionGif();
    hideQuestionGifs();
    questionGifInterval = setInterval(showNextQuestionGif, 3000);
    hideMessageGifs();
    messageGifInterval = setInterval(showNextMessageGif, 3000);
}

function showNextQuestionGif() {
    hideQuestionGifs();
    const gifId = `question-gif${currentQuestionGifIndex}`;
    document.getElementById(gifId).style.display = 'block';
    currentQuestionGifIndex = (currentQuestionGifIndex % 2) + 1;
}

function hideQuestionGifs() {
    document.getElementById('question-gif1').style.display = 'none';
    document.getElementById('question-gif2').style.display = 'none';
}

function showButtons() {
    document.getElementById('yes-button').style.display = 'block';
    document.getElementById('no-button').style.display = 'block';
}

function hideButtons() {
    document.getElementById('yes-button').style.display = 'none';
    document.getElementById('no-button').style.display = 'none';
}

function showThankYou() {
    clearInterval(questionGifInterval);
    document.getElementById('question').style.display = 'none';
    hideQuestionGifs();
    clearInterval(messageGifInterval);
    hideMessageGifs();
    hideButtons();
    const messagegifcontainer = document.getElementById("message-gif-container");
    const body = document.body;
    document.getElementById('message').innerHTML = 'Thank you <3!!';
    document.getElementById('message-gif-container').style.display = 'block';
    messageGifInterval = setInterval(showNextMessageGif, 2100);
    messagegifcontainer.style.display = "flex";
    body.style.background = "pink";
    sidebar.style.top = '-130px';
    const audio = document.getElementById('background-music');
    audio.play();
    const menuIcon = document.getElementById("menu");
    menuIcon.src = "menu.png";
    isAnimationRunning = false;
}

function showNextMessageGif() {
    hideMessageGifs();
    const gifId = `message-gif${currentMessageGifIndex}`;
    document.getElementById(gifId).style.display = 'block';
    currentMessageGifIndex = (currentMessageGifIndex % 2) + 1;
}

function hideMessageGifs() {
    document.getElementById('message-gif1').style.display = 'none';
    document.getElementById('message-gif2').style.display = 'none';
}

function changeDirection() {
    isNoButtonRotated = !isNoButtonRotated;
    const noButton = document.getElementById('no-button');
    noButton.style.transform = isNoButtonRotated ? 'rotate(180deg)' : 'rotate(0deg)';
}

function moveNoButtonRandomly() {
    const maincontainer = document.getElementById("container");
    const noButton = document.getElementById('no-button');

    const containerRect = maincontainer.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    randomX = Math.max(0, Math.min(randomX, containerRect.width - buttonRect.width));
    randomY = Math.max(0, Math.min(randomY, containerRect.height - buttonRect.height));

    noButton.style.left = `${(randomX / containerRect.width) * 100}%`;
    noButton.style.top = `${(randomY / containerRect.height) * 100}%`;

    noButton.style.transition = 'left 0.1s ease-in-out, top 0.1s ease-in-out';
    setTimeout(() => {
        noButton.style.transition = '';
    }, 500);
}

document.getElementById('no-button').addEventListener('click', moveNoButtonRandomly);
document.getElementById('no-button').addEventListener('mouseover', moveNoButtonRandomly);

document.getElementById('no-button').addEventListener('click', function () {
    isAnimationRunning = false;
});

document.getElementById("no-button").addEventListener('mouseover', moveNoButtonRandomly);

function initialNoButtonAnimation() {
    const noButton = document.getElementById('no-button');
    noButton.style.opacity = 1;

    setTimeout(() => {
        noButton.style.transition = 'left 0.1s ease-in-out, top 0.1s ease-in-out';
        noButton.style.opacity = 1;
        setInterval(moveNoButtonRandomly, 200);
    }, 3000);
}

function checkScreenWidthAndAnimate() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 500) {
        initialNoButtonAnimation();
    } else {
        const noButton = document.getElementById('no-button');    
        noButton.style.opacity = 1;
        noButton.style.transition = 'none'; 
    }
}

window.addEventListener('load', checkScreenWidthAndAnimate);

function playMusic() {
    const audio = document.getElementById('background-music');
    audio.play();
}
