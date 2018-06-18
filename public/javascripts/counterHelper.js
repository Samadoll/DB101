const current = window.location.href;
const basic = current.split("&")[0];
const champAid = current.split("&")[1].slice(current.split("&")[1].indexOf("=") + 1);
const champBid = current.split("&")[2].slice(current.split("&")[2].indexOf("=") + 1);
const aid = {};
aid["champID"] = champAid;
let aJson = JSON.stringify(aid);
const bid = {};
bid["champID"] = champBid;
let bJson = JSON.stringify(bid);
const both = {};
both["champA"] = champAid;
both["champB"] = champBid;
let bothJson = JSON.stringify(both);
let prevPage = "counterSelection";
let champPage = "getChampionInfo";
if (basic.includes("=")) {
    prevPage += "=" + basic.slice(basic.indexOf("=") + 1);
    champPage += "=" + basic.slice(basic.indexOf("=") + 1);
}
document.getElementById("logo").href = prevPage;

console.log(basic);
console.log(champAid);
console.log(champBid);
function buildChampHTML(data, target) {
    const id = data["id"];
    const name = data["name"];
    const lane = data["lane"];
    const type = data["type"];
    const stat = data["stat"];
    const stats = stat.split(", ");
    let imgName = name.toLowerCase().split(" ").join("");
    let innerContent =
        'ID: '+ id + '<br><br>' +
        'Name: ' + name + '<br><br>' +
        'Position: ' + lane + '<br><br>' +
        'Type: ' + type + '<br><br>';
    document.getElementById(target + "AllInfo").innerHTML = innerContent;
    document.getElementById(target + "Href").href = champPage + "/" + id;
    document.getElementById(target + "Icon").src = "../images/" + imgName + "_icon.png";
    stats.forEach((item) => {
        document.getElementById(target + "AllInfo").innerHTML += item + '<br><br>';
    });
}
function buildYourChamp(data) {
    buildChampHTML(data, "yours");

}
function buildCounterChamp(data) {
    buildChampHTML(data, "counter");
}

function buildSuggestion(data) {
    const strategy = data[0]["Strategy"];
    document.getElementById("strategy").innerHTML = strategy;
    data.forEach((item) => {
        const id = item["itemID"];
        const name = item["name"];
        const imgName = name.toLowerCase().replace(/\./g, "").replace(/\'/g, "").split(" ").join("");
        const innerContent =
            '<a href="getItemInfo/' + id + '" target = "_blank"> \n' +
            '<img id="yours-item' + id + '" src="../images/' + imgName + '.png" style="width:100px;height:100px;border:none;">\n' +
            '<p id="' + id + '" class="itemname">' + name + '</p>\n' +
            '</a>';
        document.getElementById("myDropdown").innerHTML += innerContent;
    });
}

sendReqWithFn("POST", "getChampionInfo", buildYourChamp, aJson);
sendReqWithFn("POST", "getChampionInfo", buildCounterChamp, bJson);
sendReqWithFn("POST", "counterPage", buildSuggestion, bothJson);