document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const startQuizButton = document.getElementById('start-quiz-button');
    const quizResults = document.getElementById('quiz-results');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const resultMessage = document.getElementById('result-message');
    const restartQuizButton = document.getElementById('restart-quiz-button');

    let currentQuestionIndex = 0;
    let score = 0;

    const quizQuestions = [
        {
            question: "Je ontvangt een e-mail van je bank waarin staat dat je direct je account moet verifiëren via een link. Wat doe je?",
            options: [
                "Klik direct op de link en vul je gegevens in.",
                "Bel de bank op een officieel nummer (niet het nummer uit de e-mail) om te controleren of het bericht legitiem is.",
                "Antwoord op de e-mail en vraag om meer informatie.",
                "Negeer de e-mail en hoop dat het vanzelf overgaat."
            ],
            answer: 1 // Index van het correcte antwoord
        },
        {
            question: "Je bent op een openbaar Wi-Fi netwerk in een café. Wat is de veiligste actie als je online bankzaken wilt regelen?",
            options: [
                "Ga gewoon door met je bankzaken; openbare Wi-Fi is handig.",
                "Gebruik je mobiele data (4G/5G) of een VPN om je verbinding te beveiligen.",
                "Voer alleen kleine transacties uit.",
                "Log uit na elke transactie."
            ],
            answer: 1
        },
        {
            question: "Je hebt onlangs een nieuw social media account aangemaakt. Wat is de eerste stap die je moet nemen voor je privacy?",
            options: [
                "Begin direct met het posten van foto's en updates.",
                "Accepteer alle standaard privacy-instellingen.",
                "Neem de tijd om de privacy-instellingen grondig door te nemen en aan te passen naar je voorkeur.",
                "Deel je inloggegevens met een paar goede vrienden."
            ],
            answer: 2
        },
        {
            question: "Waarom is het belangrijk om software (besturingssysteem, browser, apps) regelmatig te updaten?",
            options: [
                "Om nieuwe, leuke functies te krijgen.",
                "Om compatibiliteitsproblemen te voorkomen.",
                "Updates bevatten vaak belangrijke beveiligingspatches die kwetsbaarheden dichten.",
                "Het is niet echt belangrijk, zolang alles maar werkt."
            ],
            answer: 2
        },
        {
            question: "Wat is het belangrijkste doel van 'third-party cookies'?",
            options: [
                "Om je inloggegevens voor een website te onthouden.",
                "Om je browsegedrag over verschillende websites te volgen voor bijvoorbeeld gerichte advertenties.",
                "Om de prestaties van een website te verbeteren.",
                "Om de website te laten weten welke taal je spreekt."
            ],
            answer: 1
        }
    ];

    totalQuestionsSpan.textContent = quizQuestions.length;

    function loadQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const questionData = quizQuestions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>Vraag ${currentQuestionIndex + 1}: ${questionData.question}</h3>
                    <div class="quiz-options">
                        ${questionData.options.map((option, index) => `
                            <label>
                                <input type="radio" name="question${currentQuestionIndex}" value="${index}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <button id="submit-answer-button">Volgende vraag</button>
                </div>
            `;
            document.getElementById('submit-answer-button').addEventListener('click', checkAnswer);
        } else {
            showResults();
        }
    }

    function checkAnswer() {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            if (userAnswer === quizQuestions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert("Maak alsjeblieft een keuze voordat je verder gaat.");
        }
    }

    function showResults() {
        quizContainer.style.display = 'none';
        startQuizButton.style.display = 'none'; // Verberg de startknop
        quizResults.style.display = 'block';
        scoreSpan.textContent = score;

        let message = "";
        if (score === quizQuestions.length) {
            message = "Geweldig! Je bent een ware privacy-expert. Je digitale schild is ijzersterk!";
        } else if (score >= quizQuestions.length / 2) {
            message = "Goed gedaan! Je hebt een solide basiskennis van digitale privacy. Blijf leren en je kunt je bescherming nog verder verbeteren.";
        } else {
            message = "Je hebt nog wat te leren over digitale privacy, maar dat is helemaal niet erg! Lees de informatie op deze website nog eens goed door om je digitale schild te versterken.";
        }
        resultMessage.textContent = message;
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.style.display = 'block';
        startQuizButton.style.display = 'inline-block'; // Toon de startknop weer
        quizResults.style.display = 'none';
        quizContainer.innerHTML = ''; // Leeg de quiz container voor de startknop
    }

    startQuizButton.addEventListener('click', () => {
        startQuizButton.style.display = 'none';
        loadQuestion();
    });

    restartQuizButton.addEventListener('click', resetQuiz);

    // Initial state
    resetQuiz(); // Zorgt ervoor dat de quiz start met alleen de startknop
});