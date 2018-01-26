const
    express = require('express'),
    app = express(),    
    builder = require('botbuilder'),
    cognitiveservices = require('botbuilder-cognitiveservices');


// Create chat bot
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
let bot = new builder.UniversalBot(connector);
bot.set('storage', new builder.MemoryBotStorage());         // Register in-memory state storage
app.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

let recognizer = new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId: "",
    subscriptionKey: "",
    top: 3
});

let qnaMakerTools = new cognitiveservices.QnAMakerTools();
bot.library(qnaMakerTools.createLibrary());

let basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: 'No match! Try changing the query terms!',
    qnaThreshold: 0.3,
    feedbackLib: qnaMakerTools
});

bot.dialog('/', basicQnAMakerDialog);

app.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s');
});