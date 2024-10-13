import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import EditWordPanel from "../features/word/components/EditWordPanel";
import AddWordPanel from "../features/word/components/AddWordPanel";


const AddEditWord = () => {

    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    return (
        <>
        <Layout>
        {params.id
                ? <EditWordPanel wordId={String(params.id)} />
                : <AddWordPanel/>
            }
        </Layout>
        </>
    );


};

export default AddEditWord;