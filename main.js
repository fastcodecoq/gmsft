window.serverUrl = '';
         
         angular.module('notifi3r', ['monospaced.elastic', 'scrollable-table'])

         .config(function($httpProvider){

             $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              
              var param = function(obj) {
              var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
              
              for(name in obj) {
               value = obj[name];
              
              if(value instanceof Array) {
              for(i=0; i<value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
              }
              }
              else if(value instanceof Object) {
              for(subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
              }
              }
              else if(value !== undefined && value !== null)
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
              }
              
              return query.length ? query.substr(0, query.length - 1) : query;
              };
              
              // Override $http service's default transformRequest
              $httpProvider.defaults.transformRequest = [function(data) {
              return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
              }];

         })

         .service('usersList', function($http){
                     
                     return $http.get(window.serverUrl + '/push/users');
                      
                  })


         .controller('pageInfoCtrl', function($scope){

              $scope.page = {
                 title : "notifi3r"
              }
              
         })


         .controller('usersCtrl', function($scope, $http, $log, usersList){

             $scope.users = [];
             $scope.notificationForm = [];
             $scope.notifier = [];
             $scope.sendEnable = false;             
            
            $scope.updateUsers = function(){

              usersList
             .success(function(rs){
                 $scope.users = rs.response;
                 $log.log(rs);
             })
             .error(function(err){
               $log.log(err);
              });
              
            }

            $scope.updateUsers();
             

             $scope.register = function(){                            

               $form = $scope.userForm;

               if(!$form)
                {
                      alert('All fields are required');                      
                      return;
                   }

               for(x in $form)
                if(!/\w/g.test($form[x]))
                   {
                      alert('All fields are required');
                      return;
                   }

                   $log.log('register', $scope.userForm);

                   $http.post(window.serverUrl + '/push/register', $form)
                   .success(function(rs){
                     $log.log(rs);
                     $scope.updateUsers();
                     $form.reset();                     
                   })
                   .error(function(err){
                     $log.log(err);
                     alert('Register failed');
                   })                  

             }

             $scope.check = function(){         

              console.log($scope.notifier.indexOf(this.user.user_id,0))
              var index = $scope.notifier.indexOf(this.user.user_id,0);

              if( index > -1)
                  delete $scope.notifier[index];
              else
                $scope.notifier.push(this.user.user_id);

                if($scope.notifier.length === 0)
                    $scope.notifier = [];

                console.log($scope.notifier);

             }

             $scope.sendNotifications = function(){
               
               $log.log('sendNotifications');

               $form = $scope.notificationForm;

               $log.log($form.message);

               if(!/\w/g.test($form.message) || !$form.message)
                  {
                    alert('You must enter a message');
                    return;
                  }

              if($scope.notifier.length === 0)
                   {
                     alert('You must select a least one user to send notifications.');
                     return;
                   }

                   for(x in $scope.notifier)
                   $http.post(window.serverUrl + '/push/send', {user_id : $scope.notifier[x], message :  $form.message}).
                   success(function(rs){
                       console.log(rs);
                   })
                   .error(function(err){ console.log(err)});

             }


             $scope.del = function(){

                   var rs = confirm('Are you sure to delete this reg?');

                   if(rs)
                   $http.delete(window.serverUrl+'/push/user/'+this.user.user_id)
                   .success(function(rs){
                       alert('Reg Delete');
                       console.log(rs);
                       $scope.updateUsers();
                   })
                   .error(function(err){
                       alert('Can\'t delete the reg');
                       console.log(err);
                   })
                   else
                  alert('Looser ;)');
             }


         })


         .controller('configCtrl', function($scope, $log){

              $scope.serverUrl ="http://pilotosbarranquilla.com/notifi3r";
              window.serverUrl = $scope.serverUrl;

               $scope.$watch('serverUrl', function(last, old){
                        window.serverUrl = last;
                        $log.log(last);
               });

         });  
