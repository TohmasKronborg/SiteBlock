// Clean, fixed, and scalable tab system
const tabs = {
    word: {
        btn: document.querySelector("#word-btn"),
        content: document.querySelector("#word-config")
    },
    link: {
        btn: document.querySelector("#link-btn"),
        content: document.querySelector("#link-config")
    },
    schedule: {
        btn: document.querySelector("#schedule-btn"),
        content: document.querySelector("#schedule-config")
    }
};

function showTab(active) {
    Object.entries(tabs).forEach(([key, { btn, content }]) => {
        const isActive = key === active;

        content.classList.toggle("hidden", !isActive);

        btn.classList.toggle("active-btn", isActive);
    });
}

Object.entries(tabs).forEach(([key, { btn }]) => {
    btn.addEventListener("click", () => showTab(key));
});


showTab("schedule");