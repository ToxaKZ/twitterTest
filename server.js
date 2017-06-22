const express        = require('express');  
const app            = express();
const Twitter        = require('twitter');
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

require('./app/routes')(app);

checkENVVariable('DATABASE_URL');
checkENVVariable('TWITTER_CONSUMER_KEY');
checkENVVariable('TWITTER_CONSUMER_SECRET');
checkENVVariable('TWITTER_ACCESS_TOKEN_KEY');
checkENVVariable('TWITTER_ACCESS_TOKEN_SECRET');

require('./app/database')(app).then(()=>{

    app.twitterClient = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    app.listen(port);
});

function checkENVVariable(name){
    if(!process.env[name])
    {
        console.log('Please set ENV variable '+name);
        process.exit(1);
    }
}




