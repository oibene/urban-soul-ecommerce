package constructors

type Customers struct {
	Customer_id int     `db:"customer_id" json:",omitempty"`
	Name        string  `db:"name" json:",omitempty"`
	Last_name   *string `db:"last_name" json:",omitempty"`
	Email       string  `db:"email" json:",omitempty"`
	Password    string  `db:"password" json:",omitempty"`
	Img_URL     *string `db:"img_url" json:",omitempty"`
}
