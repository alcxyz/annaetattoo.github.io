package main

import (
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"syscall"
)

func main() {
	// Start Tailwind CSS watcher
	tw := exec.Command("npx", "tailwindcss",
		"-i", "src/input.css",
		"-o", "dist/style.css",
		"--watch",
	)
	tw.Stdout = os.Stdout
	tw.Stderr = os.Stderr
	if err := tw.Start(); err != nil {
		log.Fatalf("Failed to start Tailwind watcher: %v\n", err)
	}
	log.Println("Tailwind CSS watcher started")

	// Kill Tailwind on exit
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, syscall.SIGTERM)
		<-c
		tw.Process.Kill()
		os.Exit(0)
	}()

	// Serve from current directory
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	addr := ":8089"
	log.Printf("Dev server running at http://localhost%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
