import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import { getCurrentUser, logout } from './services/authService';
import Download from './components/Download';
import "./App.css";

function App() {
    const [user, setUser] = useState(getCurrentUser());

    const handleLogout = () => {
        logout();
        setUser(null);
        window.location.replace("/")
    };

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    {user ? (
                        <>
                            <Link to="/upload">Upload File</Link>
                            <Link to="/files">Your Files</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<h1>Welcome to the File Management System</h1>}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/files" element={<FileList />} />
                    <Route path="/file/download/:name" element={< Download/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;