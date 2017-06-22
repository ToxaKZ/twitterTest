import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        setStarred(){
            var self = this;
            Ember.$.ajax({
                url: '/api/set-star',
                type: 'POST',
                data: {
                    id:  this.get('model.id_str')
                },
            }).then(function(tweets) {
                self.set('model.starredDate', new Date());
            });
        }
    }
});
