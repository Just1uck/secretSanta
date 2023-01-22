import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Holidays, HolidaysDocument } from "./schemas/holidays.schema";
import { HolidaysDto } from "./dto/holidays.dto";

@Injectable()
export class HolidaysService {

  constructor(@InjectModel(Holidays.name) private holidayModule: Model<HolidaysDocument>) {
  }

  async getAll():Promise<Holidays[]>{
    console.log('GetRequestHoidays')
    return this.holidayModule.find().exec()
  }

  async create(body:HolidaysDto):Promise<any>{
    delete body.operation
    const newHoliday = new this.holidayModule(body)
    try {
      await newHoliday.save()
      return newHoliday
    } catch (e) {
      console.log(e)
      return new HttpException('All fields required', HttpStatus.FORBIDDEN)
    }
  }

  async start(body:HolidaysDto):Promise<any>{
    delete body.operation
    const oldArray:any = [...body.users]
    const newArray = []
    let oldArrayLength:number = oldArray.length
    if (oldArrayLength>0){
      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const oldArrayLengthHalf = oldArrayLength/2
      for (let i=0;i<oldArrayLengthHalf;i++){
        const index = getRandomIntInclusive(1,oldArrayLength-1)
        newArray.push([oldArray[0].userId,oldArray[index].userId])
        oldArray.splice(0,1)
        oldArray.splice(index-1,1)
        oldArrayLength=oldArrayLength-2
      }
      body.startUsers = newArray
      body.isStarted = true
      const updated = await this.holidayModule.findByIdAndUpdate(body.partyId,body,{new:true})
      return  updated
    } else {
      return new HttpException('Something went wrong', HttpStatus.FORBIDDEN)
    }
  }

  async update(body:any):Promise<any> {
    if (body.operation === 'add') {
      const holiday = await this.holidayModule.findById(body.holidayId)
      const updated = await this.holidayModule.findByIdAndUpdate(body.holidayId,{users: [...holiday.users, {userId:body.userId,firstname:body.firstname,secondname:body.secondname,notificationToken:body.notificationToken}]})
      return updated
    } else if (body.operation === 'delete') {
      const holiday = await this.holidayModule.findById(body.holidayId)
      let users = holiday.users
      const updated = await this.holidayModule.findByIdAndUpdate(body.holidayId,{users:[...users.filter(item => item['userId'] !== body.userId)]})
      return updated
    } else if (body.operation === 'remove') {
      const remove = await this.holidayModule.findByIdAndRemove(body.holidayId)
      return remove
    } else {
      return
    }
  }
}
