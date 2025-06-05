export interface Question {
    id: string;
    question: string;
    answers: string[];
    correct_index: number;
    explanation?: string;
    image?: string;
    was_answered_correctly?: boolean;
    was_selected_index?: number;
    is_favorite?: boolean;
}

export interface AnswerResult {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
    timestamp: string;
}

export interface TestConfig {
    mode: 'practice' | 'timed' | 'exam' | 'errors' | 'favorites';
    title: string;
    timeLimit?: number; // in seconds
    showExplanation: boolean;
    allowChangeAnswer: boolean;
    autoProceed: boolean;
    aiEnabled: boolean;
    aiCredits: number;
    shuffleQuestions: boolean;
    shuffleAnswers: boolean;
    showPreviousAnswers: boolean;
}