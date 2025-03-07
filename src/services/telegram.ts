import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN || '7906203356:AAF2d968x7zTO6Pc-sbudED-0jWvDfiYC94';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://market.tonnel.network';

const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [[
      {
        text: 'Открыть Tonnel Market',
        web_app: { url: appUrl }
      }
    ]]
  };

  await bot.sendMessage(chatId, 'тест', {
    reply_markup: keyboard
  });
});

export const sendMessage = async (chatId: number, message: string) => {
  try {
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const sendNFTNotification = async (chatId: number, nft: any) => {
  const message = `
🎨 New NFT Listed!
Name: ${nft.name}
Price: ${nft.price} TON
Category: ${nft.category}
Owner: ${nft.owner}
Likes: ${nft.likes}
  `;
  
  await sendMessage(chatId, message);
};

export default bot; 