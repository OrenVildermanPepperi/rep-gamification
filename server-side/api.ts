import MyService from './my.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function getQuests(client: Client, request: Request) {
    const service = new MyService(client)
    const res = await service.calcQuestsProgress()
    return res
};

export async function createQuest(client: Client, request: Request) {
    const service = new MyService(client)
    const res = await service.createQuest(request.body)
    return res
};






