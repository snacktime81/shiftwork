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
			  order: [['machine', 'ASC'], ['starttime', 'ASC']],
			});
		
		const date = new Date();
		const nowMonth = date.getMonth();
		const nowDay = date.getDate();
		
		const deleteTime = async(id) => {
  			await Time.destroy({where: {id: id}}); 
}
		for(i of times){
			const month = i.day.substring(5, 7) + 1;
			const day = i.day.substring(8,10);
			//console.log( day, month);
			//console.log('now', nowDay, nowMonth);
			if(month < nowMonth){
				deleteTime(i.id);
			}
			else if(day < nowDay){
				deleteTime(i.id);
			}
		}
		
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
