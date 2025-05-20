const TelegramBot = require('node-telegram-bot-api');


const token = 'YOUR_BOT_TOKEN_HERE';

const bot = new TelegramBot(token, { polling: true });


const choices = ['🪨 Rock', '📄 Paper', '✂️ Scissors'];

const getResult = (userChoice, botChoice) => {
  if (userChoice === botChoice) return "🤝 It's a draw!";
  if (
    (userChoice === '🪨 Rock' && botChoice === '✂️ Scissors') ||
    (userChoice === '📄 Paper' && botChoice === '🪨 Rock') ||
    (userChoice === '✂️ Scissors' && botChoice === '📄 Paper')
  ) return "🎉 You win!";
  return "😢 You lose!";
};


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hi ${msg.from.first_name}! Let's play Rock, Paper, Scissors! Choose one:`, {
    reply_markup: {
      keyboard: [[choices[0], choices[1], choices[2]]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});


bot.on('message', (msg) => {
  const userChoice = msg.text;
  if (!choices.includes(userChoice)) return;

  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = getResult(userChoice, botChoice);

  bot.sendMessage(msg.chat.id, `You chose: ${userChoice}\nI chose: ${botChoice}\n\n${result}`);
});
