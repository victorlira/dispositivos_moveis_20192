export class User {
    uid: string;
    name: string;
    email: string;
    profileUID: string;
}

export class Profile {
    uid: string;
    description: string;
    isAdmin: boolean;
    date: number;
}