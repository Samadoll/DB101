function sendReq(action, site, des, json) {
    return new Promise((fulfill, reject) => {
        console.log(json);
        let xmlReq = new XMLHttpRequest();
        xmlReq.open(action, site, true);
        xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlReq.onload = function () {
            if (this.status === 200) {
                alert("Succeeded!");
                fulfill(this.response);
                console.log("final");
                if (des === "settings") {
                    const result = JSON.parse(this.response).result.split(":");
                    const userID = result[0];
                    const accID = result[1];
                    const champions = result[2];
                    location.href = "settings/" + userID+ "&" + accID + "/champion=" + champions;
                } else if (des === "getItem") {
                    const result = JSON.parse(this.response).result;
                    location.href = "itemInfo/" + result;
                } else {
                    location.href = des;
                }
            } else {
                reject(this.response);
                console.log("fail");
                const responseError = JSON.parse(this.response);
                alert(responseError["error"]);
            }
        };
        xmlReq.send(json);
    });
}