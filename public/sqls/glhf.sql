CREATE DATABASE IF NOT EXISTS `GLHF`;
USE `GLHF`;

DROP TABLE IF EXISTS `AccOwnChamp`;
DROP TABLE IF EXISTS `Play`;
DROP TABLE IF EXISTS `AgainstSuggest`;
DROP TABLE IF EXISTS `Against`;
DROP TABLE IF EXISTS `Suggest`;
DROP TABLE IF EXISTS `Item`;
DROP TABLE IF EXISTS `Champion`;
DROP TABLE IF EXISTS `LOL`;
DROP TABLE IF EXISTS `Account`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Game`;


CREATE TABLE `User` (
  id INT PRIMARY KEY,
  name CHAR(20)
);

CREATE TABLE `Account` (
  id INT PRIMARY KEY,
  password CHAR(20),
  userID INT,
  CHECK (LENGTH(password) >= 3),
  FOREIGN KEY (userID) REFERENCES User(id)
);

CREATE TABLE `Game` (
  id INT PRIMARY KEY,
  name CHAR(20)
);

CREATE TABLE `LOL` (
  id INT PRIMARY KEY,
  FOREIGN KEY (id) REFERENCES Game(id)
    on UPDATE CASCADE
    on DELETE CASCADE
);

CREATE TABLE `Champion` (
  id INT PRIMARY KEY,
  name CHAR(20),
  title CHAR(40),
  lane CHAR(20),
  type CHAR(20),
  stat CHAR(100),
  accID INT,
  gameID INT,
  FOREIGN KEY (accID) REFERENCES Account(id),
  FOREIGN KEY (gameID) REFERENCES LOL(id)
);

CREATE TABLE `Item` (
  id INT PRIMARY KEY,
  name CHAR(40),
  stat CHAR(255),
  extraInfo CHAR(255),
  gameID INT,
  FOREIGN KEY (gameID) REFERENCES LOL(id)
);


CREATE TABLE `Suggest` (
  champID INT,
  itemID INT,
  PRIMARY KEY (champID, itemID),
  FOREIGN KEY (champID) REFERENCES Champion(id),
  FOREIGN KEY (itemID) REFERENCES Item(id)
);

CREATE TABLE `Against` (
  champ0ID INT,
  champ1ID INT,
  Strategy TEXT,
  PRIMARY KEY (champ0ID, champ1ID),
  FOREIGN KEY (champ0ID) REFERENCES Champion(id),
  FOREIGN KEY (champ1ID) REFERENCES Champion(id)
);

CREATE TABLE `AgainstSuggest` (
  champ0ID INT,
  champ1ID INT,
  itemID INT,
  PRIMARY KEY (champ0ID, champ1ID, itemID),
  FOREIGN KEY (champ0ID) REFERENCES Champion(id),
  FOREIGN KEY (champ1ID) REFERENCES Champion(id),
  FOREIGN KEY (itemID) REFERENCES Item(id)
);

CREATE TABLE `Play` (
  accID INT,
  gameID INT,
  PRIMARY KEY (accID, gameID),
  FOREIGN KEY (accID) REFERENCES Account(id),
  FOREIGN KEY (gameID) REFERENCES Game(id)
);

CREATE TABLE `AccOwnChamp` (
  accID INT,
  champID INT,
  PRIMARY KEY (accID, champID),
  FOREIGN KEY (accID) REFERENCES Account(id)
    on DELETE CASCADE,
  FOREIGN KEY (champID) REFERENCES Champion(id)
);


INSERT INTO `Game` VALUES (1, 'League of Legends');

INSERT INTO `LOL` VALUES (1);

