let tg = window.Telegram.WebApp;

tg.expand()

var http = new XMLHttpRequest();
var url = "https://line05w.bk6bba-resources.com/events/list?lang=en&version=0&scopeMarket=1600";
http.open("GET", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.onload = function() {
	let sports = JSON.parse(http.responseText)['sports'];
	sports_clean = '';
    for (var i = sports.length - 1; i >= 0; i--) {
    	let sport = sports[i];
    	if (sport['kind'] == 'segment') {
    		sport_parent_name = sport['name'].split('. ')[0].replace(' ', '_');
    		sports_clean += '<li><input type="checkbox" id="'+sport['id']+'_'+sport['parentId']+'_'+sport_parent_name+'"><a href="#">'+sport['name']+'</a></li>';
    	}
    };
    document.getElementById('segments_list').innerHTML = sports_clean;
}
http.send();

//tg.sendData('data');

function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search_segment');
  filter = input.value.toUpperCase();
  ul = document.getElementById("segments_list");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}