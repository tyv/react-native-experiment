var cachedRequests = {};

module.exports = function getJsonFromApi(url, config) {
    config = config || {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': '',
            'Host': 'staging.bjornborg.vaimo.com',
            'Authorization': 'Basic ' + btoa('demo:demo')
        }
    };
    if (cachedRequests[url]) {
        console.log('get cached URL ' + url);
        return new Promise((resolve, reject) => {
            resolve(cachedRequests[url]);
        });
    } else {
        console.log('request URL ' + url);
        return fetch(url, config).then((response) => response.text()).then((responseText) => {
            cachedRequests[url] = JSON.parse(responseText).result;
            return cachedRequests[url];
        })
    }
};