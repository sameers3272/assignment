import React, { useState, useEffect } from 'react';
import { getFileList, deleteFile } from '../services/fileService';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFileList();
                setFiles(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteFile(id);
            setFiles(files.filter(file => file._id !== id));
            alert('File deleted successfully.');
        } catch (error) {
            console.error(error);
            alert('File deletion failed.');
        }
    };



    return (
        <div>
            <h2>Your Files</h2>
            <table className='table table-striped table-bordered  '>
               <thead className='thead-light'>
               <tr>
                    <td>File Name</td>
                    <td>Code</td>
                    <td>Delete</td>
                    <td>Download</td>
                </tr>
                </thead>
                <tbody>
                {files.map(file => (
                    <tr key={file._id}>
                        <td>{file.filename}</td>
                        <td>{file.uniqueCode}</td>
                        <td><button onClick={() => handleDelete(file._id)}>Delete</button></td>
                        <td> <Link to={`/file/download/${file.filename}`}>Download</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default FileList;