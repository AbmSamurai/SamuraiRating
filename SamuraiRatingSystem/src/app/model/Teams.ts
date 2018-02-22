import { Member } from "./Member";

export class Team{
    Members: Array<Member> = new Array<Member>();
    Name: string;
    Picture: string;
    Pin: string;
    Rating: number;

    constructor(){}
}