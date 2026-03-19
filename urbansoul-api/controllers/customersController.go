package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"urbansoul-api/repositories"
)

func GetCustomerByID(w http.ResponseWriter, r *http.Request) {
	// var input models.GetCustomerInput
	// decoder := json.NewDecoder(r.Body)
	// err := decoder.Decode(&input)

	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	json.NewEncoder(w).Encode(err.Error())

	// 	return
	// }

	CustomerIdSTR := r.URL.Query().Get("customer_id")

	CustomerId, err := strconv.Atoi(CustomerIdSTR)
	if err != nil {
		log.Println("Id Invalida!")
		return
	}

	ct, err := repositories.QueryGetCustomerById(CustomerId)
	if err != nil {
		log.Println("Erro ao consultar usuario!", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ct)
}


// emapeia e trata dados, verifica se a conta ja existe se n cria nova.
func PostCustomerAccount(w http.ResponseWriter, r *http.Request) {

	// mapeia dados e trata
	// verifica se ja existe conta com o email
	// cria Id nova -> chama createnew

	log.Println("teste")
}
