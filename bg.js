
function setBeforeRequestListener() {
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			var sites = getBlockedSitesElements();
			console.log("Should block sites: " + sites);
			for (var siteIndex in sites) {
				var siteElem = sites[siteIndex];
				if (siteElem.toggle && details.url.indexOf(siteElem.site) != -1) {
					console.log("Block site: " + siteElem.site);
					return {cancel: true};
				}
			}
			return {cancel: false};
		},
		{urls: ["*://*/*"]},
		["blocking"]);
}

function setBeforeRequestListener2() {
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			return {cancel: true};
		},
		{urls: getBlockedSites()},
		["blocking"]);
}


function getBlockedSites() {
	var sitesArr = JSON.parse(localStorage.getItem('blockedSites'));
	var arr = sitesArr.map(s => s.site);

	return arr;
}

function getBlockedSitesElements() {
	var sitesArr = JSON.parse(localStorage.getItem('blockedSites'));
	return sitesArr;
}

//if (JSON.parse(localStorage.getItem('enabled'))) {
	setBeforeRequestListener();
//}
