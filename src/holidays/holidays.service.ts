import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Holidays, HolidaysDocument } from "./schemas/holidays.schema";
import { HolidaysDto } from "./dto/holidays.dto";

@Injectable()
export class HolidaysService {

  constructor(@InjectModel(Holidays.name) private holidayModule: Model<HolidaysDocument>) {
  }

  async getAll(): Promise<Holidays[]> {
    console.log("GetRequestHoidays");
    return this.holidayModule.find().exec();
  }

  async create(body: HolidaysDto): Promise<any> {
    delete body.operation;
    const newHoliday = new this.holidayModule(body);
    try {
      await newHoliday.save();
      return newHoliday;
    } catch (e) {
      return new HttpException("All fields required", HttpStatus.FORBIDDEN);
    }
  }

  async start(body: HolidaysDto): Promise<any> {
    delete body.operation;

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    if (body.mode === "default") {
      const oldArray: any = [...body.users];
      const newArray = [];
      let oldArrayLength: number = oldArray.length;
      if (oldArrayLength > 0) {
        const oldArrayLengthHalf = oldArrayLength / 2;
        for (let i = 0; i < oldArrayLengthHalf; i++) {
          const index = getRandomIntInclusive(1, oldArrayLength - 1);
          newArray.push([oldArray[0], oldArray[index]]);
          oldArray.splice(0, 1);
          oldArray.splice(index - 1, 1);
          oldArrayLength = oldArrayLength - 2;
        }
        body.startUsers = newArray;
        body.isStarted = true;
        const updated = await this.holidayModule.findByIdAndUpdate(body.partyId, body, { new: true });
        return updated;
      } else {
        return new HttpException("Something went wrong", HttpStatus.FORBIDDEN);
      }
    } else if (body.mode === "manToWomen" || body.mode === "womenToMan") {
      const oldArray: any = [...body.users];
      const newArray = [];
      let arrayMan = [];
      let arrayWomen = [];
      if (oldArray.filter(x => x.isMan).length > oldArray.filter(x => !x.isMan).length) {
        arrayMan = oldArray.filter(x => x.isMan);
        arrayWomen = oldArray.filter(x => !x.isMan);
      } else {
        arrayMan = oldArray.filter(x => !x.isMan);
        arrayWomen = oldArray.filter(x => x.isMan);
      }
      let number = arrayMan.length / arrayWomen.length;
      number = Math.floor(number);
      arrayWomen.forEach((x, index) => {
        let randomMans = [];
        for (let ii = 0; ii < number; ii++) {
          let numberOfIndex = getRandomIntInclusive(0, arrayMan.length - 1);
          randomMans.push(arrayMan[numberOfIndex]);
          arrayMan.splice(numberOfIndex, 1);
        }
        newArray.push([arrayWomen[index], ...randomMans]);
      });
      arrayMan.forEach((x, index) => {
        newArray[index].push(arrayMan[index]);
      });
      body.startUsers = newArray;
      body.isStarted = true;
      const updated = await this.holidayModule.findByIdAndUpdate(body.partyId, body, { new: true });
      return updated;
    }
  }

  async findAndUpdateUserInHoliday(idParty,indexUser,getNewUser) {
    console.log('work')
    // console.log(idParty)
    // console.log(indexUser)
    // console.log(getNewUser)
    const holiday = await this.holidayModule.findById(idParty);
    let oldUsers:any = holiday.users
    oldUsers[indexUser].firstname = getNewUser.firstname
    oldUsers[indexUser].secondname = getNewUser.secondname
    oldUsers[indexUser].userAvatar = getNewUser.userAvatar
    oldUsers[indexUser].delivery = getNewUser.delivery
    let test = await this.holidayModule.findByIdAndUpdate(idParty,{
      users:oldUsers
    })
  }

  async update(body: any): Promise<any> {
    if (body.operation === "add") {
      const holiday = await this.holidayModule.findById(body.holidayId);
      const updated = await this.holidayModule.findByIdAndUpdate(body.holidayId, {
        users: [...holiday.users, {
          userId: body.userId,
          firstname: body.firstname,
          secondname: body.secondname,
          userAvatar: body.userAvatar,
          isMan: body.isMan,
          notificationToken: body.notificationToken,
          delivery: body.delivery
        }]
      });
      return updated;
    } else if (body.operation === "delete") {
      const holiday = await this.holidayModule.findById(body.holidayId);
      let users = holiday.users;
      const updated = await this.holidayModule.findByIdAndUpdate(body.holidayId, { users: [...users.filter(item => item["userId"] !== body.userId)] });
      return updated;
    } else if (body.operation === "remove") {
      const remove = await this.holidayModule.findByIdAndRemove(body.holidayId);
      return remove;
    } else if (body.operation === "addFavorite") {
      const holiday = await this.holidayModule.findById(body.holidayId);
      const updated = await this.holidayModule.findByIdAndUpdate(body.holidayId, {
        favorite: [...holiday.favorite, body.userId]
      });
      return updated;
    } else if (body.operation === "leaveFavorite") {
      const holiday = await this.holidayModule.findById(body.holidayId);
      let oldArray = holiday.favorite;
      const updated = await this.holidayModule.findByIdAndUpdate(body.holidayId, { favorite: [...oldArray.filter(item => item !== body.userId)] });
      return updated;
    } else {
      return null;
    }
  }
}
