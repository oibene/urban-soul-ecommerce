package repositories

import (
	"urbansoul-api/constructors"
	"urbansoul-api/db/database"
)

func QueryGetCommentsByProductId(id int) (cm []constructors.Comments, err error) {
	data := database.Connect()

	err = data.Select(&cm, `SELECT cm.comment_id, cm.comment, cm.rating, cm.comment_date, 
								ct.customer_id, ct.name, ct.last_name

							FROM comments cm

							INNER JOIN customers ct on cm.customer_id = ct.customer_id

							WHERE cm.product_id = $1`, id)
	if err != nil {
		return nil, err
	}

	return cm, nil
}
