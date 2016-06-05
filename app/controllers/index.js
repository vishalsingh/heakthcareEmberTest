import Ember from 'ember';

export default Ember.Controller.extend({
 actions: {
     transit (param) {
     	this.transitionToRoute('destinaion', param);
     }
 }
});
