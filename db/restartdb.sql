DROP DATABASE IF EXISTS recommend;
CREATE DATABASE recommend;

\c recommend

CREATE TABLE product_category (
	prodcatid VARCHAR(30) PRIMARY KEY,
 	name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE consumer (
ConsumerID VARCHAR(30),
 	name VARCHAR(30) NOT NULL,
 	password VARCHAR(30) NOT NULL,
 	email VARCHAR(30) UNIQUE NOT NULL,
 	points INT DEFAULT 0,
 	PRIMARY KEY (ConsumerID)
);

INSERT INTO product_category (prodcatid, name) VALUES 
    ('CAT1', 'fashion'),
    ('CAT2', 'utensils'),
    ('CAT3', 'personalCare'),
    ('CAT4', 'homeGoods'),
    ('CAT5', 'recreation'),
    ('CAT6', 'reusable'),
    ('CAT7', 'recycled'),
    ('CAT8', 'organic');
    
INSERT INTO consumer (consumerid, name, password, email, points) VALUES
	('CID1', 'James Rhodes', 'WARMACHINEROX', 'warmachine@defense.gov', 1979),
	('CID2', 'Thor Odinson', 'strongestavenger', 'godofthunder@wethegods.com', 1962),
	('CID3', 'Groot', 'iamgroot', 'iamgroot@iamgroot.com', 1960),
	('CID4', 'Jean Grey', 'logan>>>cyclops', 'phoenix@x-men.com', 1963),
	('CID5', 'Laura Kinney', 'adamantiumfootclaws', 'x-23@avengersacademy.edu', 2004);
    

