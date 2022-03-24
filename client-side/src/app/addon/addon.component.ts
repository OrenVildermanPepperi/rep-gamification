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

  public center_card_img_1 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_2 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_3 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_4 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_5 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  public center_card_img_6 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://ak.picdn.net/shutterstock/videos/1033397360/thumb/12.jpg?ip=x480)";
  
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
    const oren = await this.addonService.get(
      "/addons/api/040e9638-d148-4e8a-a872-29afd07f3733/api/quests"
    );
    console.log(oren);
     this.progressSpinner_1 = "20";
     this.progressSpinner_2 = "40";
     this.progressSpinner_3 = "50";
     this.progressSpinner_4 = "60";
     this.progressSpinner_5 = "70";
     this.progressSpinner_6 = "80";

     this.center_card_img_1 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://image.shutterstock.com/image-vector/money-bag-flat-illustration-dollars-260nw-1927192892.jpg)";
     this.center_card_img_2 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/3/68046033_1_200x200.jpg)";
     this.center_card_img_3 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/1/68046081_1_200x200.jpg)";
     this.center_card_img_4 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/1/68046031_1_200x200.jpg)";
     this.center_card_img_5 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/2/68046082_1_200x200.jpg)";
     this.center_card_img_6 = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(https://cdn.pepperi.com/WrntyImages/30014373/PortfolioItems/9/68046049_1_200x200.jpg)";

    debugger;
  }

  openDialog() {}
}
