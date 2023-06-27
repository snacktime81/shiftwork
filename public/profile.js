async function axiosLoggedIn() {
	const response = await axios.get('/profile');
	return response;
}


axiosLoggedIn().then( function(re){
	const user = re.data;
	console.log(user);
	if(user[0]){
		let div = document.querySelector('.containerProfile');
		
		let divClassProfile = document.createElement('div');
		divClassProfile.className = 'profile';
		
		div.appendChild(divClassProfile);
		
		let h2 = document.createElement('h2');
		h2.innerHTML = user[1];
		
		divClassProfile.appendChild(h2);
		
	}
	
})