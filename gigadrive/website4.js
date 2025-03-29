//let user = "testuser1";
let user = "";
let username = "";
let userr = "";

const client = new Appwrite.Client();
client
	.setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
	.setProject('67571cd7002ca90a77ef'); // Replace with your Appwrite Project ID

const account = new Appwrite.Account(client);

async function check() {
	updateUsedSpace();
	try {
		user = await account.get();
		username = await user.email;
		userr = await user.name;
		console.log(username);
	} catch (err) {
		console.log(err);
		window.location.replace("https://gigadrive.ddns.net/login");
	}
}

//check();

async function logout() {
	const res = await account.deleteSessions();
	username = "";
	user = "";
	window.location.replace("https://gigadrive.ddns.net/login");
}

const elements = document.querySelectorAll('.filesFilter');

elements.forEach(element => {
	element.addEventListener('click', () => {
		elements.forEach(e => e.classList.remove('activeFilter'));
		element.classList.add('activeFilter');
	});
});

async function listFiles() {

	//let files = await list_files("/" + userr);
	//console.log(files);
	//files = JSON.parse(files);
	files = [
		"/user/purple/randomfile1.docx",
		"/user/red/notes123.pdf",
		"/user/green/image_awesome.png",
		"/user/yellow/script_final.js",
		"/user/purple/design_mockup.psd",
		"/user/red/project_plan.xlsx",
		"/user/green/photo_album.zip",
		"/user/yellow/music_track.mp3",
		"/user/purple/summary_report.txt",
		"/user/red/diagram_flowchart.svg",
		"/user/green/video_clip.mp4",
		"/user/yellow/presentation.pptx",
		"/user/purple/code_snippet.py",
		"/user/red/recipe_book.epub",
		"/user/green/backup_data.tar",
		"/user/yellow/animation.gif",
		"/user/purple/financial_report.csv",
		"/user/red/meeting_minutes.doc",
		"/user/green/landscape_photo.jpg",
		"/user/yellow/blueprint.dwg",
		"/user/purple/randomfile1.docx",
		"/user/red/notes123.pdf",
		"/user/green/image_awesome.png",
		"/user/yellow/script_final.js",
		"/user/purple/design_mockup.psd",
		"/user/red/project_plan.xlsx",
		"/user/green/photo_album.zip",
		"/user/yellow/music_track.mp3"
	];
	let par = document.getElementById("fileList");

	while (par.lastChild) {
		par.removeChild(par.lastChild);
	}

	for (i in files) {
		//container
		let parpar = document.createElement("div");
		parpar.setAttribute("class", "fileLink");
		//parpar.classList.add(files[i].tag);
		//filename


		let elficken = document.createElement("div");
		elficken.setAttribute("class", "fileName");

		let el2 = document.createTextNode(files[i].split("/")[files[i].split("/").length - 1]);
		let tag = files[i].split("/")[files[i].split("/").length - 2];
		if (tag == "purple") {
			parpar.classList.add("purple");
		}
		else if (tag == "red") {
			parpar.classList.add("red");
		}
		else if (tag == "blue") {
			parpar.classList.add("blue");
		}
		else if (tag == "green") {
			parpar.classList.add("green");
		}
		else if (tag == "yellow") {
			parpar.classList.add("yellow");
		}
		else if (tag == "white") {
			parpar.classList.add("white");
		}
		elficken.appendChild(el2);
		//download button
		let el3 = document.createElement("div");
		el3.setAttribute("onclick", "downloadFile('" + files[i] + "')");
		el3.setAttribute("class", "fileDownload")
		let el8 = document.createElement("img");
		el8.setAttribute("src", "download.png");
		el3.appendChild(el8);
		//delete button
		let el5 = document.createElement("div");
		el5.setAttribute("onclick", "deleteFile('" + files[i] + "')");
		el5.setAttribute("class", "fileDelete");
		let el9 = document.createElement("img");
		el9.setAttribute("src", "delete.png");
		el5.appendChild(el9);




		parpar.appendChild(elficken);
		//parpar.appendChild(el);
		parpar.appendChild(el3);
		parpar.appendChild(el5);

		par.appendChild(parpar);
	}
}

async function downloadFile(filename) {
	_read_file(filename);
}

async function deleteFile(filename) {
	await delete_file(filename);
	setTimeout(listFiles, 400);
}

async function uploadFile() {

	sendChunks();

	listFiles();
}

let z;
async function update() {
	updateUsedSpace();
	let zz = await list_files();
	console.log(zz);
	if (z != zz) {
		listFiles();
		z = zz;
	}
}
let pr = 0;
async function updateUsedSpace() {
	let l = document.getElementById("usedSpace");
	let x = await get_full_space();
	l.innerHTML = x;
	let ll = document.getElementById("totalSpace");
	let xx = await get_free_space();
	ll.innerHTML = xx;
	let percentage = Math.round(x / xx * 10) / 10;
	console.log(percentage);
	let bar = document.getElementById("statusBarDownload" + pr).id = "statusBarDownload" + percentage * 10;
	pr = percentage * 10;
	//bar.setAttribute("id", "statusBarDownload" + percentage * 10);
}

setTimeout(listFiles, 1000);
//setTimeout(updateUsedSpace, 1000);



// for PWA: register serviceworker.js

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/service-worker.js")
			.then(() => console.log("Service Worker Registered"))
			.catch((error) => console.error("Service Worker Registration Failed:", error));
	});
}

// sigma. kp ob des funktioniert.
function showUsername() {
	document.getElementById('logoutLink').textContent = username;
	document.getElementById('popupSettingsUsername').textContent = username;
}

document.getElementById('addFile').addEventListener('change', function (e) {
	document.getElementById("fffi").innerHTML = e.target.files.length + " files selected";
	//console.log(e.target.files.length);
});
let filterActive = false;
function filter(tag) {
	let childs = document.querySelectorAll(".fileLink");
	childs.forEach(function (child) {
		if (child.classList.contains(tag)) {
			child.classList.remove("hidden");
		} else {
			child.classList.add("hidden");
		}
	});
}

function clearFilter() {
	let childs = document.querySelectorAll(".fileLink");
	childs.forEach(function (child) {
		child.classList.remove("hidden")
	});
	const elements = document.querySelectorAll('.filesFilter');
	elements.forEach(function (element) {
		element.classList.remove('activeFilter');
		element.classList.remove('activeFilter');
	});

}

function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

chunkPerc = 0;
let bar = document.getElementById("statusBarUpload" + chunkPerc);

function updateSentChunks() {
	bar = document.getElementById("statusBarUpload" + chunkPerc);
	chunkPerc = _chunks_send / _chunks_total_send;
	chunckPerc = Math.round(_chunks_send / _chunks_total_send * 10) / 10;
	chunkPerc = round(round(_chunks_send / _chunks_total_send * 10) / 10 * 10, 0)
	bar.id = "statusBarUpload" + chunkPerc;
	console.log(chunkPerc);
}
const encrypt = (text) => {
	return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt = (data) => {
	return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

function getLink(pswd) {

	var e_user = encrypt(userr);
	var e_pw = encrypt(pswd);
	var link = "https://gigadrive.ddns.net/auth?user=" + e_user + "&pswd=" + e_pw;
	console.log(link);
}

document.getElementById("search").addEventListener("input", function () {

	let searchQuery = this.value.toLowerCase();
	console.log(searchQuery);
	let ll = document.querySelectorAll('.fileLink');
	console.log(ll);

	ll.forEach(function (contact) {
		let contactName = contact.textContent.toLowerCase();
		if (contactName.includes(searchQuery)) {
			contact.classList.remove('hiddenResult');
			contact.classList.remove('displayNone');
		} else {
			contact.classList.add('hiddenResult');
			setTimeout(function () {
				contact.classList.add('displayNone');
			}, 400);
		}
	});

});

let selectBtn = document.getElementById("selectBtn");
let cancelSelectBtn = document.getElementById("cancelSelectBtn");
let selectInfo = document.getElementById("selectInfo");
let saveSelection = document.getElementById("saveSelection");
let deleteSelection = document.getElementById("deleteSelection");
let slcAllSelection = document.getElementById("slcAllSelection");

function selectMenu() {
	console.log("selectMenu");
	selectBtn.style.display = "none";
	cancelSelectBtn.style.display = "block";
	selectInfo.style.display = "block";
	saveSelection.style.display = "block";
	deleteSelection.style.display = "block";
	slcAllSelection.style.display = "block";
	slcAllSelection.addEventListener("click", function () {
		let fileLinks = document.querySelectorAll(".fileLink:not(.hidden)");
		fileLinks.forEach(function (fileLink, index) {
			setTimeout(() => {
				fileLink.classList.add("selectedOne");
				setTimeout(() => {
					fileLink.classList.add("selectedTwo");
				}, 200);
			}, index * 25);
		});
	});
	let fileLinks = document.querySelectorAll(".fileLink");
	fileLinks.forEach(function (fileLink) {
		fileLink.classList.add("selecting");
	});

	console.log("selectMenu");

	fileLinks.forEach(function (fileLink) {
		fileLink.addEventListener("click", function () {
			fileLink.classList.toggle("selectedOne");
			setTimeout(() => {
				fileLink.classList.toggle("selectedTwo");
			}, 500);
		});
	});
	// selected files have class (.selectedOne and) .selectedTwo. -> actions
}