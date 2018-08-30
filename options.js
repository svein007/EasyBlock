
if (localStorage.getItem('blockedSites') == null) {
	localStorage.setItem('blockedSites', JSON.stringify([]));
}

document.getElementById("addBtn").onclick = function () {
	newElement();
};

document.body.onload = function () {
	displayList();
}

document.getElementById("addInput").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) { // KeyCode 13 = Enter key
    newElement();
  }
});

displayList();

function newElement() {
	console.log("newElement called");
	var inputValue = document.getElementById("addInput").value;
	document.getElementById("addInput").value = "";
	if (inputValue.trim() != "") {
		saveSite(inputValue);
	}
	displayList();
}

function saveSite(siteStr) {
	var list = JSON.parse(localStorage.getItem('blockedSites'));
	list.push({site: siteStr, toggle: true});
	console.log(list);
	localStorage.setItem('blockedSites', JSON.stringify(list));
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
		
		var checkbox = document.createElement("INPUT");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("class", "checkbox")
		checkbox.checked = item.toggle;
		checkbox.onchange = function () {
			var elementIndex = this.parentElement.value;
			var isEnabled = this.checked;

			var list = getSiteList();
			list[elementIndex].toggle = isEnabled;

			setSiteList(list);
		}

		var spanClose = document.createElement("SPAN");
	  var txt = document.createTextNode("\u00D7");
	  spanClose.className = "close";
	  spanClose.appendChild(txt);
		spanClose.onclick = function () {
			var elementIndex = this.parentElement.value;
			removeElement(elementIndex);
			displayList();
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
