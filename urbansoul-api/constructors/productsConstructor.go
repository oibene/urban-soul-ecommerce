package constructors

type Products struct {
	Product_id     int      `db:"product_id" json:",omitempty"`
	Product_name   string   `db:"product_name" json:",omitempty"`
	Gender         string   `db:"gender" json:",omitempty"`
	Size           string   `db:"size" json:",omitempty"`
	Color          *string  `db:"color" json:",omitempty"`
	Price          float32  `db:"price" json:",omitempty"`
	Descount_price *float32 `db:"descount_price" json:",omitempty"`

	Category *string `db:"category" json:",omitempty"`
	Img_url  *string `db:"img_url" json:",omitempty"`
}

type Categories struct {
	Category_code int    `db:"category_code" json:",omitempty"`
	Description   string `db:"description" json:",omitempty"`
}

type Details struct {
	Description *string `db:"description" json:",omitempty"`
	Notes       *string `db:"notes" json:",omitempty"`
	Composition *string `db:"composition" json:",omitempty"`
}

type Order_Items struct {
	Order_id       int      `db:"order_items_id" json:",omitempty"`
	Product_id     int      `db:"product_id" json:",omitempty"`
	Product_name   string   `db:"product_name" json:",omitempty"`
	Gender         string   `db:"gender" json:",omitempty"`
	Size           string   `db:"size" json:",omitempty"`
	Color          *string  `db:"color" json:",omitempty"`
	Price          float32  `db:"price" json:",omitempty"`
	Descount_price *float32 `db:"descount_price" json:",omitempty"`
}

type Images struct {
	Product_id int    `db:"product_id" json:",omitempty"`
	Img_url    string `db:"img_url" json:",omitempty"`
}
