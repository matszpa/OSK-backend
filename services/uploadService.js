const mime = require("mime-types");

    exports.uploadNewImage = async (file, fileName, folderName) => {
        try {
            let ext = mime.extension(file.mimetype);
            let path = `/public/${folderName}/${fileName}.${ext}`
            await file.mv(
                `.${path}`,
                (err) => {
                    if (err) {
                        return false
                    }
                }
            );
            return path;
        } catch (err) {
            return false
        }
    }
