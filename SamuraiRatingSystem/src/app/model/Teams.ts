import { Member } from "./Member";

export class Team{
    Key: string;
    Members: Member[];
    Name: string;
    Picture: string;
    Pin: string;
    Rating: number;

    constructor(key: string, members: any[], name: string, picture: string, pin: string, rating: number){
        this.Key = key;
        this.Members = members;
        this.Name = name;
        this.Picture = picture;
        this.Pin = pin;
        this.Rating = rating;
    }
}