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
  stat CHAR(100),
  extra_info CHAR(255),
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
  Strategy CHAR(255),
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
  FOREIGN KEY (accID) REFERENCES Account(id),
  FOREIGN KEY (champID) REFERENCES Champion(id)
);


INSERT INTO `Game` VALUES (1, 'League of Legends');

INSERT INTO `LOL` VALUES (1);

INSERT INTO `Champion` VALUES (51, 'Caitlyn', 'the Sheriff of Piltover', 'adc', 'Marksman', 'difficulty: 6, attack: 8, defense: 2, magic: 2', null, 1);
INSERT INTO `Champion` VALUES (86, 'Garen', 'The Might of Demacia', 'top, sup', 'Fighter, Tank', 'difficulty: 5,attack: 7, defense: 7, magic: 1', null, 1);
INSERT INTO `Champion` VALUES (13, 'Ryze', 'the Rune Mage', 'mid, top', 'Mage, Fighter', 'difficulty: 7, attack: 2, defense: 2, magic: 10', null, 1);
INSERT INTO `Champion` VALUES (53, 'Blitzcrank', 'the Great Steam Golem', 'support', 'Tank, Fighter', 'difficulty: 4, attack: 4, defense: 8, magic: 5', null, 1);
INSERT INTO `Champion` VALUES (22, 'Ashe', 'the Frost Archer', 'adc', 'Marksman', 'difficulty: 4, attack: 7, defense: 3, magic: 2', null, 1);
INSERT INTO `Champion` VALUES (122, 'Darius', 'the Hand of Noxus', 'top', 'Fighter, Tank', 'difficulty: 2, attack: 9, defense: 5, magic: 1', null, 1);
INSERT INTO `Champion` VALUES (69, 'Cassiopeia', "the Serpent's Embrace", 'mid', 'Mage', 'difficulty: 10, attack: 3, defense: 2, magic: 9', null, 1);
INSERT INTO `Champion` VALUES (89, 'Leona', 'the Radiant Dawn', 'support', 'Tank, Support', 'difficulty: 4, attack: 4, defense: 8, magic: 3', null, 1);

INSERT INTO `Item` VALUES (3006, "Berserker's Greaves", '+35% Attack Speed, +45 Movement Speed', 'Enhances Movement Speed and Attack Speed', 1);
INSERT INTO `Item` VALUES (3072, "The Bloodthirster", '+80 Attack Damage, +20% Life Steal', "Your basic attacks can now overheal you. Excess life is stored as a shield that can block 50-350 damage, based on champion level.<br><br>This shield decays slowly if you haven't dealt or taken damage in the last 25 seconds.", 1);
INSERT INTO `Item` VALUES (3087, "Statikk Shiv", '+35% Attack Speed, +30% Critical Strike, +5% Movement Speed', 'Your Energized attacks deal 60~140 bonus magic damage (based on level) to up to 5 targets on hit. This effect can critically strike.', 1);
INSERT INTO `Item` VALUES (3031, "Infinity Edge", '+80 Attack Damage, Doubles your critical strike chance.', '15% of critical strike damage dealt to champions is converted to True Damage.', 1);
INSERT INTO `Item` VALUES (3036, "Lord Dominik's Regards", '+40 Attack Damage, +35% Armor Penetration', 'Overcomes enemies with high health and armor', 1);
INSERT INTO `Item` VALUES (3094, "Rapid Firecannon", '+30% Attack Speed, +30% Critical Strike Chance, +5% Movement Speed', 'Your Energized attacks gain 35% bonus Range (+150 range maximum) and deal 60~140 bonus magic damage (based on level) on hit.', 1);
INSERT INTO `Item` VALUES (3085, "Runaan's Hurricane", '+40% Attack Speed, 30% Critical Strike Chance, +7% Movement Speed', 'When basic attacking, bolts are fired at up to 2 enemies near the target, each dealing (40% of Attack Damage) physical damage. Bolts can critically strike and apply on hit effects.', 1);
INSERT INTO `Item` VALUES (3095, "Stormrazor", '+70 Attack Damage, +30% Attack Speed, ', "If you haven't attacked in the last 3 seconds, your next basic attack critically strikes for 160% (+1% per 1.5% critical strike chance, max 200%) damage and grants 10% movement speed for 1.75 seconds.", 1);

INSERT INTO `Suggest` VALUES (51, 3006);
INSERT INTO `Suggest` VALUES (51, 3072);
INSERT INTO `Suggest` VALUES (51, 3087);
INSERT INTO `Suggest` VALUES (51, 3031);
INSERT INTO `Suggest` VALUES (51, 3036);
INSERT INTO `Suggest` VALUES (51, 3094);

INSERT INTO `Against` VALUES (51, 22, "Keep behind allied minions if Caitlyn is harassing you with Piltover Peacemaker (it deals less damage with each subsequent target). You can intercept Ace in the Hole's missile from hitting an ally if you stand in its path.");

INSERT INTO `AgainstSuggest` VALUES (51, 22, 3006);
INSERT INTO `AgainstSuggest` VALUES (51, 22, 3085);
INSERT INTO `AgainstSuggest` VALUES (51, 22, 3087);
INSERT INTO `AgainstSuggest` VALUES (51, 22, 3031);
INSERT INTO `AgainstSuggest` VALUES (51, 22, 3095);
INSERT INTO `AgainstSuggest` VALUES (51, 22, 3072);

INSERT INTO `User` VALUES (0, 'Billy');
INSERT INTO `User` VALUES (1, 'Gary');
INSERT INTO `User` VALUES (2, 'Beyond');


