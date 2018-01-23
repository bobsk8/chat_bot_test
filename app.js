const
    builder = require('botbuilder'),
    express = require('express'),
    app = express();


let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

app.post('/api/messages', connector.listen());

let
    bot = new builder.UniversalBot(connector, function (session) {
        session.send("Você disse: %s", session.message.text);
    });

app.listen(8080);