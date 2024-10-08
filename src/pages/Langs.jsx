import React, {useEffect, useState} from "react";
import LangActionBar from "../features/langs/components/LangActionBar";
import LangTable from "../features/langs/components/LangTable";
import LangService from "../features/langs/services/LangService";
import Layout from "../layout/Layout";

const Langs = () => {

    const [langs, setLangs] = useState([]);

    useEffect(() => {
        fetchLanguages();
    }, []);

    async function fetchLanguages() {
        const searchData = {
            "ids": [ 0 ],
            "shortName": "string",
            "fullName": "string"
          };
        const response = await LangService.searchLanguages(searchData);
        console.log(response.data);
        setLangs(response.data);
    }

    const deleteLanguage = async (id) => {
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