// const main = document.getElementById("main");
// let currentURL = window.location.href;
// const URLpcs = currentURL.split("/");
// const pcsNum = URLpcs.length;
// let extra = URLpcs[pcsNum - 1].split("-").join(" ");
// let stats = URLpcs[pcsNum - 2].split("PERCENTAGE").join("%")
//     .replace(/\_/g, "+").split("-").join(" ").split("&");
// let name = URLpcs[pcsNum - 3].split("-").join(" ");
// let id = URLpcs[pcsNum - 4];
// console.log(id);
// console.log(name);
// console.log(stats);
// console.log(extra);
//
// main.innerHTML = '<h2 id="itemname">' + name + " (" + id + ")" + '</h2>\n' +
//     '<img class="itemimg" alt="'+ name + '" src="../../../../images/'+ name.split(" ").join("").toLowerCase() + '.png">\n' +
//     '<p>Stats:</p>\n' +
//     '<p id="stat">\n';
// stats.forEach((item) => {
//    main.innerHTML += '<li>' + item + '</li>\n';
// });
//
// main.innerHTML += '</p>\n' +
//     '<p>Extra Info:</p>\n' +
//     '<p id="extrainfo">\n' +
//     '<li>' + extra + '</li>\n' +
//     '</p>';

const current = window.location.href;
let splitURL = current.split("/");
const itemID = splitURL[splitURL.length - 1];
function buildItemHTML(data) {
    const main = document.getElementById("main");
    const id = data["id"];
    const name = data["name"];
    let imgName = name.toLowerCase().replace(/\./g, "").replace(/\'/g, "").split(" ").join("");
    const stat = data["stat"].split(", ");
    const extra = data["extraInfo"];
    main.innerHTML = '<h2 id="itemname">' + name + " (" + id + ")" + '</h2>\n' +
        '<img class="itemimg" alt="'+ name + '" src="../images/'+ imgName + '.png">\n' +
        '<p>Stats:</p>\n' +
        '<p id="stat">\n';
    stat.forEach((item) => {
        main.innerHTML += '<li>' + item + '</li>\n';
    });

    main.innerHTML += '</p>\n' +
        '<p>Extra Info:</p>\n' +
        '<p id="extrainfo">\n' +
        '<li>' + extra + '</li>\n' +
        '</p>';
}
const iid = {};
iid["itemID"] = itemID;
let json = JSON.stringify(iid);
sendReqWithFn("POST", "/testSingleItemPage", buildItemHTML, json);
