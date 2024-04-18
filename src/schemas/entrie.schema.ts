import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EntrieDocument = HydratedDocument<Entrie>;

interface Set {
    weigth: Number[];
    reps: Number[];
}

@Schema()
export class Entrie {
    @Prop()
    name: string;
    @Prop()
    date: Date
    @Prop()
    sets: Set[];
}

export const EntrieSchema = SchemaFactory.createForClass(Entrie);

