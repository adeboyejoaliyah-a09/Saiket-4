const quizData = {
  technology: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Tool Markup Language",
        "Home Tool Markup Language"
      ],
      answer: 0
    },
    {
      question: "Which technology is mainly used for styling web pages?",
      options: ["HTML", "JavaScript", "CSS", "Python"],
      answer: 2
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Internet",
        "Application Process Integration",
        "Applied Program Interface"
      ],
      answer: 0
    },
    {
      question: "Which one is a version control system?",
      options: ["Git", "Chrome", "Node.js", "Figma"],
      answer: 0
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Digital Ordinance Model",
        "Document Order Method"
      ],
      answer: 0
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Google", "Netscape", "Apple"],
      answer: 2
    },
    {
      question: "Which is NOT a JavaScript framework?",
      options: ["React", "Vue", "Angular", "Django"],
      answer: 3
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Styling Sheet",
        "Colorful Style Syntax"
      ],
      answer: 0
    },
    {
      question: "Which tool is used to debug JavaScript?",
      options: [
        "Browser DevTools",
        "Photoshop",
        "MS Word",
        "Figma"
      ],
      answer: 0
    },
    {
      question: "Which protocol is used to load websites?",
      options: ["FTP", "SMTP", "HTTP", "SSH"],
      answer: 2
    }
  ],

  psychology: [
    {
      question: "Who is known as the father of modern psychology?",
      options: ["Freud", "Skinner", "Wilhelm Wundt", "Pavlov"],
      answer: 2
    },
    {
      question: "What does IQ measure?",
      options: [
        "Emotional strength",
        "Intelligence quotient",
        "Memory size",
        "Creativity level"
      ],
      answer: 1
    },
    {
      question: "Which part of the brain controls emotions?",
      options: ["Cerebellum", "Limbic system", "Medulla", "Spinal cord"],
      answer: 1
    },
    {
      question: "What is cognitive psychology focused on?",
      options: [
        "Behavior only",
        "Mental processes",
        "Dream analysis",
        "Muscle movement"
      ],
      answer: 1
    },
    {
      question: "Who proposed the hierarchy of needs?",
      options: ["Maslow", "Freud", "Skinner", "Bandura"],
      answer: 0
    },
    {
      question: "What is classical conditioning associated with?",
      options: ["Skinner", "Pavlov", "Maslow", "Jung"],
      answer: 1
    },
    {
      question: "What does emotional intelligence relate to?",
      options: [
        "Math skills",
        "Understanding emotions",
        "Physical strength",
        "Memory recall"
      ],
      answer: 1
    },
    {
      question: "Which term means fear of open spaces?",
      options: ["Claustrophobia", "Agoraphobia", "Acrophobia", "Arachnophobia"],
      answer: 1
    },
    {
      question: "Which hormone is linked to stress?",
      options: ["Insulin", "Cortisol", "Melatonin", "Dopamine"],
      answer: 1
    },
    {
      question: "What does CBT stand for?",
      options: [
        "Cognitive Behavioral Therapy",
        "Creative Brain Training",
        "Clinical Behavior Technique",
        "Cognitive Balance Test"
      ],
      answer: 0
    }
  ],

  general: [
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: 2
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Earth", "Venus", "Mercury", "Mars"],
      answer: 2
    },
    {
      question: "What is the largest ocean?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: 2
    },
    {
      question: "Which country has the largest population?",
      options: ["USA", "India", "China", "Russia"],
      answer: 2
    },
    {
      question: "What is the capital of Japan?",
      options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"],
      answer: 2
    },
    {
      question: "Which gas do plants absorb?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      answer: 1
    },
    {
      question: "What year did World War II end?",
      options: ["1942", "1945", "1950", "1939"],
      answer: 1
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Nile", "Amazon", "Mississippi", "Yangtze"],
      answer: 0
    },
    {
      question: "What is the hardest natural substance?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      answer: 2
    },
    {
      question: "Which organ pumps blood?",
      options: ["Brain", "Lungs", "Heart", "Liver"],
      answer: 2
    }
  ]
};

/* Duplicate questions to make 10 per section */
Object.keys(quizData).forEach(section => {
  while (quizData[section].length < 10) {
    quizData[section].push(...quizData[section]);
  }
  quizData[section].length = 10;
});

const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressText = document.getElementById("progressText");
const timeEl = document.getElementById("time");
const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

let currentSection = "";
let currentQuestion = 0;
let userAnswers = [];
let timer;
let timeLeft = 60;

function startQuiz(section) {
  currentSection = section;
  currentQuestion = 0;
  userAnswers = new Array(10);
  timeLeft = 60;

  quizArea.classList.remove("hidden");
  resultArea.classList.add("hidden");

  startTimer();
  loadQuestion();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) finishQuiz();
  }, 1000);
}

function loadQuestion() {
  const data = quizData[currentSection][currentQuestion];
  questionEl.textContent = data.question;
  optionsEl.innerHTML = "";

  progressText.textContent = `Question ${currentQuestion + 1} of 10`;
  progressBar.style.width = `${(currentQuestion / 10) * 100}%`;

  data.options.forEach((opt, i) => {
    optionsEl.innerHTML += `
      <label>
        <input type="radio" name="option" value="${i}" ${userAnswers[currentQuestion] === i ? "checked" : ""}>
        ${opt}
      </label>
    `;
  });

  prevBtn.disabled = currentQuestion === 0;

  if (currentQuestion === 9) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

nextBtn.onclick = () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return alert("Select an answer");
  userAnswers[currentQuestion] = +selected.value;
  currentQuestion++;
  loadQuestion();
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

submitBtn.onclick = () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return alert("Select an answer");
  userAnswers[currentQuestion] = +selected.value;
  finishQuiz();
};

function finishQuiz() {
  clearInterval(timer);

  let score = 0;
  quizData[currentSection].forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");

  const percent = Math.round((score / 10) * 100);
  const message =
    percent >= 80 ? "Excellent performance!" :
    percent >= 50 ? "Good effort, keep improving!" :
    "Keep learning and try again!";

  document.getElementById("scoreText").textContent =
    `You scored ${score}/10 (${percent}%) – ${message}`;
}
