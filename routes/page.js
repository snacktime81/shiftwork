const express = require('express');

const router = express.Router();
const {isLoggedIn, isNotLoggedIn, isLoggedAdmin} = require('./middlewares');
const {Time, User} = require('../models');


//https://study-ihl.tistory.com/103

router.get('/', async(req, res, next) => {
	try{
		
		const times = await Time.findAll({
			  include: [{
				model: User,
				attributes: ['name'],
			  }],
			  order: [['starttime', 'ASC']],
			});
		
		if(!req.isAuthenticated()){
			res.render('main', {times});
		}
		else{
			res.render('loggedMain', {times});
		}

			
		
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
