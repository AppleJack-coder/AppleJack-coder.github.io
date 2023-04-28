let tg = window.Telegram.WebApp;

tg.expand()

var http = new XMLHttpRequest();
var url = "https://line05w.bk6bba-resources.com/events/list?lang=ru&version=0&scopeMarket=1600";
http.open("GET", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        document.getElementById('test').innerHtml = JSON.parse(http.responseText['sports']);//the JSON string from server will show here
    }
}
http.send();

//tg.sendData('data');