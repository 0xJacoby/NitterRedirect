"use strict";
const RedirectButton = {
    Create: function () {
        var _a;
        let elem = document.createElement("div");
        let btnElem = document.createElement("div");
        let btnText = document.createElement("p");
        elem.classList.add("nitter_redirect_button_container");
        btnElem.classList.add("nitter_redirect_button");
        btnText.classList.add("r-37j5jr");
        btnText.innerText = "Open in Nitter";
        btnElem.appendChild(btnText);
        elem.appendChild(btnElem);
        (_a = elem.querySelector(".nitter_redirect_button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let userTag = window.location.pathname.split("/")[1];
            if (userTag) {
                window.location.href = "https://nitter.net/" + userTag;
            }
        });
        return elem;
    },
    Inject: function () {
        LogInfo("Injecting redirect button...");
        let row = document.querySelector("div.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep");
        if (row) {
            let button = this.Create();
            row.insertBefore(button, row.lastChild);
            LogInfo("Injection successful");
        }
    }
};
function LogInfo(info) {
    console.log("%c[NitroRedirect]" + "%c: " + "%c" + info, "color:magenta;font-weight:bold;", "color:white;", "color:white;font-style:italic;");
}
function checkTitle() {
    let title = document.title;
    if (title !== "") {
        let userTag = window.location.pathname.split("/")[1];
        if (userTag !== "") {
            if (title.includes(`(@${userTag}) / Twitter`)) {
                LogInfo("Detected a twitter profile");
                RedirectButton.Inject();
            }
            else if (title === "Profile / Twitter") {
                setTimeout(checkTitle, 500);
            }
        }
    }
    else {
        setTimeout(checkTitle, 500);
    }
}
checkTitle();
