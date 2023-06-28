async function axiosLoggedIn() {
	const response = await axios.get('/profile');
	return response;
}


axiosLoggedIn().then( function(re){
	const user = re.data;
	//console.log(user);
	if(user[0]){
		let div = document.querySelector('.containerProfile');
		
		let divClassProfile = document.createElement('div');
		divClassProfile.className = 'profile';
		
		div.appendChild(divClassProfile);
		
		let h2 = document.createElement('h2');
		h2.innerHTML = user[1];
		
		divClassProfile.appendChild(h2);

		let table = document.createElement('table');

		divClassProfile.appendChild(table);
		let thead = document.createElement('thead');

		table.appendChild(thead);

		let tr = document.createElement('tr');

		thead.appendChild(tr);

		let th = document.createElement('th');
		th.innerHTML = '날짜';
		th.className = 'smallFont';

		thead.appendChild(th);

		th = document.createElement('th');
		th.innerHTML = '장비';
		th.className = 'smallFont';

		thead.appendChild(th);

		th = document.createElement('th');
		th.innerHTML = '시작 시간';
		th.className = 'smallFont';

		thead.appendChild(th);

		th = document.createElement('th');
		th.innerHTML = '끝 시간';
		th.className = 'smallFont';

		thead.appendChild(th);
		
		for( i of user[2]){
			
			let tbody = document.createElement('tbody');
	
			table.appendChild(tbody);
			
			tr = document.createElement('tr');
			
			tbody.appendChild(tr);
			

			let td = document.createElement('td');
			td.innerHTML = i.day;

			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = i.machine;

			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = i.starttime;

			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = i.endtime;

			tr.appendChild(td);
				
		}
	}
	
})