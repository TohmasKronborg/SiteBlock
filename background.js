const BASE_ID = 1000;

function createFilter(value) {
    value = value.toLowerCase();

    return value.startsWith("http")
        ? `|${value}|`
        : `||${value}`;
}

async function updateRules() {
    const data = await chrome.storage.local.get(["words", "links"]);

    const words = data.words || [];
    const links = data.links || [];

    let rules = [];
    let id = BASE_ID;

    // Links rules
    for (const item of links) {
        if (!item.value) continue;

        rules.push({
            id: id++,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: createFilter(item.value),
                resourceTypes: ["main_frame"]
            }
        });
    }

    // Word rules
    for (const item of words) {
        if (!item.value) continue;

        rules.push({
            id: id++,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: item.value.toLowerCase(),
                resourceTypes: ["main_frame"]
            }
        });
    }

    // Remove existing dynamic rules
    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const removeIds = existing.map(r => r.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: removeIds,
        addRules: rules
    });
}

// Initial load
updateRules();

// Listen for storage changes
chrome.storage.onChanged.addListener(() => {
    updateRules();
});

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("siteblock.html")
    });
});
