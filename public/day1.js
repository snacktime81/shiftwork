async function axiosDay1() {
	const response = await axios.get('/date/day1');
	return response;
}

axiosDay1().then(function(re){
	
	const times = re.data;
	
	let table = document.createElement('table');
	
	let div = document.querySelector('#day1');
	div.appendChild(table);
	
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
	
	th = document.createElement('th');
	th.innerHTML = '이름';
	
	thead.appendChild(th);
	
	const timeArr = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,1,2,3,4,5,6]
	
	for(i of timeArr){
		th = document.createElement('th');
		th.innerHTML = String(i).padStart(2, "0");
		th.id = i;
		
		thead.appendChild(th);
	}
	
	let tbody = document.createElement('tbody');
	
	table.appendChild(tbody);
	
	
	for(time of times){
		
		const timeArr2 = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
		let start = 7;

		const name = time.User.name;
		const first = 'first';
		const queryId = name.concat('-', first, '-', time.machine);
		
		let tr = document.querySelector(`.${queryId}`);
		console.log(tr);
		

		if(tr){
			for(i of timeArr2){
				const tdId = name.concat('-', String(i));
				let td = tr.querySelector(`.${tdId}`);
				console.log('td', td);
				if( start >= (time.starttime) && (time.endtime) > start){
					td.id = 'color';
				}	
				start++;

				tr.appendChild(td);
			}
			
		}
		else{
		
			let tr = document.createElement('tr');
			tr.className = time.User.name.concat('-', first, '-', time.machine);
			
			tbody.appendChild(tr);
			
			let td = document.createElement('td');
			td.innerHTML = time.day;

			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = time.machine;

			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = time.User.name;

			tr.appendChild(td);

			for(i of timeArr2){
				const tdId = name.concat('-', String(i));
				td = document.createElement('td');
				td.className = tdId;
				if( start >= (time.starttime) && (time.endtime) > start){
					td.id = 'color';
				}	
				start++;

				tr.appendChild(td);
			}

		}

	}
	}
)