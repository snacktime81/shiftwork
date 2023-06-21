async function axiosDay1() {
	const response = await axios.get('/date/day1');
	return response;
}

axiosDay1().then(function(re){
	
	
	let table = document.createElement('table');
	
	let thead = document.createElement('thead');
	
	table.appendChild(thead);
	
	let tr = document.createElement('tr');
	
	thead.appendChild(tr);
	
	let th = document.createElement('th');
	th.innerHTML = '날짜';
	
	thead.appendChild(th);
	
	th = document.createElement('th');
	th.innerHTML = '장비';
	
	thead.appendChild(th);
	
	
	
	
	let div = document.querySelector('#day1')
	
	div.appendChild(table);
	
	

})
