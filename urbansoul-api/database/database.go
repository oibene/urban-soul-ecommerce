package database

import (
	"log"
	"os"

	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq" // postgres
)

func ConnectSupabase() *sqlx.DB {

	db, err := sqlx.Connect("postgres", os.Getenv("SUPABASESTR"))

	if err != nil {
		log.Println("Erro ao conectar banco!", err)
		return nil
	}

	return db
}
