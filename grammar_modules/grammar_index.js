// grammar_modules/grammar_index.js

// 1. 개별 문법 모듈들을 가져옵니다.
import { grammar1Questions } from './grammar_1.js'; // 파일 이름 변경 반영
import { grammar2Questions } from './grammar_2.js'; // 파일 이름 변경 반영

// 2. 각 문법 모듈에 대한 정보를 객체 형태로 정의합니다.
//    'id': 고유한 식별자
//    'name': 웹사이트에 표시될 문법 이름
//    'questions': 해당 문법의 문제 배열
//    'infoPath': 해당 문법 설명 HTML 파일의 경로
const grammarModules = [
    {
        id: 'imnida_bnida',
        name: '-입니다/-ㅂ니다',
        questions: grammar1Questions, // 변수 이름 변경 반영
        infoPath: './grammar_modules/info_grammar_1.html' // 파일 이름 변경 반영
    },
    {
        id: 'eoyo_aoyo',
        name: '-어요/-아요',
        questions: grammar2Questions, // 변수 이름 변경 반영
        infoPath: './grammar_modules/info_grammar_2.html'   // 파일 이름 변경 반영
    }
    // 새로운 문법을 추가할 때는 여기에 새 객체를 추가합니다.
    // {
    //     id: 'new_grammar_id',
    //     name: '새로운 문법',
    //     questions: newGrammarQuestions,
    //     infoPath: './grammar_modules/info_new_grammar_id.html'
    // }
];

// 3. 정의된 문법 모듈 배열을 외부로 내보냅니다.
export { grammarModules };