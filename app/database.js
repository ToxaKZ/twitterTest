const Sequelize      = require('sequelize');
const TweetModel     = require('./models/tweet-model')

module.exports = function(app){
    app.sequelize = new Sequelize(process.env.DATABASE_URL,
        {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true
            }
        });

    return app.sequelize
    .authenticate()
    .then(() => {
            app.models = {};
            app.models.tweet = TweetModel(app.sequelize);
            app.sequelize.sync().then(function() {
                    console.log('Sync is success');
                }).catch(function(error) {
                    console.log('error in Sync \n', error);
            });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

}