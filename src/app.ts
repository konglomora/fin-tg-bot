import { Telegraf } from 'telegraf'

const bot = new Telegraf('5086202141:AAGNAeOY51dRC3fq25-sVkqy_Z3TR3nB_y0')
bot.start(ctx => ctx.reply('Welcome'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('AlOha'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
