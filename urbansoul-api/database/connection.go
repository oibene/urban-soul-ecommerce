package database

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // postgres
)

var DB * sqlx.DB

func Connect() *sqlx.DB {

	psqlDB := "postgres://postgres:postgres@db:5432/urbansouldb?sslmode=disable"

	db, err := sqlx.Connect("postgres", psqlDB)
	if err != nil {
		log.Println("Erro ao conectar banco!", err)
		return nil
	}

	DB = db
	return db
}
