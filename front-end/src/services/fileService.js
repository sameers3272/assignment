import axios from 'axios';

const API_URL = 'http://localhost:4000/api/files/';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const user = JSON.parse(localStorage.getItem('user'));

    return axios.post(API_URL + 'upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`
        }
    });
};

export const getFileList = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + 'list', {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    });
};

export const deleteFile = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.delete(API_URL + id, {
        headers: {
            'Authorization':`Bearer ${user.token}`
        }
    });
};

export const downloadFile = (code) => {
    return axios.get(API_URL + `download/${code}`, { responseType: 'blob' });
};