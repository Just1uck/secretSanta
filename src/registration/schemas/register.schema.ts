import { Schema, Prop, SchemaFactory  } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type RegisterDocument = HydratedDocument<Register>;

@Schema()
export class Register {
  @Prop({required:true})
  email: string
  @Prop({required:true})
  password: string
  @Prop({required:true})
  firstname: string
  @Prop({required:true})
  secondname: string
  @Prop({required:true})
  role: string
  @Prop({required:true})
  wishList:[]
  @Prop({required:true})
  notificationToken: string
}

export const RegisterSchema = SchemaFactory.createForClass(Register)