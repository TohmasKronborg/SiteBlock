document.addEventListener("DOMContentLoaded", () => {
    // =====================
    // GLOBAL STATE
    // =====================
    let idCounter = Date.now();

    const state = {
        words: [],
        links: [],
        schedules: []
    };

    // =====================
    // HELPERS
    // =====================
    function generateId() {
        return idCounter++;
    }

    function syncToStorage() {
        chrome.storage.local.set({
            words: state.words,
            links: state.links,
            schedules: state.schedules
        });
    }

    function updateCount(id, count) {
        const el = document.getElementById(id);
        if (el) el.textContent = count;
    }

    function toggleEmptyMessage(list, messageId) {
        const message = document.getElementById(messageId);
        if (!message) return;
        message.style.display = list.children.length === 0 ? "block" : "none";
    }

    // =====================
    // LOAD DATA
    // =====================
    chrome.storage.local.get(["words", "links", "schedules"], (data) => {
        state.words = data.words || [];
        state.links = data.links || [];
        state.schedules = data.schedules || [];

        renderAll();
    });

    // =====================
    // RENDER ALL
    // =====================
    function renderAll() {
        renderWords();
        renderLinks();
        renderSchedules();
    }

    // =====================
    // WORDS
    // =====================
    function renderWords() {
        const wordList = document.getElementById("wordList");
        wordList.innerHTML = "";

        state.words.forEach(item => {
            const div = document.createElement("div");
            div.className = "blocked-word flex-row space-between";

            div.innerHTML = `
                <span>${item.value}</span>

                <button class="flex-center remove" data-id="${item.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4H14" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.6666 4V13.3333C12.6666 14 11.9999 14.6667 11.3333 14.6667H4.66659C3.99992 14.6667 3.33325 14 3.33325 13.3333V4" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.33325 3.99998V2.66665C5.33325 1.99998 5.99992 1.33331 6.66659 1.33331H9.33325C9.99992 1.33331 10.6666 1.99998 10.6666 2.66665V3.99998" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.66675 7.33331V11.3333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.33325 7.33331V11.3333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
                </button>
            `;

            wordList.appendChild(div);
        });

        updateCount("WordCount", state.words.length);
        toggleEmptyMessage(wordList, "wordEmpty");
    }

    // =====================
    // LINKS
    // =====================
    function renderLinks() {
        const linkList = document.getElementById("linkList");
        linkList.innerHTML = "";

        state.links.forEach(item => {
            const div = document.createElement("div");
            div.className = "blocked-link flex-row space-between";

            div.innerHTML = `
                <div class="flex-center" style="gap: 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.5 2.5H17.5V7.5" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.33325 11.6667L17.4999 2.5" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h4>${item.value}</h4>
                </div>

                <button class="remove" data-id="${item.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4H14" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.6666 4V13.3333C12.6666 14 11.9999 14.6667 11.3333 14.6667H4.66659C3.99992 14.6667 3.33325 14 3.33325 13.3333V4" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.33325 3.99998V2.66665C5.33325 1.99998 5.99992 1.33331 6.66659 1.33331H9.33325C9.99992 1.33331 10.6666 1.99998 10.6666 2.66665V3.99998" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.66675 7.33331V11.3333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.33325 7.33331V11.3333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
                </button>
            `;

            linkList.appendChild(div);
        });

        updateCount("linkCount", state.links.length);
        toggleEmptyMessage(linkList, "linkEmpty");
    }

    // =====================
    // SCHEDULES
    // =====================
    function renderSchedules() {
        const scheduleList = document.getElementById("scheduleList");
        scheduleList.innerHTML = "";

        state.schedules.forEach(s => {
            const article = document.createElement("article");
            article.className = "flex-row space-between";

            article.innerHTML = `
                <div class="flex-row">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 5V10L13.3333 11.6667" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    <div style="margin-left: 12px;">
                        <h3 class="h2 m-0">${s.name}</h3>
                        <p class="color-secondary"><b>Days:</b> ${s.days.join(", ")}</p>
                        <p class="color-secondary"><b>Time:</b> ${s.start} - ${s.end}</p>
                    </div>

                </div>

                <div class="flex-row" style="gap: 8px;">

                    <button class="scheduleToggle" data-id="${s.id}">
                        ${s.active ? "ON" : "OFF"}
                    </button>

                    <button class="remove" data-id="${s.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4H14" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.6666 4V13.3333C12.6666 14 11.9999 14.6667 11.3333 14.6667H4.66659C3.99992 14.6667 3.33325 14 3.33325 13.3333V4" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.33325 3.99998V2.66665C5.33325 1.99998 5.99992 1.33331 6.66659 1.33331H9.33325C9.99992 1.33331 10.6666 1.99998 10.6666 2.66665V3.99998" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.66675 7.33331V11.3333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.33325 7.33331V11.3333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
                    </button>

                </div>
            `;

            scheduleList.appendChild(article);
        });

        document.getElementById("noSchedules").style.display =
            state.schedules.length === 0 ? "block" : "none";
    }

    // =====================
    // ADD WORD
    // =====================
    document.getElementById("addWord").addEventListener("click", () => {
        const input = document.getElementById("wordInput");
        const value = input.value.trim();
        if (!value) return;

        state.words.push({ id: generateId(), value });

        input.value = "";
        syncToStorage();
        renderWords();
    });

    // =====================
    // ADD LINK
    // =====================
    document.getElementById("addLink").addEventListener("click", () => {
        const input = document.getElementById("linkInput");
        const value = input.value.trim();
        if (!value) return;

        state.links.push({ id: generateId(), value });

        input.value = "";
        syncToStorage();
        renderLinks();
    });

    // =====================
    // ADD SCHEDULE
    // =====================
    document.getElementById("addSchedule").addEventListener("click", () => {
        const name = document.getElementById("scheduleName").value.trim();
        const start = document.getElementById("scheduleStartTime").value;
        const end = document.getElementById("scheduleEndTime").value;

        const days = [...document.querySelectorAll(".week-days:checked")]
            .map(d => d.nextElementSibling.textContent);

        if (!name || !start || !end || days.length === 0) return;

        state.schedules.push({
            id: generateId(),
            name,
            start,
            end,
            days,
            active: true
        });

        syncToStorage();
        renderSchedules();
    });

    // =====================
    // GLOBAL CLICK HANDLER
    // =====================
    document.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".remove");
        if (removeBtn) {
            const id = Number(removeBtn.dataset.id);

            state.words = state.words.filter(i => i.id !== id);
            state.links = state.links.filter(i => i.id !== id);
            state.schedules = state.schedules.filter(i => i.id !== id);

            syncToStorage();
            renderAll();
            return;
        }

        const toggleBtn = e.target.closest(".scheduleToggle");
        if (toggleBtn) {
            const id = Number(toggleBtn.dataset.id);

            const schedule = state.schedules.find(s => s.id === id);
            if (!schedule) return;

            schedule.active = !schedule.active;

            syncToStorage();
            renderSchedules();
        }
    });

});