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

interface ReviewModel {
    reputation: number,
    location: number,
    facilities: number
}

export {UserModel, SchoolModel, ReviewModel}