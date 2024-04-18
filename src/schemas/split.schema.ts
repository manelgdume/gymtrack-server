import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SplitDocument = HydratedDocument<Split>;

interface Workout {
  name: string;
  exercises: string[];
}

@Schema()
export class Split {
  @Prop()
  name: string;

  @Prop()
  description: string;
  @Prop()
  workouts: Workout[];
  @Prop()
  days: string[];
}

export const SplitSchema = SchemaFactory.createForClass(Split);
