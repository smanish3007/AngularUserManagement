(function () {
    'use strict';
 
    angular
        .module('userManagementAngular')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'LoginService', 'FlashService'];
    function LoginController($location, LoginService, FlashService) {
        var vm = this;
 
        vm.login = login;
        vm.date = new Date();
 
        (function initController() {
            // reset login status
            LoginService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            LoginService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    alert('success');
                    LoginService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    alert('failure');
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }
 
})();