import {log, Message, Wechaty } from "wechaty";
import * as PUPPET from "wechaty-puppet";
import {FileBox} from "file-box";

export const LOGPRE = "[EngineDemo]"

export async function getMessagePayload(bot: Wechaty, message: Message) {
    const contact = message.talker()
    switch (message.type()) {
        case PUPPET.types.Message.Text:
            log.silly(LOGPRE, `get message text: ${message.text()}`);
            await reply(bot, message)
            break;

        case PUPPET.types.Message.Attachment: {
            const attachFile = await message.toFileBox();

            const dataBuffer = await attachFile.toBuffer();

            log.info(LOGPRE, `get message audio or attach: ${dataBuffer.length}`);

            break;
        }

        case PUPPET.types.Message.Video: {
            const videoFile = await message.toFileBox();

            const videoData = await videoFile.toBuffer();

            log.info(LOGPRE, `get message video: ${videoData.length}`);

            break;
        }

        case PUPPET.types.Message.Emoticon: {
            log.info(LOGPRE, `get message emotion json`);
            break;
        }

        case PUPPET.types.Message.Image: {
            const videoFile = await message.toFileBox();

            const videoData = await videoFile.toBuffer();

            log.info(LOGPRE, `get message video: ${videoData.length}`);


            break;
        }

        case PUPPET.types.Message.Url: {
            const urlLink = await message.toUrlLink();
            log.info(LOGPRE, `get message url: ${JSON.stringify(urlLink)}`);
            break;
        }

        case PUPPET.types.Message.MiniProgram: {
            const miniProgram = await message.toMiniProgram();

            log.info(LOGPRE, `MiniProgramPayload: ${JSON.stringify(miniProgram)}`);

            break;
        }
    }
}

export async function dingDongBot(message: Message) {
    if (message.to()?.self() && message.text().indexOf("ding") !== -1) {
        await message.talker().say(message.text().replace("ding", "dong"));
    }
}

export async function reply(bot:Wechaty, msg:Message) {
    const contact = msg.talker() // ???????????????
    const room = msg.room() // ??????????????????
    if (msg.text() === '??????') {
        const file = FileBox.fromUrl('https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_WechatIMG3550.jpeg')
        if (room) {
            await room.say(file)
        } else {
            await contact.say(file)
        }
    } else if (msg.text() === '??????') {
        await contact.say('??????')
    } else if (msg.text() === '??????') {
        const file = FileBox.fromUrl('https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_Test file.docx')
        if (room) {
            await room.say(file)
        }else {
            await contact.say(file)
        }
    } else if (msg.text() === 'h5') {
        const urlCard = new bot.UrlLink({
            title: 'Hello World! ???????????????',
            description: 'This is description??????????????????',
            thumbnailUrl: 'https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_sh.jpeg',
            url: 'http://wechat.aibotk.com/material/file',
        })
        if (room) {
            await room.say(urlCard)
        } else {
            await contact.say(urlCard)
        }
    } else if (msg.text() === '?????????') {
        const mini = new bot.MiniProgram({
            description: '????????????',
            title: '????????????',
            pagePath: 'pages/index/index2.html?showCarKnowledge=false&source=xcx_sy2021',
            thumbUrl: 'https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_meiri.jpeg',
            username: 'gh_b86a530798ae',
        })
        if (room) {
            await room.say(mini)
        } else {
            await contact.say(mini)
        }
    } else if (msg.text() === '??????') {
        const music = await bot.Post.builder()
            .add('music')
            .add('???????????????????????????????????????')
            .add('?????????')
            .add('wx8dd6ecd81906fd84') // ?????? wx79f2c4418704b4f8???????????? wx8dd6ecd81906fd84???QQ?????? wx5aa333606550dfd5
            .add('http://m801.music.126.net/20220822163020/29adb108688789c86ed2c4996763246f/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/15028842484/ecd5/103e/abd3/e1320265865209265061abed25a62e7e.mp3')
            .add('http://m801.music.126.net/20220822163020/29adb108688789c86ed2c4996763246f/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/15028842484/ecd5/103e/abd3/e1320265865209265061abed25a62e7e.mp3')
            .add('https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_WechatIMG3550.jpeg')
            .build()
        if (room) {
            await room.say(music)
        } else {
            await contact.say(music)
        }
    } else if (msg.text() === '??????') {
        const room = await bot.Room.find({ topic: 'Wechaty Developers\' Engine 1' })
        if (room) {
            await room.add(contact)
        }
    }
}
