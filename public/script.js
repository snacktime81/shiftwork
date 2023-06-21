async function axiosExample() {
	const response = await axios.get('/auth/status');
	return response;
	}

async function axiosAuthStatus(){
	const authStatus = await axios.get('/time/status');
	return authStatus;
}


axiosExample().then(function(re){

	const status = re.data
	if(status){
		let form = document.createElement('form');
		form.action = 'auth/logout';
		form.method = 'get';
		form.id = 'loginForm';

		let input = document.createElement('input');
		input.type = 'submit';
		input.value = '로그아웃';

		form.appendChild(input);

		let div = document.querySelector('#login_button');
		div.appendChild(form);

		axiosAuthStatus().then(function(reAuth){
			const authStatus = reAuth.data;
			console.log(authStatus);
			if(authStatus){
				form = document.createElement('form');
				form.action = '/time';
				form.method = 'get';
				form.id = 'joinForm';

				input = document.createElement('input');
				input.type = 'submit';
				input.value = '시간생성';

				form.appendChild(input);

				div = document.querySelector('#join_button');
				div.appendChild(form);
			}
		})

	}
	else{
		let form = document.createElement('form');
		form.action = 'auth/login';
		form.method = 'get';
		form.id = 'loginForm';


		let input = document.createElement('input');
		input.type = 'submit';
		input.value = '로그인';

		form.appendChild(input);

		let div = document.querySelector('#login_button');
		div.appendChild(form);


		form = document.createElement('form');
		form.action = '/join';
		form.method = 'get';
		form.id = 'joinForm';

		input = document.createElement('input');
		input.type = 'submit';
		input.value = '회원가입';

		form.appendChild(input);

		div = document.querySelector('#join_button');
		div.appendChild(form);
	}
});
