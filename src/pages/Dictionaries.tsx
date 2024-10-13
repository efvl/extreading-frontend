import React, {useEffect, useState} from "react";
import Layout from "../layout/Layout";
import { Dictionary } from "../features/dictionary/models/Dictionary";
import DictionaryService from "../features/dictionary/services/DictionaryService";
import DictionaryActionBar from "../features/dictionary/components/DictionaryActionBar";
import DictionaryTable from "../features/dictionary/components/DictionaryTable";

const Dictionaries = () => {

    const [dictList, setDictList] = useState<Dictionary[]>([]);

    useEffect(() => {
        fetchDictionaries();
    }, []);

    async function fetchDictionaries() {
        const response = await DictionaryService.searchDictionaries({});
        console.log(response.data);
        setDictList(response.data);
    }

    const deleteDictionary = async (id:string) => {
        await DictionaryService.deleteDictionary(id);
        fetchDictionaries();
    } 

    return (
        <>
        <Layout>
            <DictionaryActionBar/>
            <DictionaryTable dictList={dictList} remove={deleteDictionary}/>
        </Layout>
        </>
    );

};

export default Dictionaries;
