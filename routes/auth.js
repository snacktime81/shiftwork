const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');



const router = express.Router();

router.get('/status', (req, res, next) => {
	if(req.isAuthenticated()){
		res.json(true);
	}
	else{
		res.json(false);
	}
})


router.post('/join', isNotLoggedIn, async(req, res, next) => {
	const { name, email, password, authority } = req.body;
	try{
		console.log(name, email, password, authority);
		const exUser = await User.findOne({ where: { email } });
		if(exUser){
			console.log(exUser);
			return res.redirect('/join?error=exist');
		}
		const hash = await bcrypt.hash(password, 12);
		console.log('실행');
		await User.create({
			email,
			name,
			password: hash,
			authority,
		});
		return res.redirect('/');
	}
	catch (err) {
		console.error(err);
		return next(err);
	}
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
	res.render('login');
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if(authError){
			console.error(authError);
			return next(authError);
		}
		if( !user ) {
			return res.redirect(`/?loginError=${info.message}`);
		}
		return req.login(user, (loginError) => {
			if(loginError){
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect('/');
		})
	})(req, res, next);
})


router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logOut(err => {
    if (err) {
      return next(err);
    } else {
      console.log('로그아웃됨.');
      res.redirect('/');
    }
  });
});






module.exports = router;
