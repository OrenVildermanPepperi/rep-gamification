import QuestService from "./quest.service";
import { Client, Request } from "@pepperi-addons/debug-server";

/**
 * GET function
 * @param client
 * @param request
 * @returns Array of Quests
 */
export async function quests(client: Client, request: Request) {
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
export async function quest(client: Client, request: Request) {
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
export async function update_quest(client: Client, request: Request) {
  const service = new QuestService(client);
  const res = await service.updateQuest(request.body);
  return res;
}
