const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const auth = require('../middleware/auth');
const fs =require("fs");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', [auth, upload.single('file')], async (req, res) => {
    try {
        const file = new File({
            filename: req.file.originalname,
            path: req.file.path,
            userId: req.user._id
        });
        await file.save();
        res.send({ message: 'File uploaded successfully.', code: file.uniqueCode });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/list', auth, async (req, res) => {
    try {
        const files = await File.find({ userId: req.user._id });
        res.send(files);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        
        const file = await File.findOne({ _id: req.params.id, userId: req.user._id });
        if (!file) return res.status(404).send('File not found.');
        
        fs.unlinkSync(file.path);
        await File.deleteOne({_id:file._id})
        res.send('File deleted successfully.');
    } catch (error) {
        res.status(400).send(error);
    }
});



router.get('/download/:code', async (req, res) => {
    try {
        const file = await File.findOne({ uniqueCode: req.params.code });
        if (!file) return res.status(404).send('File not found.');
        res.download(file.path, file.filename);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;