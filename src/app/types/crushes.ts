export type crushData = {
    name: string, 
    id: string,
    standing: number,
    picture?: string,
    status: string,
    personalRanking: number,
    description: string,
    updates: updates[],
    type: CrushType,
}

export enum CrushType {
    Graveyard = "Graveyard",
    Benched = "Benched", 
    Starters = "Starters"
}

export type updates = {
    date: string,
    text: string,
    id: string,
    comments: comments[]
}

export type comments = {
    commentor: string,
    id: string,
    text: string,
    date: string,
}
