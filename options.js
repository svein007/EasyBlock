var enabled = false;
var blockedSitesArray = [];

function save_options() {
	console.log("save_options called");

	var blockedSitesString = document.getElementById('blockedSitesText').value;
	var enabeledCheckboxStatus = document.getElementById('enabeledCheckbox').checked;

	enabled = enabeledCheckboxStatus;
	blockedSitesArray = [];

	var lines = blockedSitesString.split('\n');
	for(var i = 0; i < lines.length; i++){
		// console.log(lines[i]);
		if (lines[i].trim() != "") {
			if (lines[i].trim().startsWith("*://www.") && lines[i].trim().endsWith("/*")) {
				blockedSitesArray.push(lines[i].trim());
			} else {
				var url = makeFormattedUrl(lines[i].trim());
				if (url && url != "") {
					blockedSitesArray.push(url);
				}
			}
		}
	}

	localStorage.setItem('blockedSites', JSON.stringify(blockedSitesArray));
	localStorage.setItem('enabled', JSON.stringify(enabeledCheckboxStatus));
	chrome.runtime.reload(); // Makes bg.js run again, renews listener
}

function restore_options() {
	console.log("restore_options called");

	var sitesArr = JSON.parse(localStorage.getItem('blockedSites'));
	var enabled = JSON.parse(localStorage.getItem('enabled'));
	console.log(sitesArr);
	console.log(enabled);

	var blockedSitesString = "";
	for (var site in sitesArr) {
		var siteStr = sitesArr[site];
		if (siteStr.trim() != "") {
			blockedSitesString += siteStr + "\n";
		}
	}
	document.getElementById("blockedSitesText").value = blockedSitesString;
	document.getElementById("enabeledCheckbox").checked = enabled;

}

function makeFormattedUrl(url) {

	var start = "*://www.";
	var end = "/*";

	var result = "";

	if (url.startsWith(start)) {
		result += url;
	} else if (url.startsWith("www.")) {
		result = "*://" + url;
	} else if (url.startsWith("http://www.")) {
		result = url.replace("http://", "*://")
	} else if (url.startsWith("https://www.")) {
		result = url.replace("https://", "*://")
	} else if (url.startsWith("http://")) {
		result = url.replace("http://", "*://www.")
	} else if (url.startsWith("https://")) {
		result = url.replace("https://", "*://www.")
	} else {
		result = start + url;
	}

	if (!url.endsWith("/*")) {
		if (url.endsWith("/")) {
			result += "*";
		} else {
			result += "/*";
		}
	}


	return result;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
