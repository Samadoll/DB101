function sendReqWithFn(action, site, fn, json) {
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

                if (fn !== null) {
                    const result = JSON.parse(this.response);
                    console.log(result.result);
                    fn(result);
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