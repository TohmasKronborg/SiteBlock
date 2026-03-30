chrome.runtime.onInstalled.addListener(() => {
    buildRules();
});

chrome.storage.onChanged.addListener(() => {
    buildRules();
});

function buildRules() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1),
        addRules: []
    }, () => {
        chrome.storage.local.get(["blocked"], (data) => {
            const blocked = data.blocked || [];
            let rules = [];
            let id = 1;

            blocked.forEach(item => {
                rules.push({
                    id: id++,
                    priority: 1,
                    action: {
                        type: "redirect",
                        redirect: {
                            url: chrome.runtime.getURL("blockedRedirect.html")
                        }
                    },
                    condition: {
                        urlFilter: item.value,
                        resourceTypes: ["main_frame"]
                    }
                });
            });

            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [],
                addRules: rules
            });
        });
    });
}