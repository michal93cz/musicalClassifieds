'use strict';

(function() {

  class AddClassifiedCtrl {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.getCurrentUser = Auth.getCurrentUser();
      this.newClassifiedZero = {
        "title": " ",
        "description": " ",
        "price": 0,
        "address": {
          "country": this.getCurrentUser.address.country,
          "city": this.getCurrentUser.address.city
        },
        "contact": {
          "name": this.getCurrentUser.contact.name,
          "mail": this.getCurrentUser.email,
          "phone": this.getCurrentUser.contact.phone
        },
        "owner": this.getCurrentUser._id
      };

      this.newClassified = this.newClassifiedZero;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('classified');
      });
    }

    addClassified() {
      if (this.newClassified) {
        this.$http.post('/api/classifieds', {
          title: this.newClassified.title,
          description: this.newClassified.description,
          price: this.newClassified.price,
          address: {
            country: this.newClassified.address.country,
            city: this.newClassified.address.city
          },
          contact: {
            name: this.newClassified.contact.name,
            mail: this.newClassified.contact.mail,
            phone: this.newClassified.contact.phone
          },
          owner: this.newClassified.owner
        })
        .then(() => {
          this.newClassified.title = '';
          this.newClassified.description = '';
          this.newClassified.price = '';
          this.message = 'Classified successfully added.';
        })
        .catch(() => {
          this.message = ' '
        });
      }
    }
  }

  angular.module('musicalClassifiedsApp')
    .controller('AddClassifiedCtrl', AddClassifiedCtrl);

})();
