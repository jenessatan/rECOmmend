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


CREATE TABLE business (
	BusinessID VARCHAR(30),
	name VARCHAR(30),
	password VARCHAR(30) NOT NULL,
	email VARCHAR(30) UNIQUE NOT NULL,
	Description TEXT,
	url VARCHAR(30),
	PRIMARY KEY (BusinessID)
);

CREATE TABLE city_info(
postalCode VARCHAR(7) PRIMARY KEY,
city VARCHAR(30)
);

CREATE TABLE businessLocation(
	phoneNumber VARCHAR(12) PRIMARY KEY,
	BusinessID VARCHAR(30),
	streetAddr VARCHAR(30),
	postalCode VARCHAR(7),
	FOREIGN KEY (postalCode) references city_info(postalcode)
ON DELETE RESTRICT
);

CREATE TABLE products(
	ProductID VARCHAR(30) PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	price REAL,
	Description TEXT,
	imageLink TEXT UNIQUE NOT NULL
);

CREATE TABLE has_prodcat(
	ProdCatID VARCHAR(30),
	ProductID VARCHAR(30),
	PRIMARY KEY (ProdCatID, ProductID),
	FOREIGN KEY (ProdCatID) references product_category (ProdCatID) ON DELETE CASCADE,
	FOREIGN KEY (ProductID) references products(ProductID) ON DELETE CASCADE
);

CREATE TABLE sells(
	ProductID VARCHAR(30),
	BusinessID VARCHAR(30),
	PRIMARY KEY (ProductID, BusinessID),
	FOREIGN KEY (ProductID) references products
ON DELETE CASCADE,
	FOREIGN KEY (BusinessID) references business
		ON DELETE CASCADE
);

CREATE TABLE offers_reward(
	rewardName VARCHAR(50),
	pointValue INTEGER NOT NULL,
	BusinessID VARCHAR(30),
	PRIMARY KEY(rewardName, BusinessID),
	FOREIGN KEY (BusinessID) references business
		ON DELETE CASCADE
);

CREATE TABLE certification(
	CertID VARCHAR(30) PRIMARY KEY,
	description TEXT,
	logoLink TEXT UNIQUE NOT NULL,
	certName VARCHAR(50) NOT NULL,
	certifyingBody VARCHAR(50) NOT NULL
);

CREATE TABLE has_cert(
	BusinessID VARCHAR(30),
	CertID VARCHAR(30),
	PRIMARY KEY (BusinessID, CertID),
	FOREIGN KEY (BusinessID) REFERENCES business (BusinessID)
		ON DELETE CASCADE,
	FOREIGN KEY (CertID) REFERENCES certification (CertID)
		ON DELETE CASCADE
);

CREATE TABLE consumer_activity(
	ConsumerID VARCHAR(30),
	title TEXT,
	date DATE,
	PRIMARY KEY (ConsumerID, title),
	FOREIGN KEY (ConsumerID) REFERENCES consumer (ConsumerID)
		ON DELETE CASCADE
);

CREATE TABLE post_info(
	PostID VARCHAR(30),
	title TEXT NOT NULL,
	content TEXT NOT NULL,
	ConsumerID VARCHAR(30),
	Points_earned INT,
	PRIMARY KEY (PostID),
	FOREIGN KEY (ConsumerID, title) REFERENCES consumer_activity (ConsumerID, title)
		ON DELETE CASCADE
);

CREATE TABLE redeems_reward(
	rewardName VARCHAR(50),
	BusinessID VARCHAR(30),
	date DATE NOT NULL,
	ConsumerID VARCHAR(30),
	PRIMARY KEY (rewardName, BusinessID, ConsumerID, date),
	FOREIGN KEY (rewardName, BusinessID) REFERENCES offers_reward (rewardName, BusinessID)
		ON DELETE CASCADE,
	FOREIGN KEY (ConsumerID) REFERENCES consumer (ConsumerID)
		ON DELETE CASCADE
);

CREATE TABLE survey (
	SurveyID VARCHAR(30) PRIMARY KEY,
	surveyLink TEXT,
	points_earned INT
);

CREATE TABLE takes_survey(
	SurveyID VARCHAR(30),
	ConsumerID VARCHAR(30),
	PRIMARY KEY (SurveyID, ConsumerID),
	FOREIGN KEY (SurveyID) REFERENCES survey (SurveyID)
		ON DELETE CASCADE,
	FOREIGN KEY (ConsumerID) REFERENCES consumer (ConsumerID)
		ON DELETE CASCADE
);

CREATE TABLE review (
	ReviewID VARCHAR(30) PRIMARY KEY,
	title TEXT,
	content TEXT,
	BusinessID VARCHAR(30),
	FOREIGN KEY (BusinessID) references business (BusinessID)
ON DELETE SET NULL
);

CREATE TABLE writes_review_on (
	ReviewID VARCHAR(30),
	points_earned INT NOT NULL,
	ConsumerID VARCHAR(30),
	date DATE NOT NULL,
	PRIMARY KEY (ReviewID, ConsumerID),
	FOREIGN KEY (ReviewID) REFERENCES review (ReviewID)
		ON DELETE CASCADE,
	FOREIGN KEY (ConsumerID) REFERENCES consumer (ConsumerID)
		ON DELETE CASCADE
);

CREATE TABLE receipt(
	ReceiptID VARCHAR(30) PRIMARY KEY,
	points_earned INT NOT NULL,
	money_spent REAL NOT NULL,
	ConsumerID VARCHAR(30),
	FOREIGN KEY (ConsumerID) REFERENCES Consumer(ConsumerID)
	ON DELETE CASCADE
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

INSERT INTO products (productid, name, description, imagelink, price) VALUES
	('PRODID1', 'Titanium Straw', 'Reusable metal straw that won''t kill the turtles', 'www/assets/products/prodid1.jpg', 10),
	('PRODID2', 'Mini Arc Reactor', 'Power your home with the power of Iron Man', 'www/assets/products/prodid2.jpg',3000),
	('PRODID3', 'tentree Tank', 'Sustainable tank top that plants 10 trees', 'www/assets/products/prodid3.jpg', 65),
	('PRODID4', 'Bamboo Straw', 'Young bamboo chopped short to fit in your cup. Suck responsibly', 'www/assets/products/prodid4.jpg', 7),
	('PRODID5', 'KarTent Home', 'Cardboard tent for the hippie musical festival scene', 'www/assets/products/prodid5.jpg', 150),
	('PRODID6', 'Bee''s Wrap', 'The natural alternative to plastic wrap for food storage', 'www/assets/products/prodid6.jpg', 30),
	('PRODID7', 'Silicone Sandwich Bag', 'Resealable silicone bag for storage of foods', 'www/assets/products/prodid7.jpg', 21),
	('PRODID8', 'Bambooee', 'Machine washable paper towel replacement', 'www/assets/products/prodid8.jpg', 40),
	('PRODID9', 'Pilot B2P Retractable Pen', 'World''s first pens made from recycled plastic bottles', 'www/assets/products/prodid9.jpg', 10);

INSERT INTO has_prodcat (prodcatid, productid) VALUES
	('CAT2', 'PRODID1'),
	('CAT6', 'PRODID1'),
	('CAT4', 'PRODID2'),
	('CAT1', 'PRODID3'),
	('CAT2', 'PRODID4'),
	('CAT6', 'PRODID4'),
	('CAT5', 'PRODID5'),
	('CAT1', 'PRODID4'),
	('CAT8', 'PRODID6'),
	('CAT6', 'PRODID6'),
	('CAT4', 'PRODID6'),
	('CAT8', 'PRODID7'),
	('CAT6', 'PRODID7'),
	('CAT4', 'PRODID7'),
	('CAT8', 'PRODID8'),
	('CAT6', 'PRODID8'),
	('CAT4', 'PRODID8'),
	('CAT7', 'PRODID9');


INSERT INTO consumer (consumerid, name, password, email, points) VALUES
	('CID1', 'James Rhodes', 'WARMACHINEROX', 'warmachine@defense.gov', 1979),
	('CID2', 'Thor Odinson', 'strongestavenger', 'godofthunder@wethegods.com', 1962),
	('CID3', 'Groot', 'iamgroot', 'iamgroot@iamgroot.com', 1960),
	('CID4', 'Jean Grey', 'logan>>>cyclops', 'phoenix@x-men.com', 1963),
	('CID5', 'Laura Kinney', 'adamantiumfootclaws', 'x-23@avengersacademy.edu', 2004);

INSERT INTO business VALUES
	('BID1', 'Patagonia', 'planetearth', 'biz@patagonia.com', 'We are in business to save our home planet.', 'patagonia.com'),
	('BID2', 'LifeGoods', 'beg00d', 'contact@lifegoods.com', 'Make life good', 'lifegoods.com'),
	('BID3', 'Shellstrop Inc', 'yabasic', 'hi@shellstrop.com', 'Pobody''s nerfect', 'shellstrop.com'),
	('BID4', 'Aloha Straw Company', 'ohana', 'aloha@alohastraw.com', 'Stop sucking so badly.', 'alohastraw.com'),
	('BID5', 'Stark Industries', 'stark3000', 'ironman@starkindustries.com', 'I am Iron Man', 'starkindustries.com');

INSERT INTO sells (ProductID, BusinessID) VALUES
	('PRODID1', 'BID4'),
	('PRODID2', 'BID5'),
		('PRODID2', 'BID2'),
	('PRODID3', 'BID3'),
	('PRODID4', 'BID4'),
	('PRODID5', 'BID2'),
	('PRODID6', 'BID2'),
	('PRODID7', 'BID2'),
	('PRODID8', 'BID2'),
	('PRODID9', 'BID2');

INSERT INTO city_info (PostalCode, City) VALUES
	('V6J 1M5', 'Vancouver'),
	('V5J 1M5', 'Vancouver'),
	('V5N 1V6', 'Vancouver'),
	('98119', 'Seattle'),
	('96793', 'Wailuku'),
	('10166', 'New York');

INSERT INTO businesslocation (businessid, streetaddr, postalcode, phonenumber) VALUES
	('BID1', '1994 W 4th Avenue', 'V6J 1M5', '604-732-8670'),
	('BID2', '1450 E Broadway', 'V5N 1V6', '604-879-6005'),
	('BID3', '628 Eleanor St', '98119', '206-104-1982'),
	('BID4', '1161 Lower Main Street', '96793', '808-877-7850'),
	('BID5', '200 Park Avenue', '10166', '718-476-6626');

INSERT INTO offers_reward VALUES
	('10% coupon', 3000, 'BID1'),
	('Free priority shipping', 1000, 'BID1'),
	('Free priority shipping', 1000, 'BID3'),
	('$5 off next order of $20 or more', 500, 'BID5'),
	('$5 off next order of $20 or more', 500, 'BID4'),
	('$10 off next order of $50 or more', 1000, 'BID2'),
	('Free reusable tote bag', 500, 'BID2'),
	('Free reusable water bottle', 1000, 'BID2'),
	('$25 gift card', 2000, 'BID2'),
	('Free gift basket', 1000, 'BID2'),
	('Free set of reusable straws', 1000, 'BID2');

INSERT INTO certification (certid, description, logolink, certname, certifyingbody) VALUES
	('CERTID1', 'The Fair Trade Certified seal represents thousands of products, improving millions of lives, protecting land and waterways in 45 countries and counting. Purchases have sent $551 million to farmers and workers since 1998.', 'https://www.fairtradecertified.org/themes/fairtheme/source/images/ftc-full-seal-rgb.svg', 'Fair Trade Certified', 'Fair Trade USA');
INSERT INTO certification (certid, description, logolink, certname, certifyingbody) VALUES
('CERTID2',  'Certified organizations need to undertake carbon accounting, management and compensation', 'https://www.ecocertcanada.com/sites/www.ecocertcanada.com/themes/ecocert_ca/images/logo_ecocert_en.gif', 'Climate Commitment Certification', 'Ecocert Canada'),
('CERTID3',  'The Global Organic Textile Standard (GOTS) is recognised as the world''s leading processing standard for textiles made from organic fibres. It defines high-level environmental criteria along the entire organic textiles supply chain and requires compliance with social criteria as well.', 'https://cdn.shopify.com/s/files/1/2243/1211/files/gots_large.jpg?v=1519081859', 'Global Organic Textile Standard', 'Global Organic Textile Standard'),
('CERTID4',  'Certified B Corporations are businesses that meet the highest standards of verified social and environmental performance, public transparency, and legal accountability to balance profit and purpose. B Corps are accelerating a global culture shift to redefine success in business and build a more inclusive and sustainable economy.', 'https://bcorporation.net/sites/all/themes/bcorp/assets/images/logo--white--certified-b-corporation.png', 'Certified B-Corp', 'B LAB'),
('CERTID5', 'Today''s successful businesses are progressively working towards taking on a greater role of environmental responsibility with the adoption of a ''green'' business model. Many are inspired to do so by increasingly popular customer interest in environmentally-friendly practices and products, and particularly the resulting support and loyalty that they show companies and businesses that are ''green''. Businesses are also reaping in added benefits, which include reduced operational costs and the intrinsic value added within an organization by adopting a vast array of green business practices.', 'http://www.gbcertified.ca/images/green-business-logo.png', 'Certified Green Business',  'Institute for Green Business Certification');

INSERT INTO has_cert VALUES
	('BID1', 'CERTID1'),
	('BID1', 'CERTID2'),
	('BID1', 'CERTID3'),
	('BID1', 'CERTID4'),
	('BID1', 'CERTID5'),
	('BID2', 'CERTID5'),
	('BID2', 'CERTID2'),
	('BID2', 'CERTID3'),
	('BID2', 'CERTID1'),
	('BID2', 'CERTID4'),
	('BID3', 'CERTID3'),
	('BID4', 'CERTID4'),
	('BID5', 'CERTID2');

INSERT INTO consumer_activity VALUES
	('CID1', 'Being emission free for one year', '2016-04-18'),
	('CID4', 'What''s up with vegan leather?', '2019-03-22'),
	('CID3', 'I am Groot', '2018-08-08'),
	('CID2', 'Beginners Guide to Zero Waste Living', '2019-04-25'),
	('CID5', 'Eco-Friendly Gifts for Father''s Day', '2017-06-18');

INSERT INTO post_info (PostID, consumerID, title, content, points_earned) VALUES
	('P1', 'CID1', 'Being emission free for one year', 'MY LEGS', 150),
	('P2', 'CID4', 'What''s up with vegan leather?', 'Vegan leather is often touted as an ethical, cruelty-free alternative and comes accordingly with a premium price tag. Take away the marketing buzzwords, though, and it''s all just plastic. Plastic that will not decompose.', 150),
	('P3', 'CID3', 'I am Groot', 'I am Groot. I am Groot. I am Groot', 150),
	('P4', 'CID2', 'Beginners Guide to Zero Waste Living', 'Drink straight from the keg', 150),
	('P5', 'CID5', 'Eco-Friendly Gifts for Father''s Day', 'Avenge his death', 150);

INSERT into redeems_reward (rewardname, businessid, date, consumerid) VALUES
	('10% coupon', 'BID1', '2017-04-19', 'CID3'),
	('$5 off next order of $20 or more', 'BID5', '2019-03-22', 'CID2'),
	('10% coupon', 'BID1', '2017-04-19', 'CID2'),
	('Free priority shipping', 'BID3', '2019-05-01', 'CID2'),
	('Free priority shipping', 'BID3',  '2019-06-01', 'CID2'),
	('$10 off next order of $50 or more', 'BID2', '2019-04-01', 'CID3'),
	('Free reusable tote bag', 'BID2', '2018-05-10','CID1'),
	('Free reusable tote bag', 'BID2', '2018-06-12','CID4'),
	('Free reusable tote bag', 'BID2', '2019-01-02','CID5'),
	('Free reusable water bottle', 'BID2', '2018-12-11', 'CID2'),
	('Free reusable water bottle', 'BID2', '2018-11-11', 'CID1'),
	('Free reusable water bottle', 'BID2', '2018-10-11', 'CID2'),
	('Free reusable water bottle', 'BID2', '2018-11-11', 'CID5'),
	('Free reusable water bottle', 'BID2', '2018-12-11', 'CID4'),
	('Free reusable water bottle', 'BID2', '2018-09-11', 'CID3'),
	('$25 gift card', 'BID2', '2019-05-06', 'CID1'),
	('$25 gift card', 'BID2', '2019-06-06', 'CID3'),
	('$25 gift card', 'BID2', '2019-04-22', 'CID5');

INSERT INTO survey VALUES
	('SID1', 'https://bit.ly/2wmAX0B', 25),
	('SID2', 'https://bit.ly/2wmAX0B', 25),
	('SID3', 'https://bit.ly/2wmAX0B', 25),
	('SID4', 'https://bit.ly/2wmAX0B', 25),
	('SID5', 'https://bit.ly/2wmAX0B', 25);

INSERT INTO takes_survey VALUES
	('SID1','CID5'),
	('SID2','CID5'),
	('SID3','CID1'),
	('SID4','CID2'),
	('SID5','CID1');

INSERT INTO review VALUES
	('ReviewID1', 'Patagonia''s the emerald in a trough of green-washing', 'I''ve always been a huge fan of Patagonia and it''s not just because fo their products---which are always excellent. They are truly thoughtful about their social and environmentally responsible. This stands out in a sea of greenwashing companies all founting the ''eco/green'' marketing outfit du jour. They are fair-trade certified which means i can enjoy my gear without guilt. They are transparent and mindful about their supply chains and use LEED certification where possible.', 'BID1'),
	('ReviewID2',  'So cute! And so ecofriendly!', 'I LURRRRVE this super cute tank that like, totally accentuates my figure, like in all the right ways! I''ve received, like, COUNTLESS compliments. I''m SOOOO flattered. And guess what, I''m planting trees too, without damaging my latest manicure, just by purchasing this.', 'BID3'),
	('ReviewID3', 'Survival, the green way', 'So this review is for the Mini Arc Reactor. Not gonna lie---I''m a huge fan of the Iron Man and so that endorsement was naturally why I bought this in the first place. It''s easy to use, compact and discreet so it goes well colour your room is painted in. It toally makes me feel so much more comfortable that if a disaster happens, I''d have this cute reactor to back me up and keep my house running the way it totally should. So the manual says that if I hook this up right, I might even be able to ''harness the power of the sun''. Ooh lala, gotta check this out and will update this review later. Love you all xoxoxo', 'BID5'),
	('ReviewID4', 'I can now consume my bubble tea without feeling guilty', 'I recently purchased two straws from Aloha Straws, the Bamboo Straw and the Titanium Straw. Both tout emotionally calming benefits, such as relieving the user of the guilt of killing turtles and such. I primarily purhcased these items to indulge in my passion for bubble tea without having to feel guilty. I reached out to Aloha straws and their wonderful, helpful staff, who assured me that they too, feell me, suggested that I try these products. Shipping time was speedy and the cost was pretty reasonable. The Titanium Straw comes in a metal, colour, in a metallic finish and can collapse into a shorter, compact two-inch cylinder that fits nicely into your jean pocket when you just need to dash out for a bubble tea run. It also comes with a cleaning brush. The bamboo straw comes in a lighter, greenish/beige colour and while it cannot collapse, is more bendy. Both worked well for my bubble tea trial and their cost is similar so I guess the the diligent consumer need only consider thier colour and compactibility preferences in choosing which to buy. One downside to the bamboo straw---it comes packaged with a manual that details the murderous process of cutting down plants in the prime of their life. If you are able to discrimiante against non-animate beings this should be no problem, but if you are one of those weepy, spiritual folks, definitely pick the titanium one', 'BID4'),
	('ReviewID5', 'Rude staff. Won''t visit again', 'I went to the Stark Industries outlet last Saturday, just by Boundary. They sure do have good discounts there, on last season''s products but it''s really not worth it. Staff were rude, there wasn''t enough parking, location was out of the way for me and I couldn''t find anything that I liked at MY pricepoint. Even the other shoppers there were really annoying. Stay home, people, and just order online. You deal less with disappointment, you don''t have to socialize and you can offset the guilt of using gas to the deliveryman. Peace', 'BID5');

INSERT INTO writes_review_on VALUES
	('ReviewID1', 20, 'CID5', '2019-05-03'),
	('ReviewID2', 20, 'CID1', '2019-05-08'),
	('ReviewID3', 20, 'CID1', '2019-05-08'),
	('ReviewID4', 20, 'CID4', '2019-05-27'),
	('ReviewID5', 20, 'CID2', '2016-06-03');

INSERT INTO receipt (receiptid, points_earned, money_spent, consumerid) VALUES
	('RECID1', 50, 25, 'CID3'),
	('RECID2', 50, 150, 'CID1'),
	('RECID3', 50, 15, 'CID2'),
	('RECID4', 50, 75, 'CID2'),
	('RECID5', 50, 20, 'CID5');
