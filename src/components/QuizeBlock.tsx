import React, { useState } from 'react';
import { Choice, Quize } from '../vo/question';
import './QuizeBlock.css';

interface QuizeBlockProps {
    quize: Quize;
    callback: (choice: Choice) => void;
    runNumber: number;
}

const QuizeBlock: React.FC<QuizeBlockProps> = ({ quize, callback, runNumber }) => {

    const [disabledInput, setDisabledInput] = useState<boolean>(false);

    const handleChange = (choice: Choice) => {
        callback(choice);
        setDisabledInput(true);
    }

    return (
        <div className="QuizeBlock-container">
            <div className="QuizeBlock-question">{runNumber}) {quize.question}</div>
            <div className="QuizeBlock-choices">
                {quize.choices.map((choice) =>
                    <div className="QuizeBlock-choice">
                        <input key={choice.displayText} disabled={disabledInput} onChange={() => handleChange(choice)} type="radio" value={choice.displayText} /> {choice.displayText}
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuizeBlock;