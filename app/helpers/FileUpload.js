const path = require("path")
const {response} = require("express");

const file_upload = async (files, location, fileKey) => {
    let image_name = null
    if(files && Object.keys(files).length > 0){
        const image = files[fileKey]
        const image_extension = path.extname(image.name)
        image_name = location + Date.now() + image_extension
        const upload_path = "public/" + image_name
        console.log("image name form file upload", image_name)
        return await image.mv(`${upload_path}`).then((result) => {
            return image_name
        }).catch((error) => {
            return ''
        })
    }
}

module.exports = file_upload