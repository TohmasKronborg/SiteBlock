const link = document.querySelector("#link")
const word = document.querySelector("#word")
const schedule = document.querySelector("#schedule")

const Lconfig = document.querySelector("#link-config")
const Wconfig = document.querySelector("#word-config")
const Sconfig = document.querySelector("#schedule-config")

const Llist = document.querySelector("#link-list")
const Wlist = document.querySelector("#word-list")
const Slist = document.querySelector("#schedule-list")



link.addEventListener("click", function () {
    Lconfig.classList.remove("hidden")
    Llist.classList.remove("hidden")

    Wconfig.classList.add("hidden")
    Wlist.classList.add("hidden")

    Sconfig.classList.add("hidden")
    Slist.classList.add("hidden")
});

word.addEventListener("click", function () {
    Wconfig.classList.remove("hidden")
    Wlist.classList.remove("hidden")

    Llist.classList.add("hidden")
    Lconfig.classList.add("hidden")

    Sconfig.classList.add("hidden")
    Slist.classList.add("hidden")
});

schedule.addEventListener("click", function () {
    Sconfig.classList.remove("hidden")
    Slist.classList.remove("hidden")

    Llist.classList.add("hidden")
    Lconfig.classList.add("hidden")

    Wconfig.classList.add("hidden")
    Wlist.classList.add("hidden")
});