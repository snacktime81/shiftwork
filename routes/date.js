const express = require('express');
const User = require('../models/user');
const Time = require('..//models/time');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('');
})

router.get('/day1', async(req, res, next) => {
	try{
		const day = new Date;
		const day1 = new Date(day.getTime() + (2 * 60 * 60 * 1000));
		
		const times = await Time.findAll({
			include: [{
			model: User,
			attributes: ['name'],
			}],
			where: {day: day1},
			order: [['machine', 'ASC']],
		});	


		res.json(times);
	}
	catch(err){
		console.error(err);
	}
	
});

router.get('/day2', async(req, res, next) => {
	try{
		const day1 = new Date;
		const day2 = new Date(day1.getTime() + (26 * 60 * 60 * 1000));
		console.log(day1, day2);

		const times = await Time.findAll({
			include: [{
			model: User,
			attributes: ['name'],
			}],
			where: {day: day2},
			order: [['machine', 'ASC']],
		});	

		res.json(times);
	}
	catch(err){
		console.error(err);
	}
	
});

module.exports = router;
