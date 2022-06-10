import axios from "axios";
import { useEffect, useState } from "react";
import {Doc} from "../models/Doc"
import { Link } from "react-router-dom";
import './style.css'
import { logOut } from "../App";


export const Documents = () => {
    const [docs, setDocs] = useState<Doc[]>([]);

    useEffect(()=>{

        axios.get("http://localhost:3000/document")
        .then(response =>{
            console.log(response.data);
            let docsFromApi = response.data.map((doc:Doc) =>{
                return new Doc(doc.id, doc.user_id, doc.title, doc.content)
            })
            setDocs(docsFromApi)  
        })
   }, []);
        
    let docsList = docs.map((doc) =>{
        let docLink = `/${doc.id}`
        return (
            <ul>
                <li><h4>{doc.title}</h4></li>
                <Link to={docLink} className="link">
                    <button>View document</button>
                </Link>
            </ul>)
    })

    
    return <div className="wrap">
        <header>
            <Link className="menuLink" to="/create"><a>Create new</a></Link>
            <a className="menuLink" onClick={logOut}>Log Out</a>
        </header>
        <h3>My saved documents: </h3>
        {docsList}
        </div>

}