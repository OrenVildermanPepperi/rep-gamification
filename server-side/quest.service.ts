import { PapiClient } from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";
import { v4 as uuid } from "uuid";
import { Quest } from "./entities";
import jwtDecode from "jwt-decode";

class QuestService {
  papiClient: PapiClient;

  constructor(private client: Client) {
    this.papiClient = new PapiClient({
      baseURL: client.BaseURL,
      token: client.OAuthAccessToken,
      addonUUID: client.AddonUUID,
      addonSecretKey: client.AddonSecretKey,
      actionUUID: client.AddonUUID,
    });
  }

  async getTransactionLinesByAgent(agentID) {
    return await this.papiClient.get(
      `/transaction_lines?where=Transaction.Agent.InternalID=${agentID} AND Transaction.Hidden=false`
    );
  }

  async getTransactionsByAgent(agentID) {
    return await this.papiClient.get(
      `/transactions?where=Agent.InternalID=${agentID}`
    );
  }

  createQuest(quest: Quest) {
    quest.Key = uuid();
    this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table("Quests")
      .upsert(quest);
  }

  async calcQuestsProgress() {
    const currUserId = (<any>jwtDecode(this.client.OAuthAccessToken))[
      "pepperi.id"
    ];
    const quests = await this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table("Quests")
      .find();
    var response: Array<any> = [];
    for (var q of quests) {
      const res = await this.calculate(q as Quest, currUserId);
      response.push(res);
    }
    if (false) {
      return [
        {
          Name: "",
          Des: "",
          Type: "Quanity",
          Object: "Order",
          Levels: [
            { 100: true },
            { 200: true },
            { 300: 270 },
            { 400: false },
            { 500: false },
          ],
          rewards: [5, 10, 20, 40, 50],
        },
        {
          Name: "",
          Des: "",
          Type: "Price",
          Object: "Order",
          Levels: [
            { 100: true },
            { 200: true },
            { 300: 270 },
            { 400: false },
            { 500: false },
          ],
          rewards: [5, 10, 20, 40, 50],
        },
        {
          Name: "",
          Des: "",
          Type: "Quanity",
          Object: "ItemID",
          Levels: [
            { 100: true },
            { 200: true },
            { 300: 270 },
            { 400: false },
            { 500: false },
          ],
          rewards: [5, 10, 20, 40, 50],
        },
        {
          Name: "",
          Des: "",
          Type: "Quanity",
          Object: "ItemID",
          Levels: [
            { 100: true },
            { 200: true },
            { 300: 270 },
            { 400: false },
            { 500: false },
          ],
          rewards: [5, 10, 20, 40, 50],
        },
        {
          Name: "",
          Des: "",
          Type: "Price",
          Object: "ItemID",
          Levels: [
            { 100: true },
            { 200: true },
            { 300: 270 },
            { 400: false },
            { 500: false },
          ],
          rewards: [5, 10, 20, 40, 50],
        },
        {
          Name: "",
          Des: "",
          Type: "Price",
          Object: "ItemID",
          Levels: [
            { 100: true },
            { 200: true },
            { 300: 270 },
            { 400: false },
            { 500: false },
          ],
          rewards: [5, 10, 20, 40, 50],
        },
      ];
    } else {
      return response;
    }
  }
  // body {
  // Quest: {
  // Name: "",
  // Des: "",
  // Type: Quanity/Price,
  // Object: Order/ItemID
  // Levels: [100: true,200: true, 300: 270, 400: false, 500: false],
  // rewards: [5,10,20,40,50]}

  async calculate(quest: Quest, agentID) {
    var levels = quest.Levels;
    var progress = 0;
    if (quest.Type == "Quantity" && quest.Object == "ItemID") {
      var transLines = await this.getTransactionLinesByAgent(agentID);
      transLines = transLines.filter(
        (line) => line["Item"]["Data"]["InternalID"] == quest.ItemID
      );
      var quantityArray = transLines.map((line) => line["UnitsQuantity"]);
      for (var q of quantityArray) {
        progress += q;
      }
      for (var level of levels) {
        level.status = progress >= level.target;
      }
      // need to calculete the relevant stages of the quest
      // need to set true in the array completed levels
      // need to set false in the array for unfinished levels
      // need to set current level to double
    }
    if (quest.Type == "Price" && quest.Object == "ItemID") {
      var transLines = await this.getTransactionLinesByAgent(agentID);
      transLines = transLines.filter(
        (line) => line["Item"]["Data"]["InternalID"] == quest.ItemID
      );
      var totalPricesArray = transLines.map(
        (line) => line["TotalUnitsPriceAfterDiscount"]
      );
      for (var tp of totalPricesArray) {
        progress += tp;
      }
      for (var level of levels) {
        level.status = progress >= level.target;
      }
    }
    if (quest.Type == "Quantity" && quest.Object == "Order") {
      var orders = await this.getTransactionsByAgent(agentID);
      progress = orders.length;
      for (var level of levels) {
        level.status = progress >= level.target;
      }
    }
    if (quest.Type == "Price" && quest.Object == "Order") {
      var orders = await this.getTransactionsByAgent(agentID);
      var totalPricesArray = orders.map((o) => o["SubTotalAfterItemsDiscount"]);
      for (var tp of totalPricesArray) {
        progress += tp;
      }
      for (var level of levels) {
        level.status = progress >= level.target;
      }
    }

    let response = {
      Name: quest.Name,
      Description: quest.Description,
      Type: quest.Type,
      Object: quest.Object,
      Levels: levels,
      Rewards: quest.rewards,
      Progress: progress,
    };
    return response;
  }
}

export default QuestService;
