import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.siam.aora',
    projectId: '67abb647002a2eaf2e46',
    databasedId: '67abba0300139946805e',
    userCollectionId: '67abba2a0021869ba090',
    videoCollectionId: '67abba7400308de463e6',
    storageId: '67abbeb600187becb34d',

}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

// ----------------- end client ---------------------

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async(email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databasedId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;

          
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
    // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    //     .then(function (response) {
    //         console.log(response);
    //     }, function (error) {
    //         console.log(error);
    //     });
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
