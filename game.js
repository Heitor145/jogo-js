const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

let gameStarted = false;
let quizActive = false;

const FPS = 10;

const perguntas = [

    {
        pergunta: "A urbanização é o crescimento da população nas cidades.",
        resposta: true
    },

    {
        pergunta: "A urbanização acontece somente em países desenvolvidos.",
        resposta: false
    },

    {
        pergunta: "O crescimento desordenado das cidades pode causar problemas de trânsito.",
        resposta: true
    },

    {
        pergunta: "Urbanização significa diminuir o número de pessoas vivendo nas cidades.",
        resposta: false
    },

    {
        pergunta: "A falta de planejamento urbano pode contribuir para problemas ambientais.",
        resposta: true
    }

];

let perguntaAtual = null;

window.onload = () => {

    setInterval(gameLoop, 1000 / FPS);

};

function gameLoop() {

    if (!gameStarted) {

        drawMenu();

        return;

    }

    if (quizActive) {

        draw();

        drawQuiz();

        return;

    }

    update();

    draw();

}

function drawMenu() {

    canvasContext.fillStyle = "black";

    canvasContext.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    canvasContext.fillStyle = "#43A047";

    canvasContext.font = "32px Arial";

    canvasContext.textAlign = "center";

    canvasContext.fillText(
        "🌍 URBANIZAÇÃO",
        canvas.width / 2,
        90
    );

    canvasContext.font = "70px Arial";

    canvasContext.fillText(
        "🧑",
        canvas.width / 2,
        180
    );

    canvasContext.fillStyle = "white";

    canvasContext.font = "22px Arial";

    canvasContext.fillText(
        "Aperte F para começar",
        canvas.width / 2,
        260
    );

    canvasContext.font = "18px Arial";

    canvasContext.fillText(
        "Use ← ↑ → ↓ para mover",
        canvas.width / 2,
        300
    );

}

window.addEventListener("keydown", (event) => {

    if (
        !gameStarted &&
        event.key.toLowerCase() === "f"
    ) {

        gameStarted = true;

        quizActive = false;

        snake.tail = [
            { x: 20, y: 20 }
        ];

        snake.rotateX = 0;

        snake.rotateY = 1;

        apple.newPosition();

    }

});

class Snake {

    constructor() {

        this.size = 20;

        this.tail = [
            { x: 20, y: 20 }
        ];

        this.rotateX = 0;

        this.rotateY = 1;

    }

    move() {

        let head =
            this.tail[this.tail.length - 1];

        let newHead = {

            x: head.x +
                this.rotateX * this.size,

            y: head.y +
                this.rotateY * this.size

        };

        this.tail.shift();

        this.tail.push(newHead);

    }

}

class Apple {

    constructor() {

        this.size = 20;

        this.newPosition();

    }

    newPosition() {

        this.x =
            Math.floor(Math.random() * 20) * 20;

        this.y =
            Math.floor(Math.random() * 20) * 20;

    }

}

const snake = new Snake();

const apple = new Apple();

window.addEventListener("keydown", (event) => {

    if (!gameStarted || quizActive) {

        return;

    }

    switch (event.key) {

        case "ArrowLeft":

            if (snake.rotateX != 1) {

                snake.rotateX = -1;

                snake.rotateY = 0;

            }

        break;

        case "ArrowRight":

            if (snake.rotateX != -1) {

                snake.rotateX = 1;

                snake.rotateY = 0;

            }

        break;

        case "ArrowUp":

            if (snake.rotateY != 1) {

                snake.rotateX = 0;

                snake.rotateY = -1;

            }

        break;

        case "ArrowDown":

            if (snake.rotateY != -1) {

                snake.rotateX = 0;

                snake.rotateY = 1;

            }

        break;

    }

});

function update() {

    let head =
        snake.tail[snake.tail.length - 1];

    let newHead = {

        x: head.x +
            snake.rotateX * snake.size,

        y: head.y +
            snake.rotateY * snake.size

    };

    if (

        newHead.x < 0 ||

        newHead.x >= canvas.width ||

        newHead.y < 0 ||

        newHead.y >= canvas.height

    ) {

        abrirQuiz();

        return;

    }

    for (
        let i = 0;
        i < snake.tail.length;
        i++
    ) {

        if (

            newHead.x === snake.tail[i].x &&

            newHead.y === snake.tail[i].y

        ) {

            abrirQuiz();

            return;

        }

    }

    snake.move();

    head =
        snake.tail[snake.tail.length - 1];

    if (

        head.x == apple.x &&

        head.y == apple.y

    ) {

        snake.tail.unshift({

            x: snake.tail[0].x,

            y: snake.tail[0].y

        });

        apple.newPosition();

    }

}

function abrirQuiz() {

    quizActive = true;

    let numero =
        Math.floor(
            Math.random() * perguntas.length
        );

    perguntaAtual = perguntas[numero];

}

function drawQuiz() {

    canvasContext.fillStyle =
        "rgba(0, 0, 0, 0.85)";

    canvasContext.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    canvasContext.fillStyle = "#43A047";

    canvasContext.font = "28px Arial";

    canvasContext.textAlign = "center";

    canvasContext.fillText(
        "QUIZ DE URBANIZAÇÃO",
        canvas.width / 2,
        60
    );

    canvasContext.fillStyle = "white";

    canvasContext.font = "20px Arial";

    let palavras =
        perguntaAtual.pergunta.split(" ");

    let linha = "";

    let linhas = [];

    for (
        let i = 0;
        i < palavras.length;
        i++
    ) {

        let teste =
            linha + palavras[i] + " ";

        if (
            canvasContext.measureText(teste).width
            > 350
        ) {

            linhas.push(linha);

            linha =
                palavras[i] + " ";

        } else {

            linha = teste;

        }

    }

    linhas.push(linha);

    for (
        let i = 0;
        i < linhas.length;
        i++
    ) {

        canvasContext.fillText(

            linhas[i],

            canvas.width / 2,

            140 + i * 28

        );

    }

    canvasContext.fillStyle =
        "#43A047";

    canvasContext.font = "22px Arial";

    canvasContext.fillText(
        "V - VERDADEIRO",
        canvas.width / 2,
        260
    );

    canvasContext.fillStyle =
        "#E53935";

    canvasContext.fillText(
        "F - FALSO",
        canvas.width / 2,
        310
    );

    canvasContext.fillStyle = "white";

    canvasContext.font = "16px Arial";

    canvasContext.fillText(
        "Responda usando V ou F",
        canvas.width / 2,
        360
    );

}

window.addEventListener("keydown", (event) => {

    if (!quizActive) {

        return;

    }

    let tecla =
        event.key.toLowerCase();

    if (tecla === "v") {

        responderQuiz(true);

    }

    if (tecla === "f") {

        responderQuiz(false);

    }

});

function responderQuiz(resposta) {

    if (
        resposta === perguntaAtual.resposta
    ) {

        quizActive = false;

        perguntaAtual = null;

    } else {

        gameOver();

    }

}

function gameOver() {

    gameStarted = false;

    quizActive = false;

    snake.tail = [
        { x: 20, y: 20 }
    ];

    snake.rotateX = 0;

    snake.rotateY = 1;

    apple.newPosition();

    perguntaAtual = null;

}

function draw() {

    drawEarth();

    canvasContext.font = "18px Arial";

    for (
        let i = 0;
        i < snake.tail.length;
        i++
    ) {

        canvasContext.fillText(

            "🧑",

            snake.tail[i].x,

            snake.tail[i].y + 17

        );

    }

    canvasContext.font = "18px Arial";

    canvasContext.fillText(

        "🍎",

        apple.x,

        apple.y + 17

    );

    canvasContext.fillStyle = "white";

    canvasContext.font = "20px Arial";

    canvasContext.textAlign = "left";

    canvasContext.fillText(

        "População: " +
        snake.tail.length,

        10,

        25

    );

}

function drawEarth() {

    const tile = 20;

    const map = [

        "BBBBBBBBBBBBBBBBBBBB",
        "BBBBBBBBBBGGGBBBBBBB",
        "BBBBBBBGGGGGGGBBBBBB",
        "BBBBGGGGGGGGGGGBBBBB",
        "BBBGGGGGGGGGGGGGGGBB",
        "BBGGGGGGGGGGGGGGGGBB",
        "BBGGGGGGGGGGGGGGGGGB",
        "BGGGGGGGGGGGGGGGGGGB",
        "BGGGGGGGGGGGGGGGGGGB",
        "BGGGGGGGGGGGGGGGGGGB",
        "BGGGGGGGGGGGGGGGGGGB",
        "BBGGGGGGGGGGGGGGGGGB",
        "BBGGGGGGGGGGGGGGGGBB",
        "BBBGGGGGGGGGGGGGGGBB",
        "BBBBGGGGGGGGGGGBBBBB",
        "BBBBBBBGGGGGGGBBBBBB",
        "BBBBBBBBBBGGGBBBBBBB",
        "BBBBBBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBBBBBB"

    ];

    for (let y = 0; y < 20; y++) {

        for (let x = 0; x < 20; x++) {

            let color;

            switch (map[y][x]) {

                case "K":

                    color = "#000000";

                    break;

                case "B":

                    color = "#1E88E5";

                    break;

                case "G":

                    color = "#43A047";

                    break;

            }

            canvasContext.fillStyle = color;

            canvasContext.fillRect(

                x * tile,

                y * tile,

                tile,

                tile

            );

        }

    }

}