const RedirectButton = {

    Create: function(): HTMLElement {
        let elem = document.createElement("div");
        
        // Styling
        let innerContent = `
           <div class="nitter_redirect_button"><p class="r-37j5jr">Open in Nitter</p></div>
        `;
        elem.classList.add("nitter_redirect_button_container");
        elem.innerHTML = innerContent;

        elem.querySelector(".nitter_redirect_button")?.addEventListener("click", () => {
            let userTag = window.location.pathname.split("/")[1];
            if (userTag) {
                window.location.href = "https://nitter.net/" + userTag;
            }
        });

        return elem;
    },

    Inject: function() {
        LogInfo("Injecting redirect button...");
        let row = document.querySelector("div.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep");

        if (row) {
            let button: HTMLElement = this.Create();
            row.insertBefore(button, row.lastChild);
            LogInfo("Injection successful");
        }
    }
}

function LogInfo(info: string) {
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
            } else if (title === "Profile / Twitter") {
                setTimeout(checkTitle, 500);
            } 
        } 
    } else {
        setTimeout(checkTitle, 500);
    }
}

checkTitle();