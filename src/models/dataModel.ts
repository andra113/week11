interface UserModel {
    username: string,
    password: string,
    role: string
}

interface SchoolModel {
    name: string,
    location: string,
    description: string,
}

export {UserModel, SchoolModel}