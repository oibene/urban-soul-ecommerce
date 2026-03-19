CREATE TABLE urbansouldb.customers (
	customer_id BIGINT NOT NULL,
	name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(255),
	img_url VARCHAR(50),

	PRIMARY KEY (customer_id)
);

CREATE TABLE urbansouldb.details (
	model_code SERIAL NOT NULL,
	description VARCHAR(255),
	notes VARCHAR(25name5),
	composition VARCHAR(255),

	PRIMARY KEY (model_code)
);

CREATE TABLE urbansouldb.categories (
	category_code SERIAL NOT NULL,
	description VARCHAR(50),

	PRIMARY KEY (category_code)
);

CREATE TABLE urbansouldb.products (
	product_id SERIAL NOT NULL,
	product_name VARCHAR(255),
	category_code INTEGER REFERENCES categories (category_code),
	gender VARCHAR(2),
	size VARCHAR(2),
	color VARCHAR(50),
	model_code INTEGER REFERENCES details (model_code),
	price DECIMAL(8,2),
	descount_price DECIMAL(8,2),

	PRIMARY KEY (product_id)
);

CREATE TABLE urbansouldb.images (
	product_id INTEGER REFERENCES products (product_id),
	img_URL VARCHAR(50)
);

CREATE TABLE urbansouldb.comments (
	comment_id SERIAL NOT NULL,
	customer_id INTEGER  REFERENCES customers (customer_id),
	product_id INTEGER  REFERENCES products (product_id),
	comment VARCHAR(255),
	rating INTEGER,
	comment_date TIMESTAMP,

	PRIMARY KEY (comment_id)
);

CREATE TABLE urbansouldb.orders(
	order_id SERIAL NOT NULL,
	email VARCHAR(50),
	postal_code VARCHAR(50),
	address VARCHAR(255),
	address_number VARCHAR(5),
	complement VARCHAR(50),
	district VARCHAR(50),
	city VARCHAR(50),
	state VARCHAR(50),

	order_items_id INTEGER,
	total_value DECIMAL(8,2),
	freight_company VARCHAR(50),
	order_date TIMESTAMP,

	PRIMARY KEY (order_id)
);

CREATE TABLE urbansouldb.order_items(
	order_items_id SERIAL NOT NULL,
	product_id INTEGER REFERENCES products (product_id)
);