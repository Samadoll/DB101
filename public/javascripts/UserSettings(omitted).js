function addChampion(aChampion) {
    const championInfo = aChampion.split("-");
    const id = championInfo[0];
    const championName = championInfo[1];
    const type = championInfo[2];
    const lowercaseChamp = championName.toLowerCase();
    let newDiv = document.createElement("div");
    newDiv.className = "filterDiv " + type + " show";
    newDiv.id = id;
    newDiv.innerHTML =
        '<a href=' + lowercaseChamp + '.html>\n' +
        '<img class="champimg" alt="' + championName + '" src="../../images/' + lowercaseChamp + '.png">\n' +
        '<p class="champname">' + championName + '</p>\n' +
        '</a>';
    document.getElementById("allChampions").appendChild(newDiv);
}
let current = window.location.href;
let splitUrl = current.split("/");
const userInfo = splitUrl[splitUrl.length - 2];
const champion = splitUrl[splitUrl.length - 1].split("=")[1];
if (champion !== "null") {
    const champions = champion.split("&");
    champions.forEach(addChampion);
} else {
    let newEle = document.createElement("p");
    newEle.innerHTML = "You don't have any champions.";
    document.getElementById("allChampions").appendChild(newEle);
}
const info = userInfo.split("&");
let userID = info[0];
let accountID = info[1];
let username = userID;
if (info.length > 2) {
    username = info[2];
}
document.getElementById("username").innerHTML = "Username: " + username;
document.getElementById("userid").innerHTML = "UserID: " + userID;
document.getElementById("accountid").innerHTML = "AccountID: " + accountID;
