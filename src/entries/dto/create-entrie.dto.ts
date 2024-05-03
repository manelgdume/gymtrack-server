export class CreateEntrieDto {
    name: string
    sets: Set[]
    date: Date
    email: string
}
interface Set {
    weigth: Number[];
    reps: Number[];
}
