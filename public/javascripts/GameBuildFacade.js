// class GameBuildFacade {
    // constructor() {
    //     console.log("Get Started here.");
    // }
module.exports = {

    // TODO: register new account stored in Database
    register: function(userID, name, accountID, password) {
        return Promise.reject(null);
    },

    // TODO: user Login, check account and password in Database
    login: function(id, password) {
        return Promise.reject(null);
    },

    // TODO: saved the table "account plays games"
    selectGame: function(accountID, gameID) {
        return Promise.reject(null);
    },

    // TODO: users own champion
    ownChampion: function(accountID, gameID, ChampionID) {
        return Promise.reject(null);
    },

    // TODO: show owned champions
    showOwnChampions: function(accountID, gameID) {
        return Promise.reject(null);
    },

    // TODO: add games
    addGame: function(id, name) {
        return Promise.reject(null);
    },

    // TODO: add Champion to Database via api
    addChampionApi: function(gameID) {
        return Promise.reject(null);
    },

    // TODO: add Champion to Database by hand
    addChampion: function(id, name, stat, position, type, gameID) {
        return Promise.reject(null);
    },

    // TODO: remove Champion from Database by id
    removeChampion: function(id, gameID) {
        return Promise.reject(null);
    },

    // TODO: show info of a Champion
    showChampionInfo: function(id, gameID) {
        return Promise.reject(null);
    },

    // TODO: add Item to Database via api
    addItemApi: function(gameID) {
        return Promise.reject(null);
    },

    // TODO: add Item to Database by hand
    addItem: function(id, name, stat, info, gameID) {
        return Promise.reject(null);
    },

    // TODO: remove Item from Database by id
    removeItem: function(id, gameID) {
        return Promise.reject(null);
    },

    // TODO: show info of an Item
    showItemInfo: function(id, gameID) {
        return Promise.reject(null);
    },

    // TODO: update all Champions in Database via api
    updateChampions: function(url, gameID) {
        return Promise.reject(null);
    },

    // TODO: update all Items in Database via api
    updateItems: function(url, gameID) {
        return Promise.reject(null);
    },

    // TODO: retrieve suggested items based on one champion
    suggestCI: function(championID) {
        return Promise.reject(null);
    },

    // TODO: retrieve strategy and suggested items based on two champions
    suggestAgainst: function(championA, championB) {
        return Promise.reject(null);
    },

    // TODO: show all users from Database
    allUsers: function() {
        return Promise.reject(null);
    }
};

