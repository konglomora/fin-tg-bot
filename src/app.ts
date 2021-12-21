import { Telegraf } from 'telegraf'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import assert from 'assert-ts'
require('dotenv').config()

const {
	TELEGRAM_BOT_TOKEN,
	GOOGLE_SHEET_ID,
	MONEY_MGR_EMAIL,
	MONEY_MGR_PRIVATE_KEY,
} = process.env

assert(TELEGRAM_BOT_TOKEN !== null, 'TELEGRAM_BOT_TOKEN is missing ')
assert(GOOGLE_SHEET_ID !== null, 'GOOGLE_SHEET_ID is missing ')
assert(MONEY_MGR_EMAIL !== null, 'MONEY_MGR_EMAIL is missing ')
assert(MONEY_MGR_PRIVATE_KEY !== null, 'MONEY_MGR_PRIVATE_KEY is missing ')

const bot = new Telegraf(TELEGRAM_BOT_TOKEN!)
const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID!)

async function start() {
	await doc.useServiceAccountAuth({
		client_email: MONEY_MGR_EMAIL!,
		private_key: MONEY_MGR_PRIVATE_KEY!.replace(/\\n/gm, '\n'),
	})
	bot.start(ctx => ctx.reply('Welcome'))
	bot.on('text', async ctx => {
		console.info(ctx.message.text)
	})

	// bot.help(ctx => ctx.reply('Send me a sticker'))
	// bot.on('sticker', ctx => ctx.reply('👍'))
	// bot.hears('hi', ctx => ctx.reply('AlOha'))
	bot.launch()

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'))
	process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

start()
