export default function() {
  this.get('/users', function() {
    return {
      data: [{
        type: 'users',
        id: 1,
        attributes: {
           name: 'Chattarpur',
           address: 'Chattarpur Delhi'
        }
      }, {
        type: 'users',
        id: 2,
        attributes: {
           name: 'Mayur Vihar',
           address: 'Mayur Vihar Delhi'          
        }
      }, {
        type: 'users',
        id: 3,
        attributes: {
           name: 'saket',
           address: 'Saket Delhi'
        }
      }]
    };
  });
}