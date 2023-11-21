const cancelButton = document.querySelector("#backButton");

cancelButton.addEventListener("click", () => {
    if (confirm("Changes will not be saved.  You sure you want to quit?")) {
        location.href = "client-manager.html";
    } else {
        // do nothing
    }
});