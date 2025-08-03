import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

// This function will handle the core logic of processing a message.
const processMessage = async (bot, msg) => {
    // Ensure the message and text exist before proceeding.
    if (!msg || !msg.text) {
        console.log("Received a message without text, ignoring.");
        return;
    }

    const chatId = msg.chat.id;
    const text = msg.text;

    // Determine the base URL for the API call.
    // This works for both local development and Vercel deployment.
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    // Regex to match various Google Maps URLs
    const gmapsRegex = /https?:\/\/(www\.)?(google\.[a-z\.]+\/maps|maps\.app\.goo\.gl)\/[@\/\?a-zA-Z0-9\.\,\-_~%=+]+/;

    // Case 1: The message is a Google Maps link.
    if (gmapsRegex.test(text)) {
        try {
            const response = await fetch(text, { redirect: 'follow' });
            const finalUrl = response.url;
            // Regex to find latitude and longitude in the final URL
            const latLngMatch = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || finalUrl.match(/query=(-?\d+\.\d+),(-?\d+\.\d+)/);

            if (latLngMatch && latLngMatch.length >= 3) {
                const lat = parseFloat(latLngMatch[1]);
                const lng = parseFloat(latLngMatch[2]);
                const apiUrl = `${baseUrl}/api/lookup?location=${lat},${lng}`;
                
                console.log(`Calling API: ${apiUrl}`);
                const apiResponse = await fetch(apiUrl);
                const data = await apiResponse.json();

                if (apiResponse.ok && data.words) {
                    bot.sendMessage(chatId, `📍 3-word address: *${data.words}*`, { parse_mode: 'Markdown' });
                } else {
                    bot.sendMessage(chatId, `Could not convert the location. It might be outside the supported area.\n\nError: ${data.error || 'API request failed'}`);
                }
            } else {
                bot.sendMessage(chatId, 'Could not extract coordinates from the Google Maps link.');
            }
        } catch (error) {
            console.error('Error processing Google Maps link:', error);
            bot.sendMessage(chatId, 'An error occurred while processing the Google Maps link.');
        }
    // Case 2: The message is a 3-word address.
    } else if (/^[a-z]+\.[a-z]+\.[a-z]+$/.test(text.toLowerCase())) {
        try {
            const apiUrl = `${baseUrl}/api/lookup?words=${text.toLowerCase()}`;
            
            console.log(`Calling API: ${apiUrl}`);
            const apiResponse = await fetch(apiUrl);
            const data = await apiResponse.json();

            if (apiResponse.ok && data.lat && data.long) {
                const { lat, long } = data;
                bot.sendMessage(chatId, `📍 Location: https://www.google.com/maps/search/?api=1&query=${lat},${long}`);
            } else {
                bot.sendMessage(chatId, `Invalid 3-word address.\n\nError: ${data.error || 'API request failed'}`);
            }
        } catch(error) {
            console.error('Error processing 3-word address:', error);
            bot.sendMessage(chatId, 'An error occurred while looking up the 3-word address.');
        }
    // Case 3: The message is none of the above.
    } else {
        bot.sendMessage(chatId, 'Please send a Google Maps link or a 3-word address in the format `word.word.word`');
    }
};

// This is the main Vercel serverless function handler.
export default async (req, res) => {
    try {
        // Initialize the bot inside the handler to ensure it's always ready.
        const token = process.env.TELEGRAM_TOKEN;
        if (!token) {
            console.error("TELEGRAM_TOKEN is not set!");
            return res.status(500).send('Server configuration error.');
        }
        const bot = new TelegramBot(token);

        // Check if the request body and a message object exist.
        if (req.body && req.body.message) {
            // Log the incoming message for debugging purposes.
            console.log("Received message:", JSON.stringify(req.body.message, null, 2));
            // Process the message.
            await processMessage(bot, req.body.message);
        } else {
            console.log("Received an update without a message object, ignoring.");
        }
        
        // Send a 200 OK response to Telegram to acknowledge receipt of the update.
        res.status(200).send('OK');

    } catch (error) {
        console.error('Error in main handler:', error);
        // Send a 500 Internal Server Error response if something goes wrong.
        res.status(500).send('Error processing Telegram update.');
    }
};
