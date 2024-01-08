DROP DATABASE my_store;
CREATE DATABASE IF NOT EXISTS my_store;
USE my_store;



create table user
(id            int   NOT NULL    AUTO_INCREMENT,
email_address  varchar    (60),
first_name     varchar    (25),
last_name      varchar    (25),
created_at     timestamp,
deleted_at     timestamp,
constraint user_id_pk primary key(id));

INSERT INTO user (email_address, first_name, last_name, created_at, deleted_at) 
VALUES ('ando.thiago@gmail.com', 'Thiago', 'Freitas', CURRENT_TIMESTAMP, NULL); 
INSERT INTO user (email_address, first_name, last_name, created_at, deleted_at)
 VALUES ('ando.thiago@gmail.com', 'Marcos', 'Souza', CURRENT_TIMESTAMP, NULL); 

SELECT * FROM user;

ALTER TABLE user DROP COLUMN parent_user_id;

DELETE FROM USER WHERE first_name = 'Marcos';


create table items
(id                           int        (25),
 title                        varchar    (200),
 description                  varchar    (200),
 price                        float      (10,2),
 discountPercentage           float      (5,2),
 rating                       float      (5,2),
 stock                        int        (10),
 brand                        varchar    (20),
 category                     varchar    (20),
 thumbnail                    varchar    (200),
 constraint items_id_pk primary key(id));
 
DROP TABLE items;




create table images 
(item_id   int (10),
 image      varchar(200),
 constraint images_item_id_fk foreign key(item_id)
 references items (id) 
);






DROP TABLE cart;
create table cart
(id             int        (25),
 ipAdress
 user_id        int        (25),
 item_id        int        (25),
 qnt            int        (10),
 bought         int        (1),
 creationAt     timestamp,
 constraint cart_id_pk primary key(id),
 constraint cart_item_id_fk foreign key(item_id)
 references items (id),
 constraint cart_user_id_fk foreign key(user_id)
 references user (id) );


DROP TABLE orders;
create table orders(
invoice_id      int   NOT NULL    AUTO_INCREMENT,
cart_id         int         (25),
user_id         int          (25),
paid_at         timestamp,
total           float        (5,2),
constraint orders_invoice_id_pk primary key(invoice_id),
constraint orders_cart_id_fk foreign key(cart_id )
references cart (id),
constraint orders_user_id_fk foreign key(user_id)
references user (id));



