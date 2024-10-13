import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import EditBookPanel from "../features/book/components/EditBookPanel";
import AddBookPanel from "../features/book/components/AddBookPanel";

const AddEditBook = () => {

    const params = useParams();

    useEffect(() => {
        console.log(params.id);
    }, []);

    return (
        <>
        <Layout>
        {params.id
                ? <EditBookPanel bookId={String(params.id)} />
                : <AddBookPanel/>
            }
        </Layout>
        </>
    );


};

export default AddEditBook;
