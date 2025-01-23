
// add copy link option to copy link button with id 'copyButton'

window.addEventListener("load", () => {
    const copyLinkbutton = document.getElementById("copyButton");
    const link = window.location.href;
    console.log({
        copyLinkbutton,
        link
    })
    copyLinkbutton.addEventListener("click", () => {
        navigator.clipboard.writeText(link);
        copyLinkbutton.textContent = "Copied!";
        copyLinkbutton.style.backgroundColor = "#16a34a";
        copyLinkbutton.style.color = "white";
        copyLinkbutton.style.fontWeight = "bold";
    setTimeout(() => {
        copyLinkbutton.textContent = "Copy Link";
        copyLinkbutton.style.backgroundColor = "";
        copyLinkbutton.style.color = "";
        copyLinkbutton.style.fontWeight = "";
    }, 1000);
    });
    
});

