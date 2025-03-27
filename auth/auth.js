const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };
  
  const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  };

//let link = window.location.href;
//let e_user = link.split("?")[1].split("&")[0].split("=")[1];
//let e_pswd = link.split("?")[1].split("&")[1].split("=")[1];




let user = decrypt(e_user);
let pswd = decrypt(e_pswd);

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