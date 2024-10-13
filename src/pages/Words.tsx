import React, {useEffect, useState} from "react";
import Layout from "../layout/Layout";
import { Word } from "../features/word/models/Word";
import WordService from "../features/word/services/WordService";
import WordActionBar from "../features/word/components/WordActionBar";
import WordTable from "../features/word/components/WordTable";

const Words = () => {

    const [wordList, setWordList] = useState<Word[]>([]);

    useEffect(() => {
        fetchWords();
    }, []);

    async function fetchWords() {
        const response = await WordService.searchWords({});
        console.log(response.data);
        setWordList(response.data);
    }

    const deleteWord = async (id:string) => {
        await WordService.deleteWord(id);
        fetchWords();
    } 

    return (
        <>
        <Layout>
            <WordActionBar/>
            <WordTable wordList={wordList} remove={deleteWord}/>
        </Layout>
        </>
    );

};

export default Words;
