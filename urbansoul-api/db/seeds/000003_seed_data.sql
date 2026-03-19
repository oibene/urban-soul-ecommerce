insert into customers (customer_id, name, last_name, email, password, img_URL)
values (251102001,'Icaro', 'O', 'icaro@email.com', '123', '/icaro.png'),
	(251102002,'T', 'Nagata', 'nagata@email.com', '456', '/nagata.png')

insert into details (description, notes, composition)
values ('Camisa Tech Feminina - Leve, respirável e de secagem rápida, com modelagem ajustada que valoriza o corpo e garante conforto em qualquer ocasião.',
		'Características: Tecido tecnológico de alta performance; Secagem rápida e respirabilidade; Leve, elástico e confortável;Modelagem feminina levemente ajustada;Ideal para treinos, viagens e uso diário',
		'70% poliester; 30% algodão')

insert into categories (description)
values ('Jeans'), ('Camisas'), ('Calças'), ('Manga Longa'), ('Moletom')

insert into products (product_name, category_code, gender, size, color, model_code, price, descount_price)
values ('CAMISA TECH FEMININA', 2, 'F', 'GG', 'Preto', 1, 890.50, 712.00),
	('CAMISA TECH FEMININA', 2, 'F', 'G', 'Preto', 1, 890.50, 712.00)

insert into images (product_id, img_url)
values (1, 'blk_tshirt_fem01.png'),
	(1, 'blk_tshirt_fem02.png'),
	(1, 'blk_tshirt_fem03.png'),
	(1, 'blk_tshirt_fem04.png')

insert into comments (customer_id, product_id, comment, rating, comment_date)
values (251102001, 1, 'Muito bom produto bem embalado', 5, '2025-11-15 14:38:00')

insert into orders (email, postal_code, address, address_number, complement, district, city, state, order_items_id, total_value, freight_company, order_date)
values ('icaro@email', '123456-78', 'rua dos bobos', '123', 'CASA', 'Botujuru', 'Campo Limpo Pta', 'SP',1, 1400, 'Sedex2', '2025-10-23 20:56:00')

insert into order_items (order_items_id, product_id)
values (1, 1),
	(1, 2)