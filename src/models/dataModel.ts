interface UserModel {
    username: string,
    password: string,
    role: string
}

interface SchoolModel {
    name: string,
    location: string,
    description: string,
    website: string
}

export {UserModel, SchoolModel}