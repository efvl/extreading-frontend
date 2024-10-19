import React, { MouseEventHandler, useEffect, useState } from "react";
import { Word } from "../../word/models/Word";
import { Container } from "react-bootstrap";

interface PageWordProps {
    word?:Word,
    arrIndex?:number,
    clickAction?:(selectedWord:Word) => void,
}

const PageWord = (props:PageWordProps) => {
    const defaultColor = 'black';
    const selectedColor = '#de5709';
    const [curWord, setCurWord] = useState<Word>({});

    useEffect(() => {
        if(props.word){
            setCurWord(props.word);
        } 
    }, [props]);

    const clickWordAction = (e) => {
        e.preventDefault();
        props.clickAction(curWord);
    }

    return (
        <>
            <span style={{ 'color': props.word.isSelected? selectedColor : defaultColor, 'fontSize': '1.2em', 'fontWeight': '500' }} 
                onClick={clickWordAction} key={"pageWord_" + props.arrIndex}> {curWord.original}</span>
        </>
    );
};

export default PageWord;