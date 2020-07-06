const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');

const controller = require('../controllers/category');

// here is we use the passport for protecting routes
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
// here is we use middleware "upload" with MULTER for upload image 
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete);

module.exports = router;