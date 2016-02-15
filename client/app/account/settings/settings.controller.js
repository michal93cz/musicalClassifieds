'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  submittedDetails = false;
  //end-non-standard

  constructor(Auth, $http) {
    this.Auth = Auth;
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUser();
    this.id = this.getCurrentUser._id;

  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  changeDetails(user) {
    this.submittedDetails = true;

    this.$http.put('/api/users/' + String(this.id) + '/details', {
      address: {
        country: user.address.country,
        city: user.address.city
      },
      contact: {
        name: user.contact.name,
        phone: user.contact.phone
      }
    })
    .then(() => {
      this.messageDetails = 'Details successfully changed.';
    })
    .catch(() => {
      this.messageDetails = ' '
    });
  }
}

angular.module('musicalClassifiedsApp')
  .controller('SettingsController', SettingsController);
