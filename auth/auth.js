

let link = window.location.href;
//link = "https://gigadrive.ddns.net/auth?user=Justus&pswd=12345";
let e_user = link.split("?")[1].split("&")[0].split("=")[1];
let e_pswd = link.split("?")[1].split("&")[1].split("=")[1];

let user = CryptoJS.AES.decrypt(e_user, "gaySex69lol_lmao");
let pswd = CryptoJS.AES.decrypt(e_pswd, "gaySex69lol_lmao");
console.log(user.toString(CryptoJS.enc.Utf8));
console.log(pswd.toString(CryptoJS.enc.Utf8));

async function login(){
    const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67571cd7002ca90a77ef'); // Replace with your Appwrite Project ID
        
const account = new Appwrite.Account(client);
    try{
        const session = await account.createEmailPasswordSession(
            user  + "@giga.drive", 
            pswd
            );
    }
    catch(err){
        account.deleteSessions();
        try{
        const session = await account.createEmailPasswordSession(
            user  + "@giga.drive", 
            pswd
            );
        }
        catch(err){
            return;
        }
    }
    
    console.log(account.get());	
    
    window.location.replace("https://gigadrive.ddns.net/gigadrive");
}

login();