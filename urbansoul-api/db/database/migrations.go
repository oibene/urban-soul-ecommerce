package database

import (
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func RunMigrations() {
	driver, err := postgres.WithInstance(DB.DB, &postgres.Config{})
	if err != nil {
		log.Println("Falha ao criar driver:", err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://db/migrations",
		"postgres",
		driver,
	)
	if err != nil {
		log.Println("Erro ao criar instancia de migração:", err)
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Println("Erro de migração:", err)
	}

	log.Println("Sucesso em migração")
}