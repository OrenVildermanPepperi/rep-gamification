import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
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

  public star_icon_11 = "#d6d1d1e0";
  public star_icon_12 = "#d6d1d1e0";
  public star_icon_13 = "#d6d1d1e0";
  public star_icon_14 = "#d6d1d1e0";
  public star_icon_15 = "#d6d1d1e0";

  public star_icon_21 = "#d6d1d1e0";
  public star_icon_22 = "#d6d1d1e0";
  public star_icon_23 = "#d6d1d1e0";
  public star_icon_24 = "#d6d1d1e0";
  public star_icon_25 = "#d6d1d1e0";

  public star_icon_31 = "#d6d1d1e0";
  public star_icon_32 = "#d6d1d1e0";
  public star_icon_33 = "#d6d1d1e0";
  public star_icon_34 = "#d6d1d1e0";
  public star_icon_35 = "#d6d1d1e0";

  public star_icon_41 = "#d6d1d1e0";
  public star_icon_42 = "#d6d1d1e0";
  public star_icon_43 = "#d6d1d1e0";
  public star_icon_44 = "#d6d1d1e0";
  public star_icon_45 = "#d6d1d1e0";

  public star_icon_51 = "#d6d1d1e0";
  public star_icon_52 = "#d6d1d1e0";
  public star_icon_53 = "#d6d1d1e0";
  public star_icon_54 = "#d6d1d1e0";
  public star_icon_55 = "#d6d1d1e0";

  public star_icon_61 = "#d6d1d1e0";
  public star_icon_62 = "#d6d1d1e0";
  public star_icon_63 = "#d6d1d1e0";
  public star_icon_64 = "#d6d1d1e0";
  public star_icon_65 = "#d6d1d1e0";

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
