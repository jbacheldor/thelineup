enum Levels {
    Recurse = "Recurse",
    Family = "Family",
    Siblings = "Siblings",
    Friends = "Friends",
    Besties = "Besties"
}

type loginData = {
    username: string,
    password: string
}

type loginResponse = {
    name: string,
    id: string,
    accessLevel: Levels
}