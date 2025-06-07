// script.js

// grammar_modules/grammar_index.js에서 모든 문법 모듈 정보를 가져옵니다.
import { grammarModules } from './grammar_modules/grammar_index.js';

// HTML 요소들을 가져옵니다.
const welcomeSection = document.getElementById('welcome-section');
const startLearningButton = document.getElementById('start-learning-button');
const learningHeader = document.getElementById('learning-header'); // 새로 추가된 헤더
const goHomeButton = document.getElementById('go-home-button');     // 새로 추가된 홈 버튼
const grammarSelectionGuide = document.getElementById('grammar-selection-guide'); // 새로 추가된 안내 문구

const grammarSelectionContainer = document.getElementById('grammar-selection-buttons');
const grammarInfoSection = document.getElementById('grammar-info-section');
const quizSection = document.getElementById('quiz-section');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const feedbackElement = document.getElementById('feedback');

// 초기 설정
let currentGrammarModuleIndex = 0; // 현재 선택된 문법 모듈의 인덱스
let currentQuestionIndex = 0;     // 현재 풀고 있는 문제의 인덱스

// 현재 활성화된 문법 모듈의 질문 배열을 가져오는 헬퍼 함수
function getActiveQuestions() {
    return grammarModules[currentGrammarModuleIndex].questions;
}

// 문법 설명을 동적으로 로드하는 함수
async function loadGrammarInfo(infoPath) {
    try {
        const response = await fetch(infoPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        grammarInfoSection.innerHTML = htmlContent;
    } catch (error) {
        console.error('문법 설명 로드 실패:', error);
        grammarInfoSection.innerHTML = '<p style="color: red;">문법 설명을 불러올 수 없습니다.</p>';
    }
}

// 웹페이지가 로드될 때 또는 문법/다음 문제 버튼 클릭 시 문제를 불러오는 함수
function loadQuestion() {
    const questions = getActiveQuestions(); // 현재 활성화된 문법의 문제들을 가져옴

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question; // 문제 텍스트 업데이트
        answerInput.value = ''; // 입력창 초기화
        feedbackElement.textContent = ''; // 피드백 메시지 초기화
        feedbackElement.style.color = '#333'; // 피드백 색상 초기화
        answerInput.style.display = 'block'; // 입력창 다시 보이게
        document.getElementById('check-answer-button').style.display = 'inline-block';
        document.getElementById('next-question-button').style.display = 'inline-block';

    } else {
        // 모든 문제를 다 풀었을 경우
        questionElement.textContent = `현재 문법(${grammarModules[currentGrammarModuleIndex].name})의 모든 문제를 다 푸셨습니다! 정말 잘하셨어요!`;
        answerInput.style.display = 'none';
        document.getElementById('check-answer-button').style.display = 'none';
        document.getElementById('next-question-button').style.display = 'none';
        feedbackElement.textContent = "다른 문법을 선택하거나 다시 풀어볼 수 있습니다.";
        feedbackElement.style.color = 'blue';
    }
}

// 정답 확인 함수 (간단한 버전 유지)
function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    const questions = getActiveQuestions();
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.answer) {
        feedbackElement.textContent = '정답입니다! 아주 잘하셨어요!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = '오답입니다. 정답은 "' + currentQuestion.answer + '" 입니다.';
        feedbackElement.style.color = 'red';
    }
}

// 다음 문제 로드 함수
function loadNextQuestion() {
    if (feedbackElement.textContent.includes('정답입니다') || answerInput.value.trim() === '') {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert('현재 문제를 다시 확인하거나 정답을 맞춰주세요!');
    }
}

// 문법 모듈을 변경하는 함수
function changeGrammarModule(moduleIndex) {
    currentGrammarModuleIndex = moduleIndex;
    currentQuestionIndex = 0;             
    
    const selectedModuleInfoPath = grammarModules[currentGrammarModuleIndex].infoPath;
    loadGrammarInfo(selectedModuleInfoPath);
    
    loadQuestion();
}

// --- HTML에 동적으로 문법 선택 버튼 생성 ---
function createGrammarSelectionButtons() {
    // 버튼 중복 생성을 막기 위해 기존 버튼 삭제
    grammarSelectionContainer.innerHTML = ''; 

    grammarModules.forEach((module, index) => {
        const button = document.createElement('button');
        button.textContent = module.name;
        button.onclick = () => changeGrammarModule(index);
        button.style.marginRight = '10px';
        button.style.marginBottom = '15px';
        grammarSelectionContainer.appendChild(button);
    });
}

// --- 초기 화면 및 이벤트 리스너 ---

// 모든 섹션을 숨기고 환영 섹션만 보여주는 함수
function showWelcomeScreen() {
    welcomeSection.style.display = 'block';
    learningHeader.style.display = 'none';
    grammarSelectionContainer.style.display = 'none';
    grammarInfoSection.style.display = 'none';
    quizSection.style.display = 'none';
}

// 학습 섹션 (문법 선택, 설명, 퀴즈)을 보여주는 함수
function showLearningScreen() {
    welcomeSection.style.display = 'none';
    learningHeader.style.display = 'flex'; // '홈으로' 버튼과 안내 문구를 나란히 배치하기 위해 flex 사용
    grammarSelectionContainer.style.display = 'block';
    grammarInfoSection.style.display = 'block';
    quizSection.style.display = 'block';
    
    createGrammarSelectionButtons(); // 문법 선택 버튼 생성
    changeGrammarModule(0);          // 첫 번째 문법 모듈(인덱스 0)을 기본으로 로드
}


document.addEventListener('DOMContentLoaded', () => {
    showWelcomeScreen(); // 페이지 로드 시에는 환영 섹션만 보이도록 설정

    // '지금 바로 학습 시작하기!' 버튼 클릭 이벤트
    startLearningButton.addEventListener('click', showLearningScreen);

    // '홈으로' 버튼 클릭 이벤트
    goHomeButton.addEventListener('click', showWelcomeScreen);
});