import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import EditDictionaryPanel from "../features/dictionary/components/EditDictionaryPanel";
import AddDictionaryPanel from "../features/dictionary/components/AddDictionaryPanel";

const AddEditDictionary = () => {

    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    return (
        <>
        <Layout>
        {params.id
                ? <EditDictionaryPanel dictionaryId={String(params.id)} />
                : <AddDictionaryPanel/>
            }
        </Layout>
        </>
    );


};

export default AddEditDictionary;
