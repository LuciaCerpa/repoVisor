const {Telegraf} = require('telegraf');

const bot = new Telegraf('6283477638:AAHA8F4DcJFp36aFHK_u6fx9ExDy0-1HfF8');

bot.start((ctx) => ctx.reply('Welcome'));

bot.hears(['hi', 'HI', 'Hi'], (ctx) => ctx.reply('Hey There'));

bot.on(['text'],(ctx) => ctx.reply(`Hola ${ctx.from.first_name} Bienvenid@ a FLOGO`));
bot.hears(['hola', 'HOLA', 'Hola'], (ctx) => {
    
    ctx.reply('En que puedo ayudarte')    
});
console.log(bot);

bot.launch();

