const current = window.location.href;
let splitURL = current.split("/");
const champID = splitURL[splitURL.length - 1];
const cid = {};
cid["champID"] = champID;
let cJson = JSON.stringify(cid);
let itemDiv = document.createElement("div");
itemDiv.className = "item_list";
function saveMyChamp() {
    if (current.includes("=")) {
        const ids = current.slice(current.indexOf("=") + 1).split("/");
        const aid = ids[0];
        const cid = ids[1];
        const id = {};
        id["aid"] = aid;
        id["cid"] = cid;
        let json = JSON.stringify(id);
        sendReqWithFn("POST", "../saveMyChampion", null, json);
    } else {
        alert("Please Login first.");
    }
    // sendReqWithFn("POST", "/saveMyChampion", null, cJson);
}
function buildSuggestItemHTML(data) {
    let content = "";
    data.forEach((item) => {
        const id = item["id"];
        const name = item["name"];
        const imgName = name.toLowerCase().replace(/\./g, "").replace(/\'/g,"").split(" ").join("");
        let innerContent =
            '<div class="item" id="' + id + '"> \n' +
            '<a href="../getItemInfo/' + id + '"> \n' +
            '<img src="../images/'+ imgName + '.png" style="width:100px;height:100px;border:none">\n' +
            '<p class="itemname">' + name + '</p>\n' +
            '</a>\n' +
            '</div>\n';
         content += innerContent;
    });
    itemDiv.innerHTML = content;
}
function buildChampionHTML(data) {
    const id = data["id"];
    const name = data["name"];
    const lane = data["lane"];
    const type = data["type"];
    const stat = data["stat"];
    let imgName = name.toLowerCase().split(" ").join("");
    const stats = stat.split(", ");
    let homepage = "../toolbox";
    if (current.includes("=")) {
        homepage += current.slice(current.indexOf("=")).split("/")[0];
    }
    let backGround = document.getElementById("championBackground");
    backGround.innerHTML =
        '<div class="lol_logo">\n' +
        '<a href="' + homepage + '" target = "_blank"> <img src="../images/lol_icon_new.png"></a>\n' +
        '</div>\n' +
        '<div id="champProfile" class ="profile_part">\n' +
        '<img src="../images/' + imgName + '_icon.png" class="profile" id = championicon>\n' +
        '<div class="name" id="championname">\n' +
        '<h2>' + name + '</h2>\n' +
        '</div>\n' +
        '<div class="info" id="championinfo">\n' +
        '<p id="allInfo">    \n' +
        'ID: '+ id + '<br><br>\n' +
        'Name: ' + name + '<br><br>\n' +
        'Position: ' + lane + '<br><br>\n' +
        'Type: ' + type + '<br><br>\n' +
        '</p>\n' +
        '</div>\n' +
        '</div>';
    stats.forEach((item) => {
        document.getElementById("allInfo").innerHTML += item + '<br><br>';
    });
    document.getElementById("champProfile").appendChild(itemDiv);
    document.getElementById("background").background = "../images/"+ imgName + "_bkg.jpg"

}
sendReqWithFn("POST", "../getSuggestItems", buildSuggestItemHTML, cJson);
sendReqWithFn("POST", "../getChampionInfo", buildChampionHTML, cJson);