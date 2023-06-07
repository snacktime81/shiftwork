const express = require('express');

const router = express.Router();
const {isLoggedIn, isNotLoggedIn, isLoggedAdmin} = require('./middlewares');
const {Time, User} = require('../models');




router.get('/', async(req, res, next) => {
	try{
		
		const times = await Time.findAll({
			  include: [{
				model: User,
				attributes: ['name'],
			  }],
			  order: [['starttime', 'ASC']],
			});

		res.render('main', {times})
		

			
		
	}
	catch(err){
		console.error(err);
	}
});



router.get('/join', isNotLoggedIn, (req, res, next) => {
	res.render('join', {title: 'join'});
});

//https://okky.kr/questions/704616


module.exports = router;
