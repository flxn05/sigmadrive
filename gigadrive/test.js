if (typeof Appwrite === 'undefined') {
    console.error('Appwrite SDK is not loaded.');
}


const client = new Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67571cd7002ca90a77ef'); // Replace with your Appwrite Project ID
        
const account = new Appwrite.Account(client);

async function login() {
    console.log("Logging in...");
    const session = await account.createEmailPasswordSession(
        "testuser@t.com", 
        "testuser"
        );
}
