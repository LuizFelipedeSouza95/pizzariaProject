export class AuthtokenError extends Error{
    constructor(){
        super('Error with authenticate token.')
    }
}