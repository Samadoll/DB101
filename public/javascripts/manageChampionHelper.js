const attr = ["id", "name", "type", "lane", "stat"];
function buildChamps(data) {
    let table = document.getElementById("content");
    data.forEach((item) => {
        table.innerHTML += '<tr id="' + item.id + '">';
        table.innerHTML += '</tr>';
        attr.forEach((item2) => {
            if (Object.keys(item).includes(item2)) {
                document.getElementById(item.id).innerHTML += '<td>' + item[item2] + '</td>';
            } else {
                document.getElementById(item.id).innerHTML += '<td>' + "-" + '</td>';
            }
        });
    });
}
document.getElementById("submit").addEventListener("click", () => {
    document.getElementById("content").innerHTML =
        '<tr>\n' +
        '            <th class="column">Champion ID</th>\n' +
        '            <th class="namecolumn">Name</th>\n' +
        '            <th class="typecolumn">Type</th>\n' +
        '            <th class="posicolumn">Lane</th>\n' +
        '            <th class="statcolumn">Stat</th>\n' +
        '        </tr>';
    const choice = document.getElementById("choice").getElementsByTagName("input");
    const data = {};
    data["choice"] = ["id"];
    for (const item of choice) {
        if (item.hasAttribute("checked") && item.getAttribute("checked") === "checked") {
            data["choice"].push(item.id);
        }
    }
    const type = document.getElementById("myTypeContainer").getElementsByTagName("input");
    const typeSelected = [];
    for (const item of type) {
        if (item.hasAttribute("checked") && item.getAttribute("checked") === "checked") {
            typeSelected.push(item.id);
        }
    }
    if (typeSelected.length > 0)
        data["type"] = typeSelected;
    const json = JSON.stringify(data);

    sendReqWithFn("POST", "/manageChamp", buildChamps, json);
});
