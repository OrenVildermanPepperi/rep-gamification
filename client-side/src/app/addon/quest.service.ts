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
      "/addons/api/040e9638-d148-4e8a-a872-29afd07f3733/quest/quests"
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

    this.addonComponent.description_1 = questResponse[0].Description;
    this.addonComponent.description_2 = questResponse[1].Description;
    this.addonComponent.description_3 = questResponse[2].Description;
    this.addonComponent.description_4 = questResponse[3].Description;
    this.addonComponent.description_5 = questResponse[4].Description;
    this.addonComponent.description_6 = questResponse[5].Description;

    console.log(targetArr);
    this.addonComponent.progressSpinner_1 = String(
      parseInt(
        String(
          targetArr[0] == -1
            ? 100
            : 100 * (questResponse[0].Progress / targetArr[0])
        )
      )
    );
    this.addonComponent.progressSpinner_2 = String(
      parseInt(
        String(
          targetArr[1] == -1
            ? 100
            : 100 * (questResponse[1].Progress / targetArr[1])
        )
      )
    );
    this.addonComponent.progressSpinner_3 = String(
      parseInt(
        String(
          targetArr[2] == -1
            ? 100
            : 100 * (questResponse[2].Progress / targetArr[2])
        )
      )
    );
    this.addonComponent.progressSpinner_4 = String(
      parseInt(
        String(
          targetArr[3] == -1
            ? 100
            : 100 * (questResponse[3].Progress / targetArr[3])
        )
      )
    );
    this.addonComponent.progressSpinner_5 = String(
      parseInt(
        String(
          targetArr[4] == -1
            ? 100
            : 100 * (questResponse[4].Progress / targetArr[4])
        )
      )
    );
    this.addonComponent.progressSpinner_6 = String(
      parseInt(
        String(
          targetArr[5] == -1
            ? 100
            : 100 * (questResponse[5].Progress / targetArr[5])
        )
      )
    );

    //  this.addonComponent.center_card_img_1 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://image.shutterstock.com/image-vector/money-bag-flat-illustration-dollars-260nw-1927192892.jpg)";
    //  this.addonComponent.center_card_img_2 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/3/68046033_1_200x200.jpg)";
    //  this.addonComponent.center_card_img_3 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/1/68046081_1_200x200.jpg)";
    //  this.addonComponent.center_card_img_4 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/1/68046031_1_200x200.jpg)";
    //  this.addonComponent.center_card_img_5 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/2/68046082_1_200x200.jpg)";
    //  this.addonComponent.center_card_img_6 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/9/68046049_1_200x200.jpg)";

    this.addonComponent.center_card_img_1 =
      "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";
    this.addonComponent.center_card_img_2 =
      "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";
    this.addonComponent.center_card_img_3 =
      "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";
    this.addonComponent.center_card_img_4 =
      "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";
    this.addonComponent.center_card_img_5 =
      "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";
    this.addonComponent.center_card_img_6 =
      "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))";

    this.addonComponent.star_icon_11 = questResponse[0].Levels[0].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_12 = questResponse[0].Levels[1].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_13 = questResponse[0].Levels[2].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_14 = questResponse[0].Levels[3].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_15 = questResponse[0].Levels[4].status
      ? "darkviolet"
      : "lightgray";

    this.addonComponent.star_icon_21 = questResponse[1].Levels[0].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_22 = questResponse[1].Levels[1].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_23 = questResponse[1].Levels[2].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_24 = questResponse[1].Levels[3].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_25 = questResponse[1].Levels[4].status
      ? "darkviolet"
      : "lightgray";

    this.addonComponent.star_icon_31 = questResponse[2].Levels[0].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_32 = questResponse[2].Levels[1].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_33 = questResponse[2].Levels[2].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_34 = questResponse[2].Levels[3].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_35 = questResponse[2].Levels[4].status
      ? "darkviolet"
      : "lightgray";

    this.addonComponent.star_icon_41 = questResponse[3].Levels[0].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_42 = questResponse[3].Levels[1].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_43 = questResponse[3].Levels[2].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_44 = questResponse[3].Levels[3].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_45 = questResponse[3].Levels[4].status
      ? "darkviolet"
      : "lightgray";

    this.addonComponent.star_icon_51 = questResponse[4].Levels[0].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_52 = questResponse[4].Levels[1].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_53 = questResponse[4].Levels[2].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_54 = questResponse[4].Levels[3].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_55 = questResponse[4].Levels[4].status
      ? "darkviolet"
      : "lightgray";

    this.addonComponent.star_icon_61 = questResponse[5].Levels[0].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_62 = questResponse[5].Levels[1].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_63 = questResponse[5].Levels[2].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_64 = questResponse[5].Levels[3].status
      ? "darkviolet"
      : "lightgray";
    this.addonComponent.star_icon_65 = questResponse[5].Levels[4].status
      ? "darkviolet"
      : "lightgray";
  }
}
