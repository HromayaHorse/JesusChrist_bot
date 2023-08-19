const { Telegraf } = require('telegraf');
const rateLimit = require('telegraf-ratelimit')

const limitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx, next) => ctx.reply(`Не произноси имени Господа, Бога твоего, напрасно; 
  ибо Господь не оставит без наказания того, кто произносит имя Его напрасно.`)
}

const bot = new Telegraf(token);

const Api = require('./api.js');
const api = new Api();

const schedule = require('node-schedule');

bot.use(rateLimit(limitConfig))

bot.command('start', async ctx => {
    await bot.telegram.sendPhoto(ctx.chat.id, "https://i.pinimg.com/736x/cc/79/af/cc79af14c1de90ded80526e18d4e0975--savior-jesus-christ.jpg")
    await bot.telegram.sendMessage(ctx.chat.id, 'Привет раб божий. Чего такой усталый? Присаживайся, отдохни, покушай рыбки, попей вина разведенного с водой.', {
        "reply_markup": {
            "resize_keyboard": true,
            "keyboard": [
              [
                {
                  "text": "Просто посидеть вместе с Иисусом",
                },
                {
                  "text": "Получить мудрость",
                }
              ]
            ]
          }
    })
    const job = schedule.scheduleJob('0 0 0 * * *', async() => {
      let quote = await api.getJesusQuote();
      await bot.telegram.sendPhoto(ctx.chat.id, quote.data[0].link)
      await bot.telegram.sendMessage(ctx.chat.id, JSON.stringify(quote.data[0].quote))
    });
});

bot.hears("Получить мудрость", async (ctx) => {
  let quote = await api.getJesusQuote();
  await bot.telegram.sendPhoto(ctx.chat.id, quote.data[0].link)
  await bot.telegram.sendMessage(ctx.chat.id, JSON.stringify(quote.data[0].quote))
})

bot.hears("Просто посидеть вместе с Иисусом", async (ctx) => {
  let pic = await api.getJesusPic();
  await bot.telegram.sendPhoto(ctx.chat.id, pic.data[0].link)
})

bot.launch();
console.log("Bot started")