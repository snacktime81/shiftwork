const express = require('express');
const User = require('../models/user');
const Time = require('..//models/time');

const router = express.Router();
const {isLoggedAdmin} = require('./middlewares');

router.get('/', isLoggedAdmin, (req, res, next) => {
	res.render('time', {title: 'time'});
});

router.get('/status', (req, res, next) => {
	if(req.user.authority === 'admin'){
		res.json(true);
	}
	else{
		res.json(false);
	}
});

router.post('/make', isLoggedAdmin, async(req, res, next) => {
	try{
		const {machine, day, name, starttime, endtime} = req.body;
		const user = await User.findOne({where:{name}});
		
		const startTime = ((starttime < 7) ? Number(starttime) +24 : starttime);
		const endTime = ((endtime <= 7) ? Number(endtime) + 24 : endtime)
		
		await Time.create({
			machine,
			day,
			starttime: startTime,
			endtime: endTime,
			userId: user.id,
		})
		
		res.redirect('/time');
	}
	catch(err){
		console.error(err);
	}

})

router.delete('/:id', isLoggedAdmin, async(req, res, next) => {
	try{
		const id = req.params.id;
		console.log(id);
		
		await Time.destroy({
			where: {
				id: id}
		})
		
		res.redirect('/time/all');
	}
	catch(err){
		console.error(err);
	}
})

router.get('/all', isLoggedAdmin, async(req, res, next) => {
	try{
		const times = await Time.findAll({
			include: [{
			model: User,
			attributes: ['name'],
			}],
			order: [['day', 'ASC'], ['starttime', 'ASC']],
		});
		res.render('allTime', {times});
	}
	catch(err){
		console.error(err);
	}
})


module.exports = router;
