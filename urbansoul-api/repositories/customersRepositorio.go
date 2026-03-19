package repositories

import (
	"urbansoul-api/constructors"
	"urbansoul-api/db/database"
)

func QueryListCustomers() (ct []constructors.Customers, err error) {
	data := database.Connect()

	err = data.Select(&ct, `SELECT * FROM customers`)

	if err != nil {
		return nil, err
	}

	return ct, nil
}

func QueryGetCustomerById(id int) (ct []constructors.Customers, err error) {
	data := database.Connect()

	err = data.Select(&ct, `SELECT *
							FROM customers 
							WHERE customer_id = $1`, id)

	if err != nil {
		return nil, err
	}

	return ct, nil
}

func QueryCreateNewAccount(accData constructors.Customers) (err error) {
	data := database.Connect()

	_, err = data.NamedExec(`INSERT INTO customers (customer_id, name, last_name, email, password, img_URL)
							VALUES ($1, $2, $3, $4, $5, $6)`, accData)

	if err != nil {
		return nil
	}

	return err
}
