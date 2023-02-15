import { Body, Controller, Post, Put } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsPostDto } from "./dto/settings-post.dto";
import { SettingsPutDto } from "./dto/settings-put.dto";
import { RegistrationService } from "../registration/registration.service";
import { HolidaysService } from "../holidays/holidays.service";

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly settingsService: SettingsService,
    private readonly holidaysService: HolidaysService
  ) {
  }

  @Post()
  getAvatars(
    @Body() getResInfo:SettingsPostDto
  ):any {
    if (getResInfo.operation === 'avatarsForMan') {
      let avatars = this.settingsService.avatarsForMan()
      return avatars
    } else if (getResInfo.operation === 'avatarsForWomen') {
      let avatars = this.settingsService.avatarsForWomen()
      return avatars
    }
  }

  @Put()
  async updateUser(
    @Body() getResInfo:SettingsPutDto
  ):Promise<any> {
    let req = await this.registrationService.getByIdAndUpdateSettings(getResInfo)
    this.holidaysService.getAll().then((all)=>{
      all.forEach((el:any)=>{
        let idParty
        let indexOfUser
        el.users.forEach((x:any,index)=>{
          if (x.userId === getResInfo.id){
            idParty = el._id
            indexOfUser = index
          }
        })
        if (idParty) {
          this.holidaysService.findAndUpdateUserInHoliday(idParty,indexOfUser,getResInfo)
        }
      })
    })

    return req
  }
}
