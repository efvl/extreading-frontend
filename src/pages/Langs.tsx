import React, {useEffect, useState} from "react";
import LangActionBar from "../features/langs/components/LangActionBar";
import LangTable from "../features/langs/components/LangTable";
import LangService from "../features/langs/services/LangService";
import Layout from "../layout/Layout";
import { Language } from "../features/langs/models/Language";

const Langs = () => {

    const [langs, setLangs] = useState<Language[]>([]);

    useEffect(() => {
        fetchLanguages();
    }, []);

    async function fetchLanguages() {
        const response = await LangService.searchLanguages({});
        console.log(response.data);
        setLangs(response.data);
    }

    const deleteLanguage = async (id:string) => {
        await LangService.deleteLanguage(id);
        fetchLanguages();
    } 

    return (
        <>
        <Layout>
            <LangActionBar/>
            <LangTable langs={langs} remove={deleteLanguage}/>
        </Layout>
        </>
    );

};

export default Langs;
