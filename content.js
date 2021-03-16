//alert("loading");

function load(target_url, query, new_tab) {
    let params = new URLSearchParams()
    params.set("q", query);
    let url_with_query = target_url + "?" + params.toString();
    let ops = {url: url_with_query};
    if(new_tab) {
        chrome.tabs.create(ops);
    } else {
        chrome.tabs.update(ops);
    }
}

function extract_query(callback) {
    chrome.tabs.query({active:true, currentWindow:true}, function(tab) {
        let params = new URLSearchParams(tab[0].url.split("?")[1]);
        callback(params.get("q"));
    });
}

function get_url(target_engine) {
    switch(target_engine) {
        case "ecosia": return "https://ecosia.org/search";
        case "duckduckgo": return "https://duckduckgo.com";
        case "google": return "https://google.dk/search";
    }
}

function switch_search_engine(event, target_engine) {
    let new_tab = event.which === 2;
    extract_query((url) => {
        load(get_url(target_engine), url, new_tab);
    });
}


document.getElementById("google").addEventListener("click", (e) => switch_search_engine(e, "google"));
document.getElementById("ecosia").addEventListener("click", (e) => switch_search_engine(e, "ecosia"));
document.getElementById("duckduckgo").addEventListener("click", (e) => switch_search_engine(e, "duckduckgo"));