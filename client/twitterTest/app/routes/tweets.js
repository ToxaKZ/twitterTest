import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'tweets',
    activate(){
        this.controllerFor('tweets').send('getNewTweets');
    }
});
