package main

import (
	"log"
	"os"
	"net/http"
	
	controller "urbansoul-api/controllers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {

	corsOpt := cors.New(
		cors.Options{
			AllowedOrigins: []string{"*"},
			AllowedMethods: []string{
				http.MethodGet,
				http.MethodPost,
				http.MethodPut,
				http.MethodPatch,
				http.MethodDelete,
				http.MethodOptions,
				http.MethodHead,
			},
			AllowedHeaders: []string{"*"},
		},
	)

	r := mux.NewRouter()
	prefix := "/api"

	// CUSTOMER
	r.HandleFunc(prefix+"/customers", controller.GetCustomerByID).Methods("GET")
	r.HandleFunc(prefix+"/customer/account", controller.PostCustomerAccount).Methods("POST")

	// PRODUCT
	r.HandleFunc(prefix+"/products/list", controller.ListProducts).Methods("GET")
	r.HandleFunc(prefix+"/products", controller.GetProductByID).Methods("GET")
	r.HandleFunc(prefix+"/categories", controller.ListCategories).Methods("GET")
	r.HandleFunc(prefix+"/details", controller.GetDetailsByProductId).Methods("GET")
	r.HandleFunc(prefix+"/images", controller.GetImagesbyProductID).Methods("GET")
	r.HandleFunc(prefix+"/orders", controller.GetProductsByOrderId).Methods("GET")

	// COMMENTS
	r.HandleFunc(prefix+"/comments", controller.GetAllComments).Methods("GET")

	http.Handle("/", r)

	port := os.Getenv("API_PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Servidor rodando na porta :", port)
	http.ListenAndServe(":"+port, corsOpt.Handler(r))
}
