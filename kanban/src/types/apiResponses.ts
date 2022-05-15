export interface IUser {
    username?: string,
    email?: string,
    password?: string,
    token?: string
}

export interface ICard {
    id?: number,
    row: string,
    text: string,
    seq_num?: number
}
