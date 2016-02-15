'use strict';

angular.module('musicalClassifiedsApp')
  .controller('MyClassifiedsCtrl', function ($http, $scope, socket, Auth, $modal) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.$http = $http;

    $scope.userClassifieds = [];

    $scope.$http.get('/api/classifieds/owner/'+$scope.getCurrentUser()._id).then(response => {
      $scope.userClassifieds = response.data;
    });

    $scope.delete = function(classified){
      $scope.$http.delete('/api/classifieds/'+classified._id);
      $scope.userClassifieds.splice($scope.userClassifieds.indexOf(classified), 1);
    }

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
  });
