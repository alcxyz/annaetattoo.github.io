package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
<<<<<<< Updated upstream
	// Define the port the server will run on.
	port := "8089"

	// Create a file server handler that serves files from the current directory (".").
	fs := http.FileServer(http.Dir("."))

	// Register the file server handler for all requests.
	http.Handle("/", fs)

	// Print a message to the console indicating the server is starting.
	fmt.Println("Starting local development server...")
	fmt.Printf("Access your site at http://localhost:%s\n", port)
	fmt.Println("Press Ctrl+C to stop the server.")

	// Start the HTTP server.
	// log.Fatal will print any error and exit if the server fails to start.
	log.Fatal(http.ListenAndServe(":"+port, nil))
=======
	// Serve from current directory (repo root)
	fs := http.FileServer(http.Dir("."))

	http.Handle("/", fs)

	addr := ":8089"
	log.Printf("Local dev server on http://localhost%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
>>>>>>> Stashed changes
}
