function addChampion(aChampion) {

    const champID = aChampion["champID"];
    const champName = aChampion["champName"];
    const type = aChampion['type'].trim();
    const lowercaseChamp = champName.toLowerCase();
    let newDiv = document.createElement("div");
    newDiv.className = "filterDiv " + type + " show";
    newDiv.id = champID;
    newDiv.innerHTML =
        '<a href=' + lowercaseChamp + '.html>\n' +
        '<img class="champimg" alt="' + champName + '" src="../images/' + lowercaseChamp + '_icon.png">\n' +
        '<p class="champname">' + champName + '</p>\n' +
        '</a>';
    document.getElementById("allChampions").appendChild(newDiv);
}
let current = window.location.href;
let splitUrl = current.split("/");
const accountID = splitUrl[splitUrl.length - 1];
function buildUserSettingHTML(data) {
    // const result = data.result.split(":");
    // const userID = result[0];
    // const champions = result[2];
    // if (champions !== "null") {
    //     const champion = champions.split("&");
    //     champion.forEach(addChampion);
    // } else {
    //     let newEle = document.createElement("p");
    //     newEle.innerHTML = "You don't have any champions.";
    //     document.getElementById("allChampions").appendChild(newEle);
    // }
    // document.getElementById("username").innerHTML = "Username: " + accountID;
    // document.getElementById("userid").innerHTML = "UserID: " + userID;
    // document.getElementById("accountid").innerHTML = "AccountID: " + accountID;
    const id = data["id"];
    const userID = data["userID"];
    const name = data["name"];
    const champs = data["accownchamp"];
    if (champs.length > 0) {
        champs.forEach(addChampion);
    } else {
        let newEle = document.createElement("p");
        newEle.innerHTML = "You don't have any champions.";
        document.getElementById("allChampions").appendChild(newEle);
    }
    document.getElementById("username").innerHTML = "Username: " + name;
    document.getElementById("userid").innerHTML = "UserID: " + userID;
    document.getElementById("accountid").innerHTML = "AccountID: " + id;
}
const accID = {};
accID['accID'] = accountID;
let json = JSON.stringify(accID);
sendReqWithFn("POST", "/testSettingsPage", buildUserSettingHTML, json);