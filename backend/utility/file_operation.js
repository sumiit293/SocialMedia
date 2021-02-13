const path = require("path");
const AWS = require("aws-sdk");
var fs = require("fs").promises;

//creating new s3 object 
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

function uplaodAsync(params){
    return new Promise((resolve,reject)=>{
        s3.upload(params,(err,photo)=>{
            if(!err)  resolve(photo.Location);
            if(!!err) reject(" Could not upload !");
        });
    })
}

exports.moveFile = async function moveFile(bucketName,source,fileName) {
   try {
       const data =  await fs.readFile(source);
       const params = {
           Bucket: bucketName,
           Key: fileName,
           Body: data,
           ContentType:'image/jpeg',
           ACL: 'public-read'
       }
      const imgUrl = await uplaodAsync(params);
      return imgUrl;
   } catch (error) {
       return false
   }
}


function deleteAsync(param){
    return new Promise((resolve,reject)=>{
        s3.deleteObject(param,(err,data)=>{
            if(!err) resolve(" Delete succesfully")
            else reject("Something went wrong colud not delete successfully !")
        })
    })
}

exports.removeFile = async function removeFile(bucketName,object) {
    const key = object.toString().split("/")
    var params = {  Bucket: bucketName, Key:  key[key.length - 1]};
    try {
        return await deleteAsync(params);
    } catch (error) {
        console.log(error);
    }
 
}

exports.fileFilter = function filterFile(file) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.name));
    // Check mime
    const mimetype = filetypes.test(file.type);

    if (extname && mimetype) {
        if (file.size > 10000000) {
            return {
                value: false,
                msg: " File must be less than 10 mb in size !"
            }
        } else {
            return {
                value: true,
                msg: "All okay "
            }
        }
    } else {
        return {
            value: false,
            msg: "Only image file is supported !"
        }
    }
}



