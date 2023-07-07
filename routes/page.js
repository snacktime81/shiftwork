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
		
		const UTCdate = new Date();
		const date = new Date(UTCdate.getTime() + ( 2 * 60 * 60 * 1000));
		//console.log(date);
		console.log(new Date())
		const nowMonth = date.getMonth()+1;
		const nowDay = date.getDate();
		//console.log(nowMonth, nowDay);
		console.log(new Date(date.getTime() + (2 * 60 * 60 * 1000)));
		const deleteTime = async(id) => {
  			await Time.destroy({where: {id: id}}); 
		}
		for(i of times){
			const month = Number(i.day.substring(5, 7));
			const day = i.day.substring(8,10);
			//console.log('day:',month,'  now:',nowMonth);
			//console.log( day, month);
			//console.log('now', nowDay, nowMonth);
			if(month < nowMonth){ 
				deleteTime(i.id);
			}
			else if(day < nowDay){
				deleteTime(i.id);
			}
		}
		
		res.render('main')
	}
	catch(err){
		console.error(err);
	}
});



router.get('/join', isNotLoggedIn, (req, res, next) => {
	res.render('join', {title: 'join'});
});

router.get('/profile', async(req, res, next) => {
	if(req.isAuthenticated()){
		const user = req.user.name;
		const userId = req.user.id;
		const times = await Time.findAll({
			where: {userId : userId},
			order: [['day', 'ASC'], ['starttime', 'ASC']]
		});
		const arr = [true, user, times];
		//console.log('user' , user, times );
		
		res.json(arr);
	}
	else{
		res.json(false);
	}
})

//https://okky.kr/questions/704616


module.exports = router;
