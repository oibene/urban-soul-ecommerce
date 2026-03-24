package repositories

import (
	"urbansoul-api/constructors"
	"urbansoul-api/database"
)

func QueryListProducts() (p []constructors.Products, err error) {
	data := database.Connect()

	err = data.Select(&p, `SELECT p.product_id, p.product_name, p.gender, p.size, p.color, p.price, p.descount_price,
							c.description as category, 
							MIN(i.img_url) as img_url
								
							FROM products p 
							
							LEFT JOIN images i
							ON i.product_id = p.product_id
							
							INNER JOIN categories c
							ON c.category_code = p.category_code
							
							GROUP BY p.product_id, c.description`)

	if err != nil {
		return nil, err
	}

	return p, nil
}

func QueryGetProductById(id int) (p []constructors.Products, err error) {
	data := database.Connect()

	err = data.Select(&p, `SELECT p.product_id, p.product_name, p.gender, p.size, p.color, p.price, p.descount_price,
							c.description as category, i.img_url

							FROM products p 

							INNER JOIN categories c
							ON c.category_code = p.category_code

							LEFT JOIN images i
							ON i.product_id = p.product_id
							WHERE p.product_id = $1
							ORDER BY price DESC LIMIT 1`, id)
	if err != nil {
		return nil, err
	}

	return p, nil
}

func QueryListCategories() (c []constructors.Categories, err error) {

	data := database.Connect()

	err = data.Select(&c, `SELECT * FROM categories`)

	if err != nil {
		return nil, err
	}

	return c, nil
}

func QueryGetDetailsByProductId(id int) (d []constructors.Details, err error) {
	data := database.Connect()

	err = data.Select(&d, `SELECT d.description, d.notes, d.composition
							FROM details d

							INNER JOIN products p
							ON p.model_code = d.model_code

							WHERE p.product_id = $1`, id)
	if err != nil {
		return nil, err
	}

	return d, nil
}

func QueryGetProductsByOrderId(id int) (o []constructors.Order_Items, err error) {
	data := database.Connect()

	err = data.Select(&o, `SELECT o.order_items_id,
							p.product_id, p.product_name, p.gender, p.size, p.color, p.price, p.descount_price
							FROM order_items o

							INNER JOIN products p on o.product_id = p.product_id
							WHERE o.order_items_id = $1`, id)
	if err != nil {
		return nil, err
	}

	return o, nil
}

func QueryGetImagesByProductId(id int) (i []constructors.Images, err error) {
	data := database.Connect()

	err = data.Select(&i, `SELECT * FROM images
							WHERE product_id = $1`, id)
	if err != nil {
		return nil, err
	}

	return i, nil
}
