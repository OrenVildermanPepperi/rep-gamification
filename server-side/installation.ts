/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from "@pepperi-addons/debug-server";
import QuestService from "./quest.service";

export async function install(client: Client, request: Request): Promise<any> {
  // For page block template uncomment this.
  // const res = await createPageBlockRelation(client);
  // return res;
  const service = new QuestService(client);
  await service.papiClient.addons.data.schemes.post({
    Name: "Quests",
    Type: "data",
  });

  return { success: true, resultObject: {} };
}

export async function uninstall(
  client: Client,
  request: Request
): Promise<any> {
  try {
    const service = new QuestService(client);
    await service.papiClient.post(`/addons/data/schemes/Quests/purge`);
    return { success: true, resultObject: {} };
  } catch (err) {
    console.log("Failed to uninstall quests addon", err);
    return err;
  }
}

export async function upgrade(client: Client, request: Request): Promise<any> {
  return { success: true, resultObject: {} };
}

export async function downgrade(
  client: Client,
  request: Request
): Promise<any> {
  return { success: true, resultObject: {} };
}
