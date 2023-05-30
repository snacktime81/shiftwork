const express = require('express');

const router = express.Router();
//const {isLoggedAdmin} = require('../middlewares');

router.get('/', (req, res, next) => {
	res.render('main', {title: 'time'});
});



module.exports = router;
