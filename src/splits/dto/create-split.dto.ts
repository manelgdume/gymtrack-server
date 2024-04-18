export class CreateSplitDto {
    name: string;
    description: string;
    workouts: Workout[]
    days: string[]
}
interface Workout {
    name: string;
    exercises: string[];
  }
