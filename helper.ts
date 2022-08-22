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
    const contact = msg.talker() // 说话的用户
    const room = msg.room() // 是否为群消息
    if (msg.text() === '图片') {
        const file = FileBox.fromUrl('https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_WechatIMG3550.jpeg')
        if (room) {
            await room.say(file)
        } else {
            await contact.say(file)
        }
    } else if (msg.text() === '文字') {
        await contact.say('你好')
    } else if (msg.text() === '文件') {
        const file = FileBox.fromUrl('https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_Test file.docx')
        if (room) {
            await room.say(file)
        }else {
            await contact.say(file)
        }
    } else if (msg.text() === 'h5') {
        const urlCard = new bot.UrlLink({
            title: 'Hello World! 你好世界！',
            description: 'This is description。描述可中文',
            thumbnailUrl: 'https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_sh.jpeg',
            url: 'http://wechat.aibotk.com/material/file',
        })
        if (room) {
            await room.say(urlCard)
        } else {
            await contact.say(urlCard)
        }
    } else if (msg.text() === '小程序') {
        const mini = new bot.MiniProgram({
            description: '美团打车',
            title: '美团打车',
            pagePath: 'pages/index/index2.html?showCarKnowledge=false&source=xcx_sy2021',
            thumbUrl: 'https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_meiri.jpeg',
            username: 'gh_b86a530798ae',
        })
        if (room) {
            await room.say(mini)
        } else {
            await contact.say(mini)
        }
    } else if (msg.text() === '音乐') {
        const music = await bot.Post.builder()
            .add('music')
            .add('你怎么蠢到我喜欢你都不知道')
            .add('邹念慈')
            .add('wx5aa333606550dfd5') // 酷狗 wx79f2c4418704b4f8，网易云 wx8dd6ecd81906fd84，QQ音乐 wx5aa333606550dfd5
            .add('http://isure6.stream.qqmusic.qq.com/C400002QTAVi3WShQg.m4a?fromtag=30006&guid=2000000006&uin=0&vkey=5F8F57E2B07E3D952EB4FAAE0D2A965CBD055BA8D822EAB3D9F41871F5EAB464D68095C572917296B9934F5DE6722A52020E562793E5921A')
            .add('http://isure6.stream.qqmusic.qq.com/C400002QTAVi3WShQg.m4a?fromtag=30006&guid=2000000006&uin=0&vkey=5F8F57E2B07E3D952EB4FAAE0D2A965CBD055BA8D822EAB3D9F41871F5EAB464D68095C572917296B9934F5DE6722A52020E562793E5921A')
            .add('https://img.aibotk.com/aibotk/public/yq3wWdBL0BnJV4Z1_WechatIMG3550.jpeg')
            .build()
        if (room) {
            await room.say(music)
        } else {
            await contact.say(music)
        }
    } else if (msg.text() === '进群') {
        const room = await bot.Room.find({ topic: 'Wechaty Developers\' Engine 1' })
        if (room) {
            await room.add(contact)
        }
    }
}
