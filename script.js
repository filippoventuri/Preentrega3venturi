// JSON con preguntas y respuestas correctas
const questionsJSON = [
    { id: 1, question: "¿Cuál es la capital de Francia?", options: ["París", "Londres", "Berlín"], correctAnswer: "París" },
    { id: 2, question: "¿Cuál es 2 + 2?", options: ["3", "4", "5"], correctAnswer: "4" },
    { id: 3, question: "¿Qué planeta es conocido como el Planeta Rojo?", options: ["Marte", "Júpiter", "Saturno"], correctAnswer: "Marte" }
];

// Referencias a los elementos en el DOM
const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');

// Cargar preguntas al cargar la página
function loadQuiz() {
    quizContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    // Recorrer cada pregunta y agregarla al DOM
    questionsJSON.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        // Título de la pregunta
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${question.question}`;
        questionDiv.appendChild(questionTitle);

        // Opciones de respuesta
        question.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `
                <input type="radio" name="question${question.id}" value="${option}">
                ${option}
            `;
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionDiv);
    });
}

// Captura las respuestas seleccionadas y las guarda en localStorage
function saveAnswers() {
    questionsJSON.forEach(question => {
        const selectedOption = document.querySelector(`input[name="question${question.id}"]:checked`);
        if (selectedOption) {
            localStorage.setItem(`answer${question.id}`, selectedOption.value);
        }
    });
}

// Calcula el puntaje y muestra el resultado en el DOM
function showResults() {
    let score = 0;
    questionsJSON.forEach(question => {
        const userAnswer = localStorage.getItem(`answer${question.id}`);
        if (userAnswer === question.correctAnswer) {
            score += 1;
        }
    });

    resultContainer.innerHTML = `<div class="result">Puntaje: ${score} de ${questionsJSON.length}</div>`;
}

function handleSubmit() {
    saveAnswers();
    showResults();
    notifyUser("Respuestas enviadas y guardadas. ¡Revisa tu puntaje!");
}


function notifyUser(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    resultContainer.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}


submitButton.addEventListener('click', handleSubmit);


window.onload = loadQuiz;
