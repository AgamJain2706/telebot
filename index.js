const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();
const { default: axios } = require('axios');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const text = msg.text;
    bot.sendMessage(msg.chat.id, "You said: " + text);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello, welcome to the bot. How can I help you?");
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "Send your problem, I will help you.");
});

bot.onText(/\/joke/, async (msg) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
        const joke = response.data[0];
        const setup = joke.setup;
        const punchline = joke.punchline;
        bot.sendMessage(msg.chat.id, `${setup} - ${punchline}`);
    } catch (error) {
        bot.sendMessage(msg.chat.id, "Sorry, I couldn't fetch a joke for you.");
    }
});
