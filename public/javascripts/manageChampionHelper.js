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
const attr = ["id", "name", "type", "position", "stat"];
function buildChamps(data) {
    let table = document.getElementById("content");
    data.forEach((item) => {
        table.innerHTML += '<tr>';
        attr.forEach((item2) => {
            if (Object.keys(item).includes(item2)) {
                table.innerText += '<td>' + item[item2] + '</td>';
            } else {
                table.innerText += '<td>' + "-" + '</td>';
            }
        });
        table.innerHTML += '</tr>';
    });
}
document.getElementById("submit").addEventListener("click", () => {
    sendReqWithFn("POST", "/manageChamp", buildChamps, json);
});
