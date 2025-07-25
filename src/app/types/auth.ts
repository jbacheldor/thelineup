enum Levels {
    Recurse = "Recurse",
    Family = "Family",
    Siblings = "Siblings",
    Friends = "Friends",
    Besties = "Besties"
}

export type loginData = {
    username: string,
    password: string
}

export type loginResponse = {
    name: string,
    id: string,
    accessLevel: Levels
}