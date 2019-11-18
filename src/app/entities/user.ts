export class User {
    uid: string;
    name: string;
    email: string;
    profileUID: string;
    photo: string;
    confirmed: boolean;
}

export class Profile {
    uid: string;
    description: string;
    isAdmin: boolean;
    date: number;
}