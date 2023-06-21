const express = require('express');
const User = require('../models/user');
const Time = require('..//models/time');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('');
})

router.get('/day1', async(req, res, next) => {
	try{
		const day1 = new Date;

		console.log(day1);

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

module.exports = router;
