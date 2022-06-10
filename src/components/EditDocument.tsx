import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Doc } from "../models/Doc";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { logOut } from "../App";


export const EditDocument = () => {

  const [content, setContent] = useState();
  const [title, setTitle] = useState<string>();
  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
    setContent(content)
  };
  const [doc, setDoc] = useState<Doc>();
  const [htmlContent, setHtmlContent] = useState<string>("")
  let params = useParams();

    useEffect(()=>{
        
        axios.get(`http://localhost:3000/document/${params.id}`)
        .then(response =>{
            let docFromApi = response.data[0]
            setDoc(docFromApi);
            setContent(response.data[0].content);
            setTitle(response.data[0].title);
            setHtmlContent(decodeURIComponent(response.data[0].content))  
        })
        
   }, []);

  function save(){
    if(content === undefined){
      throw console.error();
  }
    axios.post(`http://localhost:3000/document/${params.id}`, {title:title ,content:encodeURIComponent(content)})
    .then(response => {
        console.log(response.data);
    })
    
  }

    return (
      <div className="wrap">
        <header>
            <Link className="menuLink" to="/"><a>My documents</a></Link>
            <a className="menuLink" onClick={logOut}>Log Out</a>
        </header> 
         <label>Document name: </label><input className="docName" type="text" placeholder="Document name" value={doc?.title} onChange={e => setTitle(e.target.value)}></input>
         <Editor
        initialValue={htmlContent}
        init={{
          skin: "snow",
          icons: "thin",
          placeholder: "this is a document",

          height: 200,
          menubar: true,
         
          textcolor_rows: "4",
          
          toolbar:
            "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent "
        }}
        onEditorChange={handleEditorChange}
      />
        <button onClick={save}>Save changes</button>  
      </div>
    );
}