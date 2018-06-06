function sendReq(action, site, des, json) {
    return new Promise((fulfill, reject) => {
        console.log(json);
        let xmlReq = new XMLHttpRequest();
        xmlReq.open(action, site, true);
        xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log(json);
        xmlReq.onload = function () {
            if (this.status === 200) {
                fulfill(this.response);
                console.log("final");
                location.href = des;
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