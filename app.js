let tg = window.Telegram.WebApp;
tg.expand()

function get_segments() {
	var http = new XMLHttpRequest();
	var url = "https://line05w.bk6bba-resources.com/events/list?lang=en&version=0&scopeMarket=1600";
	http.open("GET", url, true);

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onload = function() {
		let sports = JSON.parse(http.responseText)['sports'];
		sports_clean = '';
	    for (var i = sports.length - 1; i >= 0; i--) {
	    	let sport = sports[i];
	    	if (sport['kind'] == 'segment') {
	    		sport_parent_name = sport['name'].split('. ')[0].replace(' ', '+');
	    		sports_clean += `<li><input type="checkbox" class="checkbox" id="${sport['id']}_${sport['parentId']}_${sport_parent_name}"><div class="segment_name"><span>${sport['name']}</span></div><input type="text" class="min_koef"><input type="text" class="min_block"><select><option>live</option><option>line</option><option>live+line</option></select></li>`;
	    	}
	    };
	    document.getElementById('segments_list').innerHTML = sports_clean;
	}
	http.send();
}

function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search_segment');
  filter = input.value.toUpperCase();
  ul = document.getElementById("segments_list");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("span")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function collect_data(action) {
	let selected_checkboxs = document.querySelectorAll('input:checked'); 

	let selected_rows = [];
	selected_rows.push(action);
	for (var i = 0; i < selected_checkboxs.length; i++) {
		let checkbox = selected_checkboxs[i];
		let row_element = checkbox.parentElement;

		let segment_info = row_element.getElementsByClassName('checkbox')[0].id.split('_');

		let segment_id = segment_info[0];
		let sport_id = segment_info[1];
		let sport_name = segment_info[2].replace('+', '_');
		let segment_name = row_element.getElementsByTagName('span')[0].textContent;
		let min_koef = row_element.getElementsByClassName('min_koef')[0].value;
		let min_block = row_element.getElementsByClassName('min_block')[0].value;
		if (!min_koef) {
			min_koef = 0;
		}
		if (!min_block) {
			min_block = 10;
		}
		let select = row_element.getElementsByTagName('select')[0];
		let type = select.options[select.selectedIndex].text;
		selected_rows.push([segment_id, segment_name, sport_id, sport_name, parseFloat(min_koef), parseInt(min_block), type]);
	}
	return JSON.stringify(selected_rows);
}

function send_data(action) {
	data_to_send = collect_data(action);

	tg.sendData(data_to_send);
}

get_segments();