import Ember from 'ember';

export default Ember.Route.extend({

model (params) {
	var controller = this.controllerFor('destinaion');
    controller.set('startPoint', params.address);

}

});
