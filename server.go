package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	port := getenv("PORT", "8089")
	root := "."

	fs := http.Dir(root)
	fileServer := http.FileServer(fs)

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Basic dev no-cache
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		// Prevent path traversal
		if strings.Contains(r.URL.Path, "..") {
			http.Error(w, "invalid path", http.StatusBadRequest)
			return
		}

		// Redirect directory paths to trailing slash (so relative URLs work)
		if needsSlashRedirect(fs, r.URL.Path) {
			http.Redirect(w, r, r.URL.Path+"/", http.StatusMovedPermanently)
			return
		}

		fileServer.ServeHTTP(w, r)
	})

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           logReq(handler),
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("Starting local development server on http://localhost:%s\n", port)
	log.Fatal(srv.ListenAndServe())
}

func needsSlashRedirect(fs http.Dir, path string) bool {
	f, err := fs.Open(path)
	if err != nil {
		return false
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil {
		return false
	}
	return info.IsDir() && !strings.HasSuffix(path, "/")
}

func logReq(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func getenv(k, d string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return d
}
