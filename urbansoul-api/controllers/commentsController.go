package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"urbanAPI/repositories"
)

func GetAllComments(w http.ResponseWriter, r *http.Request) {
	productIdSTR := r.URL.Query().Get("product_id")

	productId, err := strconv.Atoi(productIdSTR)
	if err != nil {
		log.Println("Id Invalida!")
		return
	}

	cm, err := repositories.QueryGetCommentsByProductId(productId)
	if err != nil {
		log.Println("Erro ao consultar comentarios!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cm)
}
