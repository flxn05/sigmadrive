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

check();

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

	let files = await list_files("/" + userr);
	//console.log(files);
	files = JSON.parse(files);
	/*files = [
		"/user/purple/file1.txt",
		"/user/red/file2.txt",
		"/user/blue/file3.txt",
		"/user/green/file4.txt",
		"/user/yellow/file5.txt",
		"/user/white/file6.txt"
	];*/
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
		child.classList.remove("hidden")});
		const elements = document.querySelectorAll('.filesFilter');
    elements.forEach(function(element) {element.classList.remove('activeFilter');
    element.classList.remove('activeFilter');});
	
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

chunkPerc = 0;
let bar = document.getElementById("statusBarUpload" + chunkPerc);

function updateSentChunks(){
	bar = document.getElementById("statusBarUpload" + chunkPerc);
	chunkPerc = _chunks_send / _chunks_total_send;
	chunckPerc = Math.round(_chunks_send / _chunks_total_send * 10) / 10;
	chunkPerc = round(round(_chunks_send / _chunks_total_send * 10) / 10 * 10 , 0)
	bar.id = "statusBarUpload" + chunkPerc;
	console.log(chunkPerc);
}

function getLink(pswd){
	
	var e_user = CryptoJS.AES.encrypt(userr, "gaySex69lol_lmao");
	var e_pw = CryptoJS.AES.encrypt(pswd, "gaySex69lol_lmao");
	var link = "https://gigadrive.ddns.net/auth?user=" + e_user + "&pswd=" + e_pw;
	console.log(link);
}



