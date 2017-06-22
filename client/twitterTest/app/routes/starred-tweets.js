import Ember from 'ember';

export default Ember.Route.extend({
     controllerName: 'starred-tweets',
    activate(){
        this.controllerFor('starred-tweets').send('getNewTweets');
    }
});
