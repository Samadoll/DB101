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
sendReqWithFn("POST", "/getItemInfo", buildItemHTML, json);
