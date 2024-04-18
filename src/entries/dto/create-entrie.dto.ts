export class CreateEntrieDto {
    name: string;
    sets: Set[]
    date: Date
}
interface Set {
    weigth: Number[];
    reps: Number[];
}
