// 
	// * INSTEAD of modifying file starting @ offset, 
	// * just overwrite the whole thing:
	// *** Copy <head> to <body> into string
	// *** overwrite file w/:
	// ***         copy_of_header string + content + closing_tags string
	// *** closing_tags can be </body> + </html>
	//
package main

import (
	"net/http"
	"fmt"
	"html/template"
	"os"
	// "bufio"
)

// HTML content funcs:
func get_about_content() string {
	// Make about content? Giant string?
	about_content := "    <h1> About Tiddies </h1>\n"

	// return
	return about_content
}

// // Create template from parsed index.html:
// var tpl = template.Must(template.ParseFiles("index.html"))

func indexHandler(respWriter http.ResponseWriter, req *http.Request){
	// Create template from parsed index.html:
	var tpl = template.Must(template.ParseFiles("index.html"))
	tpl.Execute(respWriter, nil)
}

func aboutHandler(respWriter http.ResponseWriter, req *http.Request){
	head := `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trash Puppy | Home</title>
    <link rel="stylesheet" href="stylesheet.css" />
  </head>
`

	body_open := "  <body>\n"
	body_close := "  </body>\n"
	closing_tags := `</html>`

	// get the new content for index.html:
	about_html := get_about_content()

	index_file, err := os.OpenFile("index.html", os.O_RDWR, 0666) // filemode == linux perms??
	if err != nil {
		fmt.Printf("ERROR: line 67 :)")
		return
	}

	index_file.Truncate(0)

	// Write new content to file:
	_, err = index_file.WriteString(head + body_open + about_html + body_close + closing_tags)
	if err != nil {
		fmt.Printf("ERROR: line 76 :)")
		return
	}

	// Close file:
	index_file.Close()

	// Serve new index.html
	// Create template from parsed index.html:
	var tpl = template.Must(template.ParseFiles("index.html"))
	tpl.Execute(respWriter, nil)
}


func main(){
	fmt.Println("Main has started...")
	// Create server struct:
	Server := struct {
		address string
		port string
	}{
		address: "127.0.0.1",
		port: "8080",
	}

	// Create the server/ multiplexer
	HTTPMux := http.NewServeMux()

	// File handling:
	// ** Handle assets:
	fs := http.FileServer(http.Dir("assets"))
	HTTPMux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// ** Tell the server which function to call to handle request to the root/index path
	HTTPMux.HandleFunc("/", indexHandler)
	HTTPMux.HandleFunc("/about", aboutHandler)

	
	// Have server listen at address:port
	http.ListenAndServe(Server.address + ":" + Server.port, HTTPMux)
	
	fmt.Printf("The server is running at %s:%s\n", Server.address, Server.port)
}

// Resource Links:
// ** https://www.digitalocean.com/community/tutorials/how-to-make-an-http-server-in-go#multiplexing-request-handlers
// ** https://pkg.go.dev/net/http#ListenAndServe