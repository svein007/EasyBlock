/*
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
		// Removes element
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
		// Toggle enabled
  }
}, false);
*/

if (localStorage.getItem('blockedSites') == null) {
	localStorage.setItem('blockedSites', JSON.stringify([]));
}

document.getElementById("addBtn").onclick = function () {
	newElement();
};
document.body.onload = function () {
	displayList();
}

displayList();

function newElement() {
	console.log("newElement called");
	var inputValue = document.getElementById("addInput").value;
	document.getElementById("addInput").value = "";
	if (inputValue.trim() != "") {
		saveSite(inputValue);
		/*
		if (isValidUrl(inputValue)) {
			saveSite(inputValue);
		} else {
			saveSite(makeFormattedUrl(inputValue));
		}
		*/
	}
	displayList();
}

function saveSite(siteStr) {
	var list = JSON.parse(localStorage.getItem('blockedSites'));
	list.push({site: siteStr, toggle: true});
	console.log(list);
	localStorage.setItem('blockedSites', JSON.stringify(list));
	// chrome.runtime.reload(); // Makes bg.js run again, renews listener
}

function displayList() {
	var list = JSON.parse(localStorage.getItem('blockedSites'));
	console.log("Should display list :" + list);
	console.log(typeof(list));
	var htmlUL = document.getElementById("siteList");
	htmlUL.innerHTML = "";
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var li = document.createElement("li");
		li.value = i;
		var span = document.createElement("SPAN");
		span.className = "elementSite";
		var siteStr = document.createTextNode(item.site);
		console.log(siteStr);
		var checkbox = document.createElement("INPUT");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("class", "checkbox")
		checkbox.checked = item.toggle;
		checkbox.onchange = function () {
			// alert(this.checked);
			// alert(this.parentElement.children[1].innerHTML);

			var elementIndex = this.parentElement.value;
			var isEnabled = this.checked;

			var list = getSiteList();
			list[elementIndex].toggle = isEnabled;

			setSiteList(list);
			// chrome.runtime.reload(); // Makes bg.js run again, renews listener
		}

		var spanClose = document.createElement("SPAN");
	  var txt = document.createTextNode("\u00D7");
	  spanClose.className = "close";
	  spanClose.appendChild(txt);
		spanClose.onclick = function () {
			var elementIndex = this.parentElement.value;
			removeElement(elementIndex);
			displayList();
			// chrome.runtime.reload(); // Makes bg.js run again, renews listener
		}


		li.append(checkbox);
		span.appendChild(siteStr);
		li.appendChild(span);
		li.appendChild(spanClose);
		htmlUL.appendChild(li);
	}
}


function getSiteList() {
	var list = JSON.parse(localStorage.getItem('blockedSites'));
	return list;
}

function setSiteList(siteList) {
	localStorage.setItem('blockedSites', JSON.stringify(siteList));
}

function removeElement(index) {
	var list = getSiteList();
	list.splice(index, 1);
	setSiteList(list);
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

function isValidUrl(url) {
	return (url.trim().startsWith("*://www.") && url.trim().endsWith("/*"));
}

function newElement2() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
