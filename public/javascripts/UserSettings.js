let current = window.location.href;
let splitUrl = current.split("/");
const accountID = splitUrl[splitUrl.length - 1];
function addChampion(aChampion) {

    const champID = aChampion["champID"];
    const champName = aChampion["champName"];
    const type = aChampion['type'].trim().toLowerCase();
    const lowercaseChamp = champName.toLowerCase();
    let newDiv = document.createElement("div");
    newDiv.className = "filterDiv " + type + " show";
    newDiv.id = champID;
    newDiv.innerHTML =
        '<a href=../getChampionInfo=' + accountID + "/" + champID + '>\n' +
        '<img class="champimg" alt="' + champName + '" src="../images/' + lowercaseChamp + '_icon.png">\n' +
        '<p class="champname">' + champName + '</p>\n' +
        '</a>';
    document.getElementById("allChampions").appendChild(newDiv);
}
function buildUserSettingHTML(data) {
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
    document.getElementById("delete").href = id + "/DeleteMyAccount";
    document.getElementById("reset").href = id + "/ResetPassword";
    document.getElementById("homepage").href = "../toolbox=" + id;
}
const accID = {};
accID['accID'] = accountID;
let json = JSON.stringify(accID);
sendReqWithFn("POST", "/SettingsPage", buildUserSettingHTML, json);