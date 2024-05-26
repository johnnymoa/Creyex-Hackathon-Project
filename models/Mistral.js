// // mistralClient.js
// import MistralClient from '@mistralai/mistralai';

// const apiKey = process.env.MISTRAL_API_KEY;
// const client = new MistralClient(apiKey);

// export const sendMessageToMistral = async (messageList, newMessage) => {
//   // Append the new message to the message list
//   const updatedMessages = [...messageList, { role: 'user', content: newMessage }];

//   // Call the Mistral API
//   const chatResponse = await client.chat({
//     model: 'mistral-large-latest',
//     messages: updatedMessages,
//   });

//   const responseMessage = chatResponse.choices[0].message.content;
//   updatedMessages.push({ role: 'assistant', content: responseMessage });

//   return updatedMessages;
// };

// exports.sendMessageToMistral = sendMessageToMistral;