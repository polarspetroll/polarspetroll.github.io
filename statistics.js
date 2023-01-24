const URL = 'https://WebsiteStatistics.petrolldc.repl.co'

var info = `{
		"referrer": "${document.referrer}",
		"lang": "${navigator.language}",
		"screen": "${screen.width}x${screen.height}",
		"time": "${Intl.DateTimeFormat().resolvedOptions().timeZone}",
		"admin": "${localStorage.getItem("admin")}"}`
var request = new XMLHttpRequest();
request.withCredentials = true;
request.open("POST", `${URL}/api/index`, true);
request.send(info);

request.withCredentials = true;
document.getElementById("emailbtn").addEventListener("onlick", ()=>{request.open("GET", `${URL}/api/clicks?social=email`, true); request.send()})
document.getElementById("githubbtn").addEventListener("onlick", ()=>{request.open("GET", `${URL}/api/clicks?social=github`, true); request.send()})
document.getElementById("twitterbtn").addEventListener("onlick", ()=>{request.open("GET", `${URL}/api/clicks?social=twitter`, true); request.send()})