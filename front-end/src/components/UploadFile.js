import React, { useState } from 'react';
import { uploadFile } from '../services/fileService';
import { useNavigate } from 'react-router-dom';

function UploadFile() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await uploadFile(file);
            alert(`File uploaded! Your code: ${response.data.code}`);
            navigate("/files")
            
        } catch (error) {
            console.error(error);
            alert('File upload failed.');
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadFile;