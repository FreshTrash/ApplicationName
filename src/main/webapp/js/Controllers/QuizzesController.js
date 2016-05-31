(function(define) {
    "use strict";

    define([],
        function() {

            var QuizzesController = function($scope, $resource) {

                var Themes = $resource('/api/theme');
                $scope.themes = Themes.query();
                $scope.showThemes = true;

                var Questions = $resource('/api/test/:id');

                var questions = [];
                $scope.startQuizOnTheme = function(themeId) {

                    Questions.get({ id: themeId + 1 }, function(data) {
                        questions = data.questions;
                        $scope.choosedThemeName = data.theme.name;
                        $scope.questionId = data.questions[0].id;
                        $scope.questionName = data.questions[0].text;
                        $scope.thisThemeQuestions = data.questions;
                        $scope.totalQuestionsCount = questions.length;

                    });

                    

                    $scope.showThemes = false;
                }


                $scope.submitAnswer = function(questionId) {

                    var answersArr = $scope.thisThemeQuestions[questionId - 1].answers;

                    //Проверка на отсутствие ответа
                    var isAnswerResponsed = false;
                    for (var i = 0, len = answersArr.length; i < len; i++) {
                        if (answersArr[i].userChoice === true) {
                            isAnswerResponsed = true;
                        } else {
                            answersArr[i].userChoice = false;
                        }
                    }

                    // Если галочка проставлена
                    if (isAnswerResponsed) {
                        // Если вопроса нет, показываем следующий вопрос с ответами
                        if (questions[questionId] !== undefined) {

                            $scope.questionId = questions[questionId].id;
                            $scope.questionName = questions[questionId].text;
                            //$scope.thisThemeQuestions = choosedTheme.questions[questionId].answers;
                        } else {
                            showAnswers();
                        }

                    } else
                        window.alert("Выберите один из вариантов");

                }

                var showAnswers = function() {
                    $scope.showAnswers = true;
                    // Находим правильный ответ
                    var questionsArr = $scope.thisThemeQuestions;


                    var len = questionsArr.length;
                    var wrongAnswerCount = 0;
                    for (var i = 0; i < len; i++) {
                        for (var j = 0, len2 = questionsArr[i].answers.length; j < len; j++) {
                            if (questionsArr[i].answers[j].userChoice != questionsArr[i].answers[j].correct) {
                                wrongAnswerCount++;
                                break;
                            }
                        }
                    }

                    $scope.rightAnswersPercent = ((len-wrongAnswerCount)/len)*100;

                    // показываем результаты+
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

                 var roundFloat = function(number, del) {
                    var residue = Math.pow(10, del)
                    return (Math.round(number * residue) / residue);
                };

            };
            return ["$scope", "$resource", QuizzesController];
        });


}(define));
