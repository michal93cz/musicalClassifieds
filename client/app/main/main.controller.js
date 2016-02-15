'use strict';
(function() {

class MainController {

  constructor($http, $scope, socket, Auth, $modal) {
    this.$http = $http;
    this.awesomeThings = [];

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/classifieds').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.open = function (item) {
      $scope.classified = item;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          classified: function() {
            return $scope.classified;
          }
        }
      });

      modalInstance.result.then(function () {
        // ok action
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
}

angular.module('musicalClassifiedsApp')
  .controller('MainController', MainController);

angular.module('musicalClassifiedsApp')
  .controller('ModalInstanceCtrl', function ($scope, $http, $modalInstance, Auth, classified) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.NewClassified = classified;
    $scope.classified = classified;
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.save = function () {
      $http.put('/api/classifieds/'+String(classified._id), {
          title: $scope.NewClassified.title,
          description: $scope.NewClassified.description,
          price: $scope.NewClassified.price,
          address: {
            country: $scope.NewClassified.address.country,
            city: $scope.NewClassified.address.city
          },
          contact: {
            name: $scope.NewClassified.contact.name,
            mail: $scope.NewClassified.contact.mail,
            phone: $scope.NewClassified.contact.phone
          },
          owner: $scope.NewClassified.owner
        })
        .then(() => {
          $scope.message = 'Classified successfully changed.';
        })
        .catch(() => {
          this.message = ' '
        });
    };
  });
})();
