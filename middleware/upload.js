const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        const date = moment().format("DDMMYYYY-HHmmss_SSS")
        cb(null, `${date}-${file.originalname}`);
    }
})

// CHECKOUT TYPE OF FILE FOR UPLOAD
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// SET UP SIZE FOR FILE
const limits = {
    fileSize: 1024 *1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})