const express = require('express');
const User = require('../models/user');
const Time = require('..//models/time');

const router = express.Router();
//const {isLoggedAdmin} = require('../middlewares');

router.get('/', (req, res, next) => {
	res.render('time', {title: 'time'});
});

router.post('/make', async(req, res, next) => {
	try{
		const {machine, day, name, starttime, endtime} = req.body;
		user = await User.findOne({where:{name}});
		console.log(req.body);
		await Time.create({
			machine,
			day,
			email: user.email,
			starttime,
			endtime,
		})
		
		res.redirect('/time');
	}
	catch(err){
		console.error(err);
	}

})



module.exports = router;
