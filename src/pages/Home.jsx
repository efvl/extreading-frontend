import React, {useEffect, useState} from "react";
import LangService from "../services/LangService";

const Home = () => {

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

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">ShortName</th>
                    <th scope="col">FullName</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        langs.map((lang, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{lang.id}</td>
                                <td>{lang.shortName}</td>
                                <td>{lang.fullName}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    );

};

export default Home;