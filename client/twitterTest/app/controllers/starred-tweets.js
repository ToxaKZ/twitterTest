import Ember from 'ember';

export default Ember.Controller.extend({
    model:{
         tweets: [],
    },
    actions:{
        getNewTweets: function(){
            var self = this;
            Ember.$.ajax({
                url: '/api/get-starred',
            }).then(function(tweets) {
                self.set('tweets',tweets);
            });
        }
    }
});
