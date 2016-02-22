angular.module('starter')
this.createCompany = function (company) {
            var deferred = $q.defer();
            common.showLoading();
            company.adminId = admin._id;
            $http.post("/company/create-company", company).then(
                function (success) {
                    console.log(success.data);
                    $mdDialog.hide();
                    common.showMsg("Company created successfully!");
                    $state.go("dashboard.dashboard-home");
                    deferred.resolve(success.data);
                },
                function (err) {
                    $mdDialog.hide();
                    common.showMsg("Company not created!");
                    deferred.resolve(err);
                });
            return deferred.promise;
        };