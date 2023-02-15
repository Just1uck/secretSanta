import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HolidaysDocument = HydratedDocument<Holidays>;

@Schema()
export class Holidays {
  @Prop({ required: true })
  isStarted: boolean;
  @Prop({ required: true })
  startUsers: [];
  @Prop({ required: true })
  favorite: [];
  @Prop({ required: true })
  users: [];
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  maxPrice: number;
  @Prop({ required: true })
  base64: string;
  @Prop({ required: true })
  mode: string;
}

export const HolidaysSchema = SchemaFactory.createForClass(Holidays);