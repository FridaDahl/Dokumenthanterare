import React, {useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import './style.css'
import { Link } from "react-router-dom";
import { logOut } from "../App";
import axios from "axios";
import { response } from "express";


export const NewDocument = () => {

  const [content, setContent] = useState<string>();
  const [title, setTitle] = useState<string>();
  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);

    setContent(content)
  };

  function save(){
      if(title === undefined){
        console.log("Your document needs a name");
        return
      }
      if(title === ""){
        console.log("Your document needs a name");
        return 
      }
      if(content === undefined){
          throw console.error();
      }
      console.log();
      
    axios.post("http://localhost:3000/document", {user_id:localStorage.getItem("token"),title:title ,content:encodeURIComponent(content)})
    .then(response => {
        console.log(response.data);
        window.location.replace("/");
    })

  }
    return (
      <div className="wrap">
         <header>
            <Link className="menuLink" to="/"><a>My documents</a></Link>
            <a className="menuLink" onClick={logOut}>Log Out</a>
        </header> 
         <label>Document name: </label><input className="docName" autoFocus type="text" placeholder="Document name" onChange={e => setTitle(e.target.value)}></input>
         <Editor
        // initialValue="<p>This is the initial content of the editor</p>"
        init={{
          skin: "snow",
          icons: "thin",
          placeholder: "Start writing here",

          height: 500,
          menubar: true,
         
          textcolor_rows: "4",
          
          toolbar:
            "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent "
        }}
        onEditorChange={handleEditorChange}
      />
        <button onClick={save}>Save document</button>  
      </div>
    );
}
