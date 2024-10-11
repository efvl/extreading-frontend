import React, { useEffect } from "react";
import LangForm from "../features/langs/components/LangForm";
import Layout from "../layout/Layout";
import LangService from "../features/langs/services/LangService";
import { useNavigate, useParams } from 'react-router-dom';
import { Language } from '../features/langs/models/Language'

const AddEditLang = () => {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    const createLang = async (newLang:Language) => {
        const response = await LangService.addLanguage(newLang);
        console.log(response.data);
        navigate('/lang');
    }

    const toEditLang = async (lang:Language) => {
        const response = await LangService.editLanguage(lang);
        console.log(response.data);
        navigate('/lang');
    }

    return (
        <>
        <Layout>
            {params.id
                ? <LangForm submitAction={toEditLang} isEdit={true} languageId={params.id} />
                : <LangForm submitAction={createLang} isEdit={false} languageId={null} />
            }
        </Layout>
        </>
    );

};

export default AddEditLang;
