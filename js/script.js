document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selecties - Controleer of deze ID's overeenkomen met je HTML
    const quizContainer = document.getElementById('quiz-container');
    const startQuizButton = document.getElementById('start-quiz-button');
    const quizResults = document.getElementById('quiz-results');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const resultMessage = document.getElementById('result-message');
    const restartQuizButton = document.getElementById('restart-quiz-button');

    // 2. Quiz Status Variabelen
    let currentQuestionIndex = 0;
    let score = 0;

    // 3. Quiz Vragen Data
    const quizQuestions = [
        {
            question: "Je ontvangt een e-mail van je bank waarin staat dat je direct je account moet verifiëren via een link. Wat doe je?",
            options: [
                "Klik direct op de link en vul je gegevens in.",
                "Bel de bank op een officieel nummer (niet het nummer uit de e-mail) om te controleren of het bericht legitiem is.",
                "Antwoord op de e-mail en vraag om meer informatie.",
                "Negeer de e-mail en hoop dat het vanzelf overgaat."
            ],
            answer: 1 // Index van het correcte antwoord (0-gebaseerd)
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

    // Zorg ervoor dat dit altijd wordt ingesteld bij initialisatie, ongeacht of de quiz gestart is.
    totalQuestionsSpan.textContent = quizQuestions.length;

    // Functie om de volgende vraag te laden of de resultaten te tonen
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
                    <button id="submit-answer-button" class="button">Volgende vraag</button>
                </div>
            `;
            // Belangrijk: Event listener moet opnieuw worden toegevoegd aan de NIEUWE knop
            document.getElementById('submit-answer-button').addEventListener('click', checkAnswer);
        } else {
            showResults(); // Alle vragen beantwoord, toon resultaten
        }
    }

    // Functie om het antwoord te controleren
    function checkAnswer() {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            if (userAnswer === quizQuestions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++; // Ga naar de volgende vraag
            loadQuestion(); // Laad de volgende vraag of resultaten
        } else {
            alert("Maak alsjeblieft een keuze voordat je verder gaat.");
        }
    }

    // Functie om de quizresultaten te tonen
    function showResults() {
        quizContainer.style.display = 'none'; // Verberg de vragen container
        // startQuizButton.style.display = 'none'; // Deze kan verwijderd worden, want hij is al verborgen.
        quizResults.style.display = 'block'; // Toon de resultaten container
        scoreSpan.textContent = score; // Update de score

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

    // Functie om de quiz te resetten naar de beginstand
    function resetQuiz() {
        currentQuestionIndex = 0; // Reset vraagindex
        score = 0; // Reset score
        quizContainer.innerHTML = ''; // Leeg de quiz container van eventuele oude vragen
        
        // Zorg ervoor dat de startknop zichtbaar is en de quiz resultaten verborgen
        quizContainer.style.display = 'block'; // Zorgt dat de container met de startknop zichtbaar is
        startQuizButton.style.display = 'inline-block'; // Toon de startknop
        quizResults.style.display = 'none'; // Verberg de resultaten

        // Voeg de startknop weer toe aan de quizContainer als die eerder leeg was gehaald
        // Dit is alleen nodig als je de HTML van de startknop dynamisch verwijdert uit de quizContainer.
        // In jouw HTML staat de startknop al direct in quiz-container, dus dit is niet nodig:
        // quizContainer.appendChild(startQuizButton); // NIET NODIG ALS STARTKNOP AL IN HTML STAAT

    }

    // Event listeners voor knoppen
    startQuizButton.addEventListener('click', () => {
        // startQuizButton.style.display = 'none'; // Deze verbergt de knop, wat prima is
        loadQuestion(); // Start de quiz door de eerste vraag te laden
    });

    restartQuizButton.addEventListener('click', resetQuiz); // Reset quiz bij klik op herstartknop

    // Initialisatie: zorg ervoor dat de quiz start met alleen de startknop zichtbaar
    // Dit zorgt ervoor dat de quiz de juiste initiële staat heeft.
    resetQuiz();
});