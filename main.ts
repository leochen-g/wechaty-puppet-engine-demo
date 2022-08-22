import {log, WechatyBuilder} from "wechaty";
import {PuppetEngine} from "wechaty-puppet-engine";
import {dingDongBot, getMessagePayload, LOGPRE} from "./helper";

const puppet = new PuppetEngine({
    port: "8089",
    httpServer: "http://localhost:8055",
    runLocal: true
})

const bot = WechatyBuilder.build({
    name: "EngineDemo",
    puppet,
})

bot.on("login", (user) => {
        log.info(LOGPRE, `${user} login`);
    })
    .on("message", async (message) => {
        log.info(LOGPRE, `on message: ${message.toString()}`);

        await getMessagePayload(bot, message);

        await dingDongBot(message);
    })
    .on("room-invite", async (roomInvitation) => {
        log.info(LOGPRE, `on room-invite: ${roomInvitation}`);
    })

    .on("room-join", (room, inviteeList, inviter, date) => {
        log.info(LOGPRE, `on room-join, room:${room}, inviteeList:${inviteeList}, inviter:${inviter}, date:${date}`);
    })

    .on("room-leave", (room, leaverList, remover, date) => {
        log.info(LOGPRE, `on room-leave, room:${room}, leaverList:${leaverList}, remover:${remover}, date:${date}`);
    })

    .on("room-topic", (room, newTopic, oldTopic, changer, date) => {
        log.info(LOGPRE, `on room-topic, room:${room}, newTopic:${newTopic}, oldTopic:${oldTopic}, changer:${changer}, date:${date}`);
    })

    .on("friendship", (friendship) => {
        log.info(LOGPRE, `on friendship: ${friendship}`);
    })

    .on("error", (error) => {
        log.error(LOGPRE, `on error: ${error}`);
    })
bot.start().then(() => {
    log.info(LOGPRE, "started.");
});
