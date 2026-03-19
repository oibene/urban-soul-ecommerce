package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"urbanAPI/repositories"
)

func ListProducts(w http.ResponseWriter, r *http.Request) {

	p, err := repositories.QueryListProducts()
	if err != nil {
		log.Println("Erro ao listar produtos!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func GetProductByID(w http.ResponseWriter, r *http.Request) {
	productIdSTR := r.URL.Query().Get("product_id")

	productId, err := strconv.Atoi(productIdSTR)
	if err != nil {
		log.Println("Id Invalida!")
		return
	}

	p, err := repositories.QueryGetProductById(productId)
	if err != nil {
		log.Println("Erro ao consultar produto!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func ListCategories(w http.ResponseWriter, r *http.Request) {
	c, err := repositories.QueryListCategories()
	if err != nil {
		log.Println("Erro ao listar categorias`!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(c)
}

func GetDetailsByProductId(w http.ResponseWriter, r *http.Request) {
	productIdSTR := r.URL.Query().Get("product_id")

	productId, err := strconv.Atoi(productIdSTR)
	if err != nil {
		log.Println("Id Invalida!")
		return
	}

	p, err := repositories.QueryGetDetailsByProductId(productId)
	if err != nil {
		log.Println("Erro ao consultar categoria!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func GetProductsByOrderId(w http.ResponseWriter, r *http.Request) {
	ordersIdSTR := r.URL.Query().Get("orders_id")

	ordersId, err := strconv.Atoi(ordersIdSTR)
	if err != nil {
		log.Println("Id Invalida!")
		return
	}

	o, err := repositories.QueryGetProductsByOrderId(ordersId)
	if err != nil {
		log.Println("Erro ao consultar lista de produtos!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(o)
}

func GetImagesbyProductID(w http.ResponseWriter, r *http.Request) {
	productIdSTR := r.URL.Query().Get("product_id")

	productId, err := strconv.Atoi(productIdSTR)
	if err != nil {
		log.Println("Id Invalida!")
		return
	}

	i, err := repositories.QueryGetImagesByProductId(productId)

	if err != nil {
		log.Println("Erro ao consultar images!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(i)
}
