import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateRegisterDto } from "./dto/create-register.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Register, RegisterDocument } from "./schemas/register.schema";
import { Model } from "mongoose";

@Injectable()
export class RegistrationService {

  constructor(@InjectModel(Register.name) private registerModule: Model<RegisterDocument>) {
  }

  async getAll(): Promise<Register[]> {
    return this.registerModule.find().exec();
  }

  async getById(id): Promise<any> {
    return this.registerModule.findById(id);
  }

  async getByIdAndUpdate(id, newWishList): Promise<any> {
    return this.registerModule.findByIdAndUpdate(id, { wishList: newWishList }, { new: true });
  }

  async findOne(email) {
    return this.registerModule.findOne(email);
  }

  async create(createDto: CreateRegisterDto): Promise<any> {
    const allUsers = await this.registerModule.find().exec();
    let ifRepeat = false;
    allUsers.map((el) => {
      if (el.email === createDto.email) {
        ifRepeat = true;
      }
    });
    if (ifRepeat) {
      return "Email has been registered";
    } else {
      createDto.wishList = [];
      createDto.role = "user";
      const newUser = new this.registerModule(createDto);
      try {
        await newUser.save();
        return newUser;
      } catch (e) {
        return false;
      }
    }
  }
}
