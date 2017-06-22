import Ember from 'ember';

export default Ember.Controller.extend({
    model:{
         tweets: [],
    },
    actions:{
        getNewTweets: function(){
            var self = this;
            Ember.$.ajax({
                url: '/api/tweets',
            }).then(function(tweets) {
                self.set('tweets',tweets);
            });
        }
    }
});
