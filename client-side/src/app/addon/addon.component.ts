import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from "@pepperi-addons/ngx-lib";
import { TranslateService } from "@ngx-translate/core";

import { AddonService } from "./addon.service";
import { QuestService } from "./quest.service";

@Component({
  selector: "addon-module",
  templateUrl: "./addon.component.html",
  styleUrls: ["./addon.component.scss"],
})
export class AddonComponent implements OnInit {
  @Input() hostObject: any;

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  screenSize: PepScreenSizeType;

  public progressSpinner_1 = "0";
  public progressSpinner_2 = "0";
  public progressSpinner_3 = "0";
  public progressSpinner_4 = "0";
  public progressSpinner_5 = "0";
  public progressSpinner_6 = "0";

  public description_1 = "";
  public description_2 = "";
  public description_3 = "";
  public description_4 = "";
  public description_5 = "";
  public description_6 = "";

  public center_card_img_1 =
    "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_2 =
    "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_3 =
    "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_4 =
    "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_5 =
    "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_6 =
    "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";

  public star_icon_11 = "lightgray";
  public star_icon_12 = "lightgray";
  public star_icon_13 = "lightgray";
  public star_icon_14 = "lightgray";
  public star_icon_15 = "lightgray";

  public star_icon_21 = "lightgray";
  public star_icon_22 = "lightgray";
  public star_icon_23 = "lightgray";
  public star_icon_24 = "lightgray";
  public star_icon_25 = "lightgray";

  public star_icon_31 = "lightgray";
  public star_icon_32 = "lightgray";
  public star_icon_33 = "lightgray";
  public star_icon_34 = "lightgray";
  public star_icon_35 = "lightgray";

  public star_icon_41 = "lightgray";
  public star_icon_42 = "lightgray";
  public star_icon_43 = "lightgray";
  public star_icon_44 = "lightgray";
  public star_icon_45 = "lightgray";

  public star_icon_51 = "lightgray";
  public star_icon_52 = "lightgray";
  public star_icon_53 = "lightgray";
  public star_icon_54 = "lightgray";
  public star_icon_55 = "lightgray";

  public star_icon_61 = "lightgray";
  public star_icon_62 = "lightgray";
  public star_icon_63 = "lightgray";
  public star_icon_64 = "lightgray";
  public star_icon_65 = "lightgray";

  constructor(
    public addonService: AddonService,
    public layoutService: PepLayoutService,
    public translate: TranslateService
  ) {
    this.layoutService.onResize$.subscribe((size) => {
      this.screenSize = size;
    });
  }

  async ngOnInit() {
    updateUI(this.addonService, this);
  }

  openDialog() {}
}

const updateUI = (
  addonService: AddonService,
  addonComponent: AddonComponent
) => {
  const questService = new QuestService(addonService, addonComponent);
  questService.updateQuests();
  setInterval(() => {
    questService.updateQuests();
  }, 3000);
};
