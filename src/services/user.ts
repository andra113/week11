export async function getAllUsers(db: any) {
    const userCollection = db.collection('users');
    const users = await userCollection.find().toArray();
    return users
}