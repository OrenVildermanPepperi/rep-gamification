import { Injectable } from "@angular/core";
import { AddonService } from "./addon.service";
import { AddonComponent } from "./addon.component";

@Injectable({
  providedIn: "root",
})
export class QuestService {
  addonService: AddonService;
  addonComponent: AddonComponent;

  constructor(addonService: AddonService, addonComponent: AddonComponent) {
    this.addonService = addonService;
    this.addonComponent = addonComponent;
  }

  async updateQuests() {
    const questResponse: any = await this.addonService.get(
      "/addons/api/040e9638-d148-4e8a-a872-29afd07f3733/quest/progress"
    );
    console.log(questResponse);

    let targetArr = [];
    for (let j = 0; j < questResponse.length; j++) {
      const thatQuestResponse = questResponse[j];
      for (let i = 0; i < thatQuestResponse.Levels.length; i++) {
        if (!thatQuestResponse.Levels[i].status) {
          targetArr.push(thatQuestResponse.Levels[i].target);
          break;
        } else if (i == thatQuestResponse.Levels.length - 1) {
          targetArr.push(-1);
        }
      }
    }
    console.log(targetArr);

    //Update Stars
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 5; i++) {
        this.addonComponent[`star_icon_${j + 1}${i + 1}`] = questResponse[j]
          .Levels[i].status
          ? "darkviolet"
          : "lightgray";
      }
    }

    //Update description, progressSpinner and remove loading image
    for (let i = 0; i < 6; i++) {
      this.addonComponent[`description_${i + 1}`] =
        questResponse[i].Description;
      this.addonComponent[`progressSpinner_${i + 1}`] = String(
        (targetArr[i] == -1
          ? 100
          : 100 * (questResponse[i].Progress / targetArr[i])) | 0
      );
      this.addonComponent[`center_card_img_${i + 1}`] =
        "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";
    }
  }
}
