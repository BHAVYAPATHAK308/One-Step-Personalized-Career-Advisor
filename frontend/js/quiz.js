const questions = [
    {
        question: "1. How do you prefer to approach a complex problem?",
        options: [
            "A) Break it down logically and code a solution step-by-step",
            "B) Brainstorm creative ideas and sketch a visual map",
            "C) Talk to people to understand how it affects them",
            "D) Look at the numbers, data, and statistical trends"
        ]
    },
    {
        question: "2. What kind of environment do you work best in?",
        options: [
            "A) A quiet space focusing deeply on a tech project",
            "B) A vibrant, collaborative design studio",
            "C) A fast-paced setup where I'm leading a team",
            "D) An organized desk analyzing reports"
        ]
    },
    {
        question: "3. Which of these activities sounds most exciting?",
        options: [
            "A) Building a new app or software tool",
            "B) Creating a beautiful digital illustration or UI",
            "C) Closing a major business deal",
            "D) Discovering insights hidden inside a large dataset"
        ]
    },
    {
        question: "4. When working in a team, what is your usual role?",
        options: [
            "A) The technical expert who builds the core functionality",
            "B) The creative visionary who focuses on aesthetics",
            "C) The manager who coordinates everybody",
            "D) The analyst who ensures everything goes according to plan"
        ]
    },
    {
        question: "5. What appeals to you most about your future career?",
        options: [
            "A) Solving hard technical challenges",
            "B) Expressing myself creatively",
            "C) Making an impact on people and businesses",
            "D) Providing certainty and optimized solutions"
        ]
    },
    {
        question: "6. If you were given a week to learn something new, what would it be?",
        options: [
            "A) A new programming language or software framework",
            "B) A new design software or digital art technique",
            "C) Entrepreneurship, marketing strategies, or negotiation skills",
            "D) Advanced spreadsheet functions or mathematical modeling"
        ]
    },
    {
        question: "7. When attending a large event, what do you find most interesting?",
        options: [
            "A) The intricate technology connecting everything behind the scenes",
            "B) The visual presentation, branding, and aesthetics of the venue",
            "C) Observing how the event organizers coordinate and lead the staff",
            "D) Wondering about the demographics and statistics of the attendees"
        ]
    },
    {
        question: "8. What kind of legacy do you want to leave?",
        options: [
            "A) Building innovative systems or tools that change how we live",
            "B) Creating beautiful artwork or designs that inspire people",
            "C) Leading companies or organizations to monumental success",
            "D) Discovering new truths by solving the world's most complex puzzles"
        ]
    },
    {
        question: "9. How do you naturally handle a sudden change in plans?",
        options: [
            "A) Systematically debug the situation to find a technical workaround",
            "B) Sketch out a creative alternative that looks just as good",
            "C) Re-assign roles and motivate your team to adapt quickly",
            "D) Analyze the new variables to calculate the optimal next step"
        ]
    },
    {
        question: "10. Which hobby sounds the most appealing to you?",
        options: [
            "A) Building custom electronics or developing indie games",
            "B) Photography, video editing, or graphic design",
            "C) Managing a club, organizing events, or debating",
            "D) Playing strategy board games, chess, or solving Sudoku"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();

    // GSAP initialization for the card
    if (typeof gsap !== 'undefined') {
        gsap.from('#quiz-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    document.getElementById('next-btn').addEventListener('click', handleNext);
});

function renderQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('question-counter').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    document.getElementById('next-btn').classList.add('hidden'); // hidden until selected

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = `w-full text-left p-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 option-btn`;
        btn.textContent = opt;
        
        // If already answered
        if (answers[currentQuestion] === index) {
            btn.classList.remove('bg-white/10', 'border-white/20', 'text-white');
            btn.classList.add('bg-indigo-500/40', 'border-indigo-500', 'text-indigo-100');
            document.getElementById('next-btn').classList.remove('hidden');
        }

        btn.addEventListener('click', () => selectOption(index, btn));
        optionsContainer.appendChild(btn);
    });

    // Animate options appearing
    if (typeof gsap !== 'undefined') {
        gsap.fromTo('.option-btn', 
            { x: -20, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.4, 
                stagger: 0.1, 
                ease: 'power2.out',
                clearProps: 'opacity,transform' // removes inline styles after animation so they don't get stuck faded
            }
        );
    }
}

function selectOption(index, selectedBtn) {
    answers[currentQuestion] = index;
    
    // Reset all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-indigo-500/40', 'border-indigo-500', 'text-indigo-100');
        btn.classList.add('bg-white/10', 'border-white/20', 'text-white');
    });

    // Highlight selected
    selectedBtn.classList.remove('bg-white/10', 'border-white/20', 'text-white');
    selectedBtn.classList.add('bg-indigo-500/40', 'border-indigo-500', 'text-indigo-100');
    
    document.getElementById('next-btn').classList.remove('hidden');
}

function handleNext() {
    if (currentQuestion < questions.length - 1) {
        // Animate out
        gsap.to('#quiz-card', {
            x: -50,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                currentQuestion++;
                renderQuestion();
                gsap.fromTo('#quiz-card', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
            }
        });
    } else {
        showResults();
    }
}

function showResults() {
    // Hide quiz, show results
    gsap.to(['#quiz-card', '#progress-container'], {
        y: -50,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            document.getElementById('quiz-card').classList.add('hidden');
            document.getElementById('progress-container').classList.add('hidden');
            
            const resultCard = document.getElementById('result-card');
            resultCard.classList.remove('hidden');
            resultCard.classList.add('flex'); // Because we use flex-col on display

            gsap.fromTo('#result-card', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' });

            // Trigger confetti
            if (typeof confetti !== 'undefined') {
                const duration = 3 * 1000;
                const end = Date.now() + duration;

                (function frame() {
                    confetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#4F46E5', '#8B5CF6', '#10B981']
                    });
                    confetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#4F46E5', '#8B5CF6', '#10B981']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            }
        }
    });
}
