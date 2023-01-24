const URL = 'https://WebsiteStatistics.petrolldc.repl.co'

var info = `{
		"referrer": "${document.referrer}",
		"lang": "${navigator.language}",
		"screen": "${screen.width}x${screen.height}",
		"time": "${Intl.DateTimeFormat().resolvedOptions().timeZone}",
		"admin": "${localStorage.getItem("admin")}"}`
var request = new XMLHttpRequest();
request.withCredentials = true;
request.open("GET", `${URL}/api/index`, true);
request.send(info);


document.getElementById("emailbtn").addEventListener("onlick", Click("email"))
document.getElementById("githubbtn").addEventListener("onlick", Click("github"))
document.getElementById("twitterbtn").addEventListener("onlick", Click("twitter"))

function Click(param) {
	let request = new XMLHttpRequest();
	request.withCredentials = true;
	request.open("GET", `${URL}/api/clicks?social=${param}`, true);
	request.send();


} 