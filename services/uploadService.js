const mime = require("mime-types");

exports.uploadNewImage = async (file, fileName, folderName) => {
    try {
        let ext = mime.extension(file.mimetype);
        let pathSend = `/public/${folderName}/${fileName}.${ext}`
        let path = `.${pathSend}`
        await file.mv(
            path,
            (err) => {
                if (err) {
                    console.error(err);
                    return false
                }
            }
        );
        return pathSend;
    } catch (err) {
        return false
    }


}