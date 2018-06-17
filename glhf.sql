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
  stat CHAR(255),
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
  FOREIGN KEY (accID) REFERENCES Account(id)
    on DELETE CASCADE,
  FOREIGN KEY (champID) REFERENCES Champion(id)
);


INSERT INTO `Game` VALUES (1, 'League of Legends');

INSERT INTO `LOL` VALUES (1);

INSERT INTO `Champion` VALUES (13, 'Ryze', 'the Rune Mage', 'mid top', 'Mage Fighter', 'difficulty: 7, attack: 2, defense: 2, magic: 10', null, 1);
INSERT INTO `Champion` VALUES (22, 'Ashe', 'the Frost Archer', 'adc', 'Marksman', 'difficulty: 4, attack: 7, defense: 3, magic: 2', null, 1);
INSERT INTO `Champion` VALUES (40, 'Janna', "the Storm's Fury", 'support', 'Support Mage', 'difficulty: 7, attack: 3, defense: 5, magic: 7', null, 1);
INSERT INTO `Champion` VALUES (42, 'Corki', 'the Daring Bombardier', 'mid', 'Marksman', 'difficulty: 6, attack: 8, defense: 3, magic: 6', null, 1);
INSERT INTO `Champion` VALUES (51, 'Caitlyn', 'the Sheriff of Piltover', 'adc', 'Marksman', 'difficulty: 6, attack: 8, defense: 2, magic: 2', null, 1);
INSERT INTO `Champion` VALUES (53, 'Blitzcrank', 'the Great Steam Golem', 'support', 'Tank Fighter', 'difficulty: 4, attack: 4, defense: 8, magic: 5', null, 1);
INSERT INTO `Champion` VALUES (60, 'Elise', 'the Spider Queen', 'jungle', 'Mage Fighter', 'difficulty: 9, attack: 6, defense: 5, magic: 7', null, 1);
INSERT INTO `Champion` VALUES (69, 'Cassiopeia', "the Serpent's Embrace", 'mid', 'Mage', 'difficulty: 10, attack: 3, defense: 2, magic: 9', null, 1);
INSERT INTO `Champion` VALUES (86, 'Garen', 'The Might of Demacia', 'top sup', 'Fighter Tank', 'difficulty: 5,attack: 7, defense: 7, magic: 1', null, 1);
INSERT INTO `Champion` VALUES (89, 'Leona', 'the Radiant Dawn', 'support', 'Tank Support', 'difficulty: 4, attack: 4, defense: 8, magic: 3', null, 1);
INSERT INTO `Champion` VALUES (122, 'Darius', 'the Hand of Noxus', 'top', 'Fighter Tank', 'difficulty: 2, attack: 9, defense: 5, magic: 1', null, 1);
INSERT INTO `Champion` VALUES (133, 'Quinn', "Demacia's Wings", 'top adc', 'Marksman Fighter', 'difficulty: 5, attack: 9, defense: 4, magic: 2', null, 1);
INSERT INTO `Champion` VALUES (154, 'Zac', 'the Secret Weapon', 'jungle', 'Fighter Tank', 'difficulty: 8, attack: 3, defense: 7, magic: 7', null, 1);
INSERT INTO `Champion` VALUES (164, 'Camille', 'the Steel Shadow', 'top', 'Fighter Tank', 'difficulty: 4, attack: 8, defense: 6, magic: 3', null, 1);
INSERT INTO `Champion` VALUES (222, 'Jinx', 'the Loose Cannon', 'adc', 'Marksman', 'difficulty: 6, attack: 9, defense: 2, magic: 4', null, 1);



INSERT INTO `Item` VALUES (3006, "Berserker's Greaves", '+35% Attack Speed, +45 Movement Speed', 'Enhances Movement Speed and Attack Speed', 1);
INSERT INTO `Item` VALUES (3072, "The Bloodthirster", '+80 Attack Damage, +20% Life Steal', "Your basic attacks can now overheal you. Excess life is stored as a shield that can block 50-350 damage, based on champion level.<br><br>This shield decays slowly if you haven't dealt or taken damage in the last 25 seconds.", 1);
INSERT INTO `Item` VALUES (3087, "Statikk Shiv", '+35% Attack Speed, +30% Critical Strike, +5% Movement Speed', 'UNIQUE Passive - Shiv Lightning: Your Energized attacks deal 60~140 bonus magic damage (based on level) to up to 5 targets on hit, this effect can critically strike', 1);
INSERT INTO `Item` VALUES (3031, "Infinity Edge", '+80 Attack Damage, Doubles your critical strike chance.', '15% of critical strike damage dealt to champions is converted to True Damage.', 1);
INSERT INTO `Item` VALUES (3036, "Lord Dominik's Regards", '+40 Attack Damage, +35% Armor Penetration', 'Overcomes enemies with high health and armor', 1);
INSERT INTO `Item` VALUES (3094, "Rapid Firecannon", '+30% Attack Speed, +30% Critical Strike Chance, +5% Movement Speed', 'Your Energized attacks gain 35% bonus Range (+150 range maximum) and deal 60~140 bonus magic damage (based on level) on hit.', 1);
INSERT INTO `Item` VALUES (3085, "Runaan's Hurricane", '+40% Attack Speed, 30% Critical Strike Chance, +7% Movement Speed', 'When basic attacking, bolts are fired at up to 2 enemies near the target, each dealing (40% of Attack Damage) physical damage. Bolts can critically strike and apply on hit effects.', 1);
INSERT INTO `Item` VALUES (3095, "Stormrazor", '+70 Attack Damage, +30% Attack Speed', "UNIQUE Passive: If you haven't attacked in the last 3 seconds, your next basic attack critically strikes for 160% (+1% per 1.5% critical strike chance, max 200%) damage and grants 10% movement speed for 1.75 seconds.", 1);
INSERT INTO `Item` VALUES (3001, "Abyssal Mask", '+350 Health, +300 Mana, +55 Magic Resist, +10% Cooldown Reduction', "UNIQUE Passive - Eternity: 15% of damage taken from champions is gained as Mana. Spending Mana restores 20% of the cost as Health, up to 25 per spell cast. UNIQUE Aura: Nearby enemy champions take 15% more magic damage", 1);
INSERT INTO `Item` VALUES (1038, "B. F. Sword", '+40 Attack Damage', "None", 1);
INSERT INTO `Item` VALUES (2055, "Control Ward", 'Click to Consume: Places a ward that grants vision of the surrounding area., This device will also reveal invisible traps and reveal / disable wards., Control Wards do not disable other Control Wards.', "Can only carry 3 Control Wards in inventory. Limit 1 Control Ward on the map per player", 1);
INSERT INTO `Item` VALUES (3144, "Bilgewater Cutlass", '+25 Attack Damage, +10% Life Steal', "UNIQUE Active: Deals 100 magic damage and slows the target champion's Movement Speed by 25% for 2 seconds (90 second cooldown)", 1);
INSERT INTO `Item` VALUES (1054, "Doran's Shield", '+80 Health, Passive: Restores 6 Health every 5 seconds', "Passive: Basic attacks deal an additional 5 physical damage to minions on hit. UNIQUE Passive: Regain an additional 20 health over 10 seconds after taking damage from an enemy champion", 1);
INSERT INTO `Item` VALUES (3802, "Lost Chapter", '+40 Ability Power, +300 Mana, UNIQUE Passive - Haste: +10% Cooldown Reduction', 'Upon levelling up, restores 20% of your maximum Mana over 3 seconds', 1);
INSERT INTO `Item` VALUES (3158, "Ionian Boots of Lucidity", 'UNIQUE Passive: +10% Cooldown Reduction, UNIQUE Passive - Enhanced Movement: +45 Movement Speed, UNIQUE Passive: Reduces Summoner Spell cooldowns by 10%', "This item is dedicated in honor of Ionia's victory over Noxus in the Rematch for the Southern Provinces on 10 December, 20 CLE", 1);
INSERT INTO `Item` VALUES (1051, "Brawler's Gloves", 'UNIQUE Passive: +10% Critical Strike Chance', 'None', 1);
INSERT INTO `Item` VALUES (1042, "Dagger", '+12% Attack Speed', 'None', 1);
INSERT INTO `Item` VALUES (3086, "Zeal", '+15% Attack Speed, +15% Critical Strike Chance, UNIQUE Passive: +5% Movement Speed', 'None', 1);
INSERT INTO `Item` VALUES (2015, "Kircheis Shard", '+15% Attack Speed, +35% Armor Penetration', 'Passive: Moving and attacking will make an attack Energized. UNIQUE Passive - Energized Strike: Your Energized attacks deal 50 bonus magic damage on hit', 1);


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

INSERT INTO `Account` VALUES (123, "billy", 0);
INSERT INTO `Account` VALUES (1234, "billy", 0);
INSERT INTO `Account` VALUES (12345, "billy", 0);
INSERT INTO `Account` VALUES (12346, "billy", 0);
INSERT INTO `Account` VALUES (356846275, "gary", 1);
INSERT INTO `Account` VALUES (9527, "beyond", 2);

INSERT INTO `AccOwnChamp` VALUES (356846275, 22);
INSERT INTO `AccOwnChamp` VALUES (356846275, 40);
INSERT INTO `AccOwnChamp` VALUES (356846275, 154);
INSERT INTO `AccOwnChamp` VALUES (1234, 22);
INSERT INTO `AccOwnChamp` VALUES (12345, 22);
INSERT INTO `AccOwnChamp` VALUES (12345, 40);

