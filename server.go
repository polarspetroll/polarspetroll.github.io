package main

import (
	"net/http"
	"os"
	"regexp"
	"time"
	"strings"
	"net/url"
	"encoding/json"
	"fmt"
)

var tgapi = fmt.Sprintf("https://api.telegram.org/bot%v/sendMessage?chatid=%v&text=", os.Getenv("TOKEN"), os.Getenv("CHATID"))

func main() {
	server := &http.Server{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		Addr: ":"+os.Getenv("PORT"),
	}
	http.HandleFunc("/api", APIHandler)
	server.ListenAndServe()
}

func APIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != "POST" {
		http.Error(w, "Method Not Allowed", 405)
		return
	}
	param := r.URL.Query()
	name := param.Get("name")
	email := param.Get("email")
	message := param.Get("message")
	ev, nv, mv := CheckCreds(email, name, message)
	if !ev || !nv || !mv {
		response := map[string]bool{
			"emailvalid":   ev,
			"namevalid":    nv,
			"messagevalid": mv,
		}
		jsonres, _ := json.Marshal(response)
		w.Write([]byte(jsonres))
		return
	}
	sendMessage(name, email, message)
	w.Write([]byte(`{"response": "thanks. i'll respond you back at most in 24 hours"}`))
}

func CheckCreds(email, name, message string) (emailvalid, namevalid, messagevalid bool) {
	pattern := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

	emailvalid = pattern.MatchString(email)

	if strings.ReplaceAll(name, " ", "") == "" || len(name) > 100 {
		namevalid = false
	}

	if strings.ReplaceAll(message, " ", "") == ""  || len(message) > 3000 {
		messagevalid = false
	}
	return emailvalid, namevalid, messagevalid
}


func sendMessage(name, email, message string) {
	text := fmt.Sprintf("name: %s\nemail: %s\nmessage:\n%s", name, email, message)
	text = url.QueryEscape(text)
	http.Get(fmt.Sprintf(tgapi + text))
}