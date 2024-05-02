export type Choice = {
    isAnswer: boolean;
    displayText: string;
}

export type Quize = {
    question: string;
    choices: Choice[];
}