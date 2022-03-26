import QuestService from "./quest.service";
import { Client, Request } from "@pepperi-addons/debug-server";

/**
 * GET function
 * @param client
 * @param request
 * @returns Array of calculated quests progress for rep
 */
export async function progress(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.calcQuestsProgress();
  return res;
}

/**
 * POST function
 * @param client
 * @param request
 * @returns the quest object from ADAL
 */
export async function create(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.createQuest(request.body);
  return res;
}

/**
 * Can be used with get or post, when update the quests, return array with the new quests
 * @param client
 * @param request can contain array of quests
 * @returns array of all the quests
 */
export async function update(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.updateQuest(request.body);
  return res;
}

/**
 * Can be used with get or post, when update the quests, return array with the new quests
 * @param client
 * @param request can contain array of quests
 * @returns array of all the quests
 */
export async function hide(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.hideQuest(request.body.Key);
  return res;
}

/**
 * uses a Quest key to find and restore quest in the schema
 * @param client
 * @param request can contain array of quests
 * @returns the unhidden quest object or false
 */
export async function restore(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.restoreQuest(request.body.Key);
  return res;
}

/**
 * Can be used to find hidden quests
 * @param client
 * @param request can contain array of quests
 * @returns array of all the quests include hidden
 */
export async function all(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.getAllQuests();
  return res;
}
