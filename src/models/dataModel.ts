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
    schoolId: string,
    userId: string
    rating: {
        reputation: number,
        location: number,
        facilities: number
    }
    comment: string
}

export {UserModel, SchoolModel, ReviewModel}