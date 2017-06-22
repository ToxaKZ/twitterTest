const _ = require('underscore');

module.exports = function(app) {
        app.get('/api/tweets', function(req, res) {
            app.twitterClient.get('search/tweets', {q: 'eCommerce&video'}, function(error, tweets, response) {
                if(!error){
                    var idsArray=tweets.statuses.map((item)=>{
                        return item.id_str;
                    });
                    app.models.tweet.findAll({where: {
                        id_str: idsArray
                    }}).then((foundStarred=>{
                         res.send(tweets.statuses.map((item)=>{
                            let starredObject = _.find(foundStarred, (foundStar)=>{ return foundStar.id_str==item.id_str });
                            return app.models.tweet.build({id_str: item.id_str,
                                userName: item.user.name,
                                userImage: item.user.profile_image_url,
                                createDate: item.created_at,
                                text: item.text,
                                starredDate: starredObject?starredObject.starredDate:null
                            });
                        }));
                    })).catch(error=>{
                        res.status(500).send(error);
                    })
                    }
                else 
                    res.status(500).send(error);
            });
        });

        app.post('/api/set-star', function(req,res){
            if(!req.body.id){
                res.status(400).send({error: 'bad request'});
            }
            app.twitterClient.get('statuses/show/'+req.body.id, function(error, tweet, response) {
                if(!error){
                    app.models.tweet.create({id_str: tweet.id_str,
                            userName: tweet.user.name,
                            userImage: tweet.user.profile_image_url,
                            createDate: tweet.created_at,
                            text: tweet.text,
                            starredDate: new Date()
                        }).then(function(){
                            res.send({res:"ok"});
                        }).catch(function(error){
                            res.status(500).send(error);
                        });
                    }
                else 
                    res.status(500).send(error);
            });
        });


        app.get('/api/get-starred', function(req,res){
            console.log('some log');
             app.models.tweet.findAll({order: [['starredDate', 'DESC']]}).then(tweets=>{
                 res.send(tweets);
             });
        });


        app.get('*', function(req, res) {
            res.sendfile('./public/index.html');
        });
};