package database

import (
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // postgres
)

var DB * sqlx.DB

func Connect() *sqlx.DB {

	db, err := sqlx.Connect("postgres", os.Getenv("DB_URL"))
	if err != nil {
		log.Println("Erro ao conectar banco!", err)
		return nil
	}

	DB = db
	return db
}