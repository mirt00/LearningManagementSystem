 const cloudinary = require('cloudinary').v2

 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 const uploadMedaiaToCloudinary = async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(FilePath,{
            resource_type: 'auto'
        })
        return result;
    } catch (error) {
        console.log(error)
        throw new Error('Error uploading to clodinary')
    }
 };

 const deleteMediaFromClodinary= async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete asset from clodinary");
        
    }
 };
 module.exports = {uploadMedaiaToCloudinary,deleteMediaFromClodinary}