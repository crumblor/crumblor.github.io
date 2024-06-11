const player = document.getElementById("player");
const step = 3;
let key = {};

document.addEventListener('keydown', function(event) {
    key[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    delete key[event.key];
});

let AbleTop = true;
let AbleBottom = true;
let AbleRight = true;
let AbleLeft = true;

const blocks = document.getElementsByClassName("block");
const draggableBlock = document.getElementById("draggableBlock");
const door = document.getElementById("door");
const portal = document.getElementById("portal");
const portal2 = document.getElementById("portal2");
const pressurePlate = document.getElementById("pressurePlate");
const portalDoor = document.getElementById("portalDoor");

// Popup elements
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const questionElem = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitAnswer = document.getElementById("submitAnswer");

let popupShown = false; // Flag to track if the popup has been shown

// Initially lock the draggable block
draggableBlock.style.pointerEvents = 'none';

// Timer variables
let startTime;
let endTime;
let timerInterval;

let seconds;
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(function() {
        const elapsedTime = Date.now() - startTime;
        seconds = Math.floor(elapsedTime / 1000);
    }, 1000);
}

function stopTimer() { 
    alert(`Time elapsed: ${seconds} seconds`);
    clearInterval(timerInterval);
}

function collision() {
    const playerRect = player.getBoundingClientRect();

    AbleTop = true;
    AbleBottom = true;
    AbleRight = true;
    AbleLeft = true;

    function checkCollision(blockRect) {
        if (playerRect.bottom > blockRect.top &&
            playerRect.top < blockRect.bottom &&
            playerRect.left < blockRect.right &&
            playerRect.right > blockRect.left) {
                
            if (playerRect.top >= blockRect.bottom - step) {
                AbleTop = false;
            }
            if (playerRect.bottom <= blockRect.top + step) {
                AbleBottom = false;
            }
            if (playerRect.left >= blockRect.right - step) {
                AbleLeft = false;
            }
            if (playerRect.right <= blockRect.left + step) {
                AbleRight = false;
            }
        }
    }

    // Check collision with portal2
    const portal2Rect = portal2.getBoundingClientRect();
    if (playerRect.bottom > portal2Rect.top &&
        playerRect.top < portal2Rect.bottom &&
        playerRect.left < portal2Rect.right &&
        playerRect.right > portal2Rect.left) {
        stopTimer(); // Stop the timer when colliding with portal2
    }

    const portalRect = portal.getBoundingClientRect();
    if (playerRect.bottom > portalRect.top &&
        playerRect.top < portalRect.bottom &&
        playerRect.left < portalRect.right &&
        playerRect.right > portalRect.left) {
        // Redirect to the second level
        window.location.href = "index2.php";
    }

    // Check collision with static blocks
    Array.from(blocks).forEach(block => {
        const blockRect = block.getBoundingClientRect();
        checkCollision(blockRect);
    });

    // Check collision with the draggable block
    const draggableBlockRect = draggableBlock.getBoundingClientRect();
    checkCollision(draggableBlockRect);

    // Check collision with the door
    const doorRect = door.getBoundingClientRect();
    if (playerRect.bottom > doorRect.top &&
        playerRect.top < doorRect.bottom &&
        playerRect.left < doorRect.right &&
        playerRect.right > doorRect.left) {
        // Trigger the popup with a math question only if it hasn't been shown
        if (!popupShown) {
            openPopup();
            popupShown = true; // Set the flag to true
        }
        checkCollision(doorRect);
    }

    // Check collision with the portal door
    const portalDoorRect = portalDoor.getBoundingClientRect();
    if (portalDoor.style.display !== "none") {
        checkCollision(portalDoorRect);
    }

    // Check collision with the pressure plate
    const pressurePlateRect = pressurePlate.getBoundingClientRect();
    if (draggableBlockRect.bottom > pressurePlateRect.top &&
        draggableBlockRect.top < pressurePlateRect.bottom &&
        draggableBlockRect.left < pressurePlateRect.right &&
        draggableBlockRect.right > pressurePlateRect.left) {
        // Open the portal door if the block is on the pressure plate
        portalDoor.style.display = "none";
    } else {
        // Close the portal door if the block is not on the pressure plate
        portalDoor.style.display = "block";
    }
}

function movement() {
    collision();

    if (key['w'] && AbleTop) {
        player.style.top = (player.offsetTop - step) + 'px';
    }
    if (key['a'] && AbleLeft) {
        player.style.left = (player.offsetLeft - step) + 'px';
    }
    if (key['s'] && AbleBottom) {
        player.style.top = (player.offsetTop + step) + 'px';
    }
    if (key['d'] && AbleRight) {
        player.style.left = (player.offsetLeft + step) + 'px';
    }
}

setInterval(movement, 1);

// Draggable block functionality
let isDragging = false;
let offsetX, offsetY;

draggableBlock.addEventListener('mousedown', (e) => {
    if (draggableBlock.style.pointerEvents !== 'none') {
        isDragging = true;
        offsetX = e.clientX - draggableBlock.offsetLeft;
        offsetY = e.clientY - draggableBlock.offsetTop;
        draggableBlock.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        draggableBlock.style.left = (e.clientX - offsetX) + 'px';
        draggableBlock.style.top = (e.clientY - offsetY) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggableBlock.style.cursor = 'grab';
});

// Popup functionality
function openPopup() {
    // Generate a math question
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;

    questionElem.innerText = `What is ${num1} + ${num2}?`;
    popup.style.display = "block";

    // Handle answer submission
    submitAnswer.onclick = function() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === correctAnswer) {
            popup.style.display = "none";
            door.style.display = "none";
            enableBlock();
        } else {
            alert("Incorrect answer. Try again.");
        }
    };
}

closePopup.onclick = function() {
    popup.style.display = "none";
};

function enableBlock() {
    draggableBlock.style.pointerEvents = 'auto';
}

// Hide popup if clicked outside
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

startTimer();