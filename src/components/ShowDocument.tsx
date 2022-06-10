import axios from "axios";
import { useEffect, useState } from "react";
import {Doc} from "../models/Doc"
import { Link, useParams } from "react-router-dom";
import  parse  from "html-react-parser";
import { logOut } from "../App";


export const ShowDocument = () => {
    const [doc, setDoc] = useState<Doc>();
    const [htmlContent, setHtmlContent] = useState<string>("")
    let params = useParams();

    useEffect(()=>{
        
        axios.get(`http://localhost:3000/document/${params.id}`)
        .then(response =>{
            let docFromApi = response.data[0]
            setDoc(docFromApi)
            console.log(response.data[0].content);
            setHtmlContent(decodeURIComponent(response.data[0].content))  
        })
        
   }, []);
    
   let editRoute = `/edit/${params.id}`

   function deleteDoc() {
        axios.delete(`http://localhost:3000/document/${params.id}`)
        .then(response =>{
            console.log(response);
            window.location.replace("/")
        })
   }
    
   return <div className="wrap">
       <header>
            <Link className="menuLink" to="/"><a>My documents</a></Link>
            <a className="menuLink" onClick={logOut}>Log Out</a>
        </header> 
       <h3>Title: {doc?.title}</h3>
       <div className="document" dangerouslySetInnerHTML={{ __html: htmlContent }} />
       <Link to={editRoute}><button>Edit document</button></Link>
       <button className="deleteBtn" onClick={deleteDoc}>Delete document</button>
   </div>

}