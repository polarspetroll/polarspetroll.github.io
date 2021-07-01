var button = document.getElementById("submitbtn");
var emailinput = document.getElementById("emailinput");
var nameinput = document.getElementById("nameinput");
var textinput = document.getElementById("textinput");

button.addEventListener('click', () => {
	var request = new XMLHttpRequest();
	var responsetag = document.getElementById("response");
	request.open('GET', `https://contact.polarspetroll.repl.co/api?name=${nameinput.value}&email=${emailinput.value}&message=${textinput.value}`);
	request.onload = () => {
		if (request.status != 200) {
			responsetag.innerHTML = "Error, Please try again later"
			return
		}
		resp = JSON.parse(request.responseText);

		if (!resp.emailvalid) {
			responsetag.innerHTML = "invalid email address"
			return
		}else if (!resp.namevalid) {
			responsetag.innerHTML = "invalid name"
			return
		}else if (!resp.messagevalid) {
			responsetag.innerHTML = "invalid message"
			return
		}

		responsetag.innerText = resp.response
		emailinput.value = ""
		nameinput.value = ""
		textinput.value = ""
	};
	request.send();
});
