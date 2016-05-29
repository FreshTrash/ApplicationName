(function(define) {
    "use strict";

    define([],
        function() {

            var QuizzesController = function($scope, $resource) {

                var Themes = $resource('/api/theme');
                $scope.themes = Themes.query();

                var Questions = $resource('/api/test/:id');

                var choosedTheme = {};
                $scope.startQuizOnTheme = function(index) {

                    Questions.get({ id: index + 1 }, function(data) {
                        $scope.choosedThemeName = data.name;
                        $scope.questionId = data.questions[0].id;
                        $scope.questionName = data.questions[0].text;
                        $scope.questionAnswers = data.questions[0].answers;
                        choosedTheme = data;
                    });

                    $scope.showThemes = false;
                }

                $scope.submitAnswer = function(questionId) {
                    // считаем правильный ответ

                    var rightAnswers = [];


//                     angular.forEach( choosedTheme.questions[questionId-1].answers,function(checkAnswer){
// checkAnswer.
//                     })

                    // Выводим новый вопрос с ответами
                    if (choosedTheme.questions[questionId] != undefined) {
                        $scope.questionId = choosedTheme.questions[questionId].id;
                        $scope.questionName = choosedTheme.questions[questionId].text;
                        $scope.questionAnswers = choosedTheme.questions[questionId].answers;
                        console.log(choosedTheme);
                    } else {
                        showAnswers();
                    }

                }

                var showAnswers = function() {

                }




                //            var Todo = $resource('/api/1/todo/:id');
                //
                //            //create a todo
                //            var todo1 = new Todo();
                //            todo1.foo = 'bar';
                //            todo1.something = 123;
                //            todo1.$save();
                //
                //            //get and update a todo
                //            var todo2 = Todo.get({id: 123});
                //            todo2.foo += '!';
                //            todo2.$save();
                //
                //            //which is basically the same as...
                //            Todo.get({id: 123}, function(todo) {
                //               todo.foo += '!';
                //               todo.$save();
                //            });
                //
                //            //get a list of todos
                //            Todo.query(function(todos) {
                //              //do something with todos
                //              angular.forEach(todos, function(todo) {
                //                 todo.foo += ' something';
                //                 todo.$save();
                //              });
                //            });
                //
                //            //delete a todo
                //            Todo.$delete({id: 123});


                //Todo.get({id: 123}, function(todo) {
                //   $scope.todo = todo;
                //});

            };
            return ["$scope", "$resource", QuizzesController];
        });


}(define));
