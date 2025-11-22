package main

import (
	"log"
	"net/http"
)

func main() {
	// Serve from current directory (repo root)
	fs := http.FileServer(http.Dir("."))

	http.Handle("/", fs)

	addr := ":8089"
	log.Printf("Local dev server on http://localhost%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
