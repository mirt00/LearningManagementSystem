const express = require('express')
const multer = require('multer')
const{uploadMediaToCloudinary, deleteMediaFromCloudinary} = require('../../helpers/cloudinary');
const e = require('express');


const router = express.Router();

const upload= multer({dest: 'upload/'});

router.post('/upload',upload.single('file'), async(req,res)=>{
    try {
        const result = await uploadMediaToCloudinary(req.file.path);
        res.status(200).json({
            success:true,
            data:result,

        });
    } catch (e) {
        console.log(e);
        
        res.status(500).json({
            success: false,
            message: 'Error uploading file'
        })
    }
});

router.delete('/delete/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: 'Asset Is is required' 

            })
        }
        await deleteMediaFromCloudinary(id)
        res.status(200).json({
            success: true,
            message: 'Asset deleted successfully from cloudinay'
        })
        
    } catch (error) {
     console.log(e);
     res.status(500).json({
        success: false,
        message: 'Error deleting file'
    })
    }
});
router.post('/bulk-upload',upload.array('files',10), async(req,res)=>{
    try {
        
        const results = await Promise.all(files.map(file => uploadMediaToCloudinary(file.path)));
        res.status(200).json({
            success: true,
            data: results
        })
    } catch (e) {
        console.log(e);
        
        res.status(500).json({
            success: false,
            message: 'Error uploading files'
        })
    }
});
module.exports= router;

