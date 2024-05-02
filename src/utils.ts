import { Choice, Quize } from './vo/question';

export const MAX_CHOICE = 4, MAX_QUIZE = 20;

enum Operator {
    Add = '+',
    Subtract = '-',
    Multiply = 'x',
    Devide = '%',
}

const operators = [
    Operator.Add,
    Operator.Subtract,
    Operator.Multiply,
    Operator.Devide,
]

const getRandomNumber = (digit: number): number => {
    // start at 0
    return Math.floor(Math.random() * (digit * 10));
}

const randomRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const calculate = (number1: number, number2: number, operator: Operator): number => {
    switch(operator) {
        case Operator.Add: {
            return number1 + number2;
        }
        case Operator.Subtract: {
            return number1 - number2;
        }
        case Operator.Multiply: {
            return number1 * number2;
        }
        case Operator.Devide: {
            return number1 / number2;
        }
    }
}


const generateFakeAnswer = (answer: number, number1: number, number2: number, operator: Operator): number => {
    let fakeAnswer;
    // do {
    // } while(fakeAnswer === answer)
        fakeAnswer = calculate(number1 - randomRange(1, 5), number2 + randomRange(1, 5), operator);
    return fakeAnswer;
}

const generateChoice = (answer: number, number1: number, number2: number, operator: Operator) => {
    const choices: Choice[] = []

    // start at 0
    const rightChoice = randomRange(0, MAX_CHOICE);

    for (let choiceIndex = 0; choiceIndex < MAX_CHOICE; choiceIndex++) {
        if (choiceIndex === rightChoice) {
            const choice: Choice = {
                isAnswer: true,
                displayText: answer.toString(),
            }
            choices.push(choice);
        } else {
            const choice: Choice = {
                isAnswer: false,
                displayText: generateFakeAnswer(answer, number2, number2, operator).toFixed(2),
            }
            choices.push(choice);
        }
    }
    return choices;
}

const getRandomOperator = (): Operator => {
    const operatorIndex = randomRange(0, operators.length);
    return operators[operatorIndex];
}


export const generateQuizzes = (): Quize[] => {
    const quizzes: Quize[] = [];
    for (let questionIndex = 0; questionIndex < MAX_QUIZE; questionIndex++) {
        const digit = randomRange(1, 6);
        const number1 = getRandomNumber(digit);
        const number2 = getRandomNumber(digit);
        const operator = getRandomOperator();
        const answer = calculate(number1, number2, operator).toFixed(2);
        const question = `${number1} ${operator} ${number2} = ?`;
        const choices = generateChoice(Number(answer), number1, number2, operator);

        const quize: Quize = {
            question,
            choices, 
        }

        quizzes.push(quize);
    }

    return quizzes;
}
