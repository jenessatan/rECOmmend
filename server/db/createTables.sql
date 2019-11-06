CREATE TABLE product_category (
ProdCatID VARCHAR(30) PRIMARY KEY,
 	name VARCHAR(30) UNIQUE NOT NULL,
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
	FOREIGN KEY (ProdCatID) references product_category (ProdCatID)
ON DELETE CASCADE,
	FOREIGN KEY (ProductID) references products(ProductID)
ON DELETE CASCADE
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
