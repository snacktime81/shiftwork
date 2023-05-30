exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticatd()){
		next();
	}
	else{
		res.status(403).send('로그인 필요');
	}
};


exports.isNotLoggedIn = (req, res, next) => {
	if(!req.isAuthenticatd()){
		next();
	}
	else{
		const message = encodeURIComponent('로그인한 상태입니다.');
		res.redirect(`/?error=${message}`);
	}
};


exports.isLoggedAdmin = (req, res, next) => {
	if(req.isAuthenticatd()){
		if(req.user.authority === 'Admin'){
			next();
		}
		else{
			res.status(403).send('권한이 없습니다.');
		}
	}
	else{
		res.status(403).send('로그인 필요');
	}
};
