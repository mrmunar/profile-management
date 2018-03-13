export class User {
    name: {
        title: string, 
        first: string,
        last: string
    };
    location: {
        street: string,
        city: string,
        state: string,
        postcode: number
    };
    email: string;
    username: string;
    dob: string;
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    };
    status: string;
}

