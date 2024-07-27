import {  useParams } from "react-router-dom";
import { useState } from "react";
import { downloadFile } from "../services/fileService";

const Download = () => {
    const { name } = useParams();
 
    const [code, setCode] = useState("");
const handleDowload =async(e)=>{
    e.preventDefault();
    try {
        const res = await downloadFile(code);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            name
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error(error);
        alert('File Download failed.');
    }
      
}
   
    return (
        <form onSubmit={handleDowload}>
            Enter The 6 Character Code
            <input type="text" onChange={e => setCode(e.target.value)} />
            <button type="submit"  disabled={code.length !== 6}>Download</button>
        </form>
    )
}

export default Download;