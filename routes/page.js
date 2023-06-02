const express = require('express');

const router = express.Router();
const {isNotLoggedIn, isLoggedAdmin} = require('../routes/middlewares');

router.get('/', (req, res, next) => {
	res.render('main', {title: 'time'});
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
	res.render('join', {title: 'join'});
});


module.exports = router;
