import { AddonDataScheme } from "@pepperi-addons/papi-sdk";

export interface Quest {
  Name: string;
  Description: string;
  Type: string;
  Object: string;
  Levels: Array<{ target; status }>;
  rewards: Array<number>;
  Image?: string,
  ItemID?: string,
  Key?: string;
}
