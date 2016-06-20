(function(define) {
    "use strict";

    define([],
        function() {

            var QuizzesController = function($scope, $resource) {

                var Themes = $resource('/api/theme');
                $scope.themes = Themes.query();
                $scope.showThemes = true;

                var Questions = $resource('/api/test/:id');
                var questionsDataPreload = {};

                Questions.get({ id: 1 }, function(data) {
                    questionsDataPreload = data;
                });

                var questions = [];
                $scope.startQuizOnTheme = function(themeId) {
                    if (themeId === 0) {
                        questions = questionsDataPreload.questions;
                        $scope.choosedThemeName = questionsDataPreload.theme.name;
                        $scope.questionId = questionsDataPreload.questions[0].id;
                        $scope.questionName = questionsDataPreload.questions[0].text;

                        $scope.totalQuestionsCount = questions.length;

                        for (var i = 0, len = questions[0].answers.length; i < len; i++)
                            questions[0].answers[i].userChoice = false;

                        $scope.thisThemeQuestions = questions;
                    } else {
                        Questions.get({ id: themeId + 1 }, function(data) {
                            questions = data.questions;
                            $scope.choosedThemeName = data.theme.name;
                            $scope.questionId = data.questions[0].id;
                            $scope.questionName = data.questions[0].text;

                            $scope.totalQuestionsCount = questions.length;

                            for (var i = 0, len = questions[0].answers.length; i < len; i++)
                                questions[0].answers[i].userChoice = false;

                            $scope.thisThemeQuestions = questions;
                        });
                    }



                    $scope.showThemes = false;
                    $scope.showQuestions = true;
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

                    $scope.thisThemeQuestions[questionId - 1].answers = answersArr;

                    // Если галочка проставлена
                    if (isAnswerResponsed) {
                        // Если вопроса нет, показываем следующий вопрос с ответами
                        if (questions[questionId] !== undefined) {

                            $scope.questionId = questions[questionId].id;
                            $scope.questionName = questions[questionId].text;
                            //$scope.thisThemeQuestions = choosedTheme.questions[questionId].answers;
                        } else {
                            answers();
                        }

                    } else
                        window.alert("Выберите один из вариантов");

                }

                var answers = function() {
                    $scope.showQuestions = false;
                    $scope.showAnswers = true;
                    // Находим правильный ответ
                    var questionsArr = $scope.thisThemeQuestions;


                    var len = questionsArr.length;
                    var wrongAnswerCount = 0;
                    for (var i = 0; i < len; i++) {
                        for (var j = 0, len2 = questionsArr[i].answers.length; j < len2; j++) {
                            if (questionsArr[i].answers[j].userChoice != questionsArr[i].answers[j].correct) {
                                
                                wrongAnswerCount++;
                                break;
                            }
                        }
                    }

                    $scope.rightAnswersCount = len - wrongAnswerCount;
                    $scope.rightAnswersPercent = roundFloat(((len - wrongAnswerCount) / len) * 100,0);

                    // показываем результаты+
                }

                $scope.backToThemes = function() {
                    $scope.showThemes = true;
                    $scope.showQuestions = false;
                    $scope.showAnswers = false;
                }

                var roundFloat = function(number, del) {
                    var residue = Math.pow(10, del)
                    return (Math.round(number * residue) / residue);
                };

            };
            return ["$scope", "$resource", QuizzesController];
        });


}(define));
