const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");
const instructions = document.getElementById("instructions");
const instructionArea = document.getElementById("instructionArea");
const timerDisplay = document.getElementById("timer");
const vrScene = document.getElementById("vrScene");
const vrStartButton = document.getElementById("vrStartButton");

let timer;
let time = 0;
let path = "";

startButton.addEventListener("click", startGame);
vrStartButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = "none";
    instructions.style.display = "none";
    gameArea.style.display = "block";
    vrScene.style.display = "block";
    startTimer();
    showInstruction("Move forward using arrow up", 10, askFirstQuestion);
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerDisplay.textContent = `Time: ${time}s`;
    }, 1000);
}

function showInstruction(instruction, waitTime, nextAction) {
    instructionArea.textContent = instruction;
    setTimeout(nextAction, waitTime * 1000);
}

function askFirstQuestion() {
    askQuestion("What color is Santa's suit?", "red", moveForward);
}

function askQuestion(question, correctAnswer, nextAction) {
    const answer = prompt(question);
    if (answer === correctAnswer) {
        nextAction();
    } else {
        instructionArea.textContent = "Wrong answer. Try again!";
        setTimeout(() => askQuestion(question, correctAnswer, nextAction), 2000);
    }
}

function moveForward() {
    showInstruction("Move forward using arrow up", 2, chooseDirection);
}

function chooseDirection() {
    showInstruction("To move left use arrow left. To move right use arrow right", 0, () => {
        document.addEventListener("keydown", handleDirectionChoice);
    });
}

function handleDirectionChoice(event) {
    if (event.key === "ArrowLeft") {
        path = "left";
        document.removeEventListener("keydown", handleDirectionChoice);
        proceedLeftPath();
    } else if (event.key === "ArrowRight") {
        path = "right";
        document.removeEventListener("keydown", handleDirectionChoice);
        proceedRightPath();
    }
}

function proceedLeftPath() {
    showInstruction("Move left using arrow left", 1, () => {
        askQuestion("What is 10 - 5?", "5", moveForwardLeftPath1);
    });
}

function moveForwardLeftPath1() {
    showInstruction("Move forward using arrow up", 2, () => {
        showInstruction("Move left using arrow left", 3, () => {
            askQuestion("What is 10 * 2?", "20", moveForwardLeftPath2);
        });
    });
}

function moveForwardLeftPath2() {
    showInstruction("Move forward using arrow up", 3, () => {
        askQuestion("What is the square root of 16?", "4", moveLeftAndAskFinal);
    });
}

function moveLeftAndAskFinal() {
    showInstruction("Move left using arrow left", 3, () => {
        askQuestion("What is 6 * 6?", "36", winGame);
    });
}

function proceedRightPath() {
    showInstruction("Move forward using arrow up", 2, () => {
        askQuestion("What is 2 + 3?", "5", () => {
            showInstruction("Move left using arrow left", 2, () => {
                showInstruction("Move forward using arrow up", 1, () => {
                    askQuestion("What is 3 * 3?", "9", () => {
                        showInstruction("Move forward using arrow up", 1, () => {
                            askQuestion("What is 4 * 2?", "8", () => {
                                showInstruction("Move forward using arrow up", 2, () => {
                                    showInstruction("Move left using arrow left", 1, () => {
                                        showInstruction("Move forward using arrow up", 1, () => {
                                            askQuestion("What is 5 + 5?", "10", winGame);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function winGame() {
    clearInterval(timer);
    vrScene.style.display = "none";

    // Update the game area to show full screen
    gameArea.style.display = "flex";
    gameArea.style.justifyContent = "center";
    gameArea.style.alignItems = "center";
    gameArea.style.backgroundColor = "#E3001E";
    gameArea.style.color = "#000";
    gameArea.style.height = "100vh";
    gameArea.style.width = "100vw";
    gameArea.style.position = "absolute";
    gameArea.style.top = "0";
    gameArea.style.left = "0";
    gameArea.innerHTML = `<div id="finalMessage" style="text-align: center; color: white; font-family: cursive; font-size: 30px; ">
        <img src="treasure.png" alt="Treasure" style="width: 500px; height: auto;"> <br>
        Congratulations! You found the treasure in ${time}s! Your time is being compared with other players.
    </div>`;
}


function createSnowflakes() {
    const container = document.getElementById("container");
    const snowflakes = document.getElementById("snowflakes");
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("a-sphere");
        snowflake.setAttribute("radius", "0.01");
        snowflake.setAttribute("color", "white");
        snowflake.setAttribute("position", `${Math.random() * 10 - 5} 5 ${Math.random() * 10 - 5}`);
        snowflake.setAttribute("animation", `property: position; to: ${Math.random() * 10 - 5} -5 ${Math.random() * 10 - 5}; loop: true; dur: ${Math.random() * 3000 + 2000}`);
        snowflakes.appendChild(snowflake);
    }
}

createSnowflakes();
