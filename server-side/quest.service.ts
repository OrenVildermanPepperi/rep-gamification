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

  /**
   * This function return only transaction_lines of non hidden transactions
   * @param agentID
   * @returns
   */
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
    return this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table("Quests")
      .upsert(quest);
  }

  /**
   * Can be use with get to get all quests and with body to update any quest
   * @param questArr
   * @returns all the quests in array
   */
  async updateQuest(questArr: Quest[]) {
    if (questArr) {
      await this.papiClient.post(
        `/addons/data/batch/${this.client.AddonUUID}/Quests`,
        { Objects: questArr }
      );
    }
    return await this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table("Quests")
      .find();
  }

  /**
   * uses a Quest key to hide quest in the schema
   * @param questArr
   * @returns the hidden quest object
   */
  async hideQuest(questUUID: string) {
    return await this.papiClient.post(
      `/addons/data/${this.client.AddonUUID}/Quests`,
      {
        Key: questUUID,
        Hidden: true,
      }
    );
  }

  /**
   * uses a Quest key to find and restore quest in the schema
   * @param questUUID
   * @returns the unhidden quest object or false
   */
  async restoreQuest(questUUID: string) {
    const questToRestore = await this.papiClient.get(
      `/addons/data/${this.client.AddonUUID}/Quests/${questUUID}`
    );

    if (questToRestore) {
      questToRestore.Hidden = false;
      return await this.papiClient.post(
        `/addons/data/${this.client.AddonUUID}/Quests`,
        questToRestore
      );
    } else {
      {
        return { RestoreResponse: `Quest with UUID: ${questUUID}, not found` };
      }
    }
  }

  /**
   * Can be use with get to get all quests and with body to update any quest
   * @returns all the quests in array
   */
  async getAllQuests() {
    return await this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table("Quests")
      .find({ include_deleted: true });
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
    return response;
  }

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
