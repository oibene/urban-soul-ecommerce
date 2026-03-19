package constructors

type Comments struct {
	Comment_id         int    `db:"comment_id" json:",omitempty"`
	Customer_id        int    `db:"customer_id" json:",omitempty"`
	Customer_name      string `db:"name" json:",omitempty"`
	Customer_last_name string `db:"last_name" json:",omitempty"`
	Comment            string `db:"comment" json:",omitempty"`
	Rating             int    `db:"rating" json:",omitempty"`
	Comment_date       string `db:"comment_date" json:",omitempty"`
}
