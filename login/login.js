if (typeof Appwrite === 'undefined') {
    console.error('Appwrite SDK is not loaded.');
}


const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67571cd7002ca90a77ef'); // Replace with your Appwrite Project ID
        
const account = new Appwrite.Account(client);

async function login() {
    let name = document.getElementById("userName").value + "@giga.drive";
    let password = document.getElementById("password").value;
    console.log(name);
    console.log(password);

    console.log("Logging in...");
    try{
        const session = await account.createEmailPasswordSession(
            name, 
            password
            );
    }
    catch(err){
        account.deleteSessions();
        try{
        const session = await account.createEmailPasswordSession(
            name, 
            password
            );
        }
        catch(err){
            return;
        }
    }

    console.log(account.get());	

    window.location.replace("https://gigadrive.ddns.net/gigadrive");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Enter pressed");
        login();
    }
});

function signup(){
    let l = document.getElementById("1").value;
    let ll = document.getElementById("2").value;
    const promise = account.create(makeid(35), l + '@giga.drive', ll);

    promise.then(function (response) {
        console.log(response); // Success
        document.getElementById("authStatus").style.display = "block";
        document.getElementById("authStatus").style.color = "var(--accent)";
        document.getElementById("authStatus").innerHTML = "redirecting";
    }, function (error) {
        console.log(error); // Failure
        document.getElementById("authStatus").style.display = "block";
        document.getElementById("authStatus").style.color = "red";
        document.getElementById("authStatus").innerHTML = "Try again / Error";
    });
}
//pls add precise feedback: wrong pw/ appwrite error/ gigadrive server error ...
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
