exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		next();
	}
	else{
		res.status(403).send('로그인 필요');
	}
};


exports.isNotLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		next();
	}
	else{
		const message = encodeURIComponent('로그인한 상태입니다.');
		res.redirect(`/?error=${message}`);
	}
};


exports.isLoggedAdmin = (req, res, next) => {
	if(req.isAuthenticated()){
		if(req.user.authority === 'admin'){
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
