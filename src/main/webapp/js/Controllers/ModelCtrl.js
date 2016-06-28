(function(define) {
    "use strict";

    define(["ui.bootstrap.modal"],
        function() {

            var ModelCtrl = function($scope, $modal, $resource) {

                $scope.show_nonreserved = 1;

                // show law that given to function
                $scope.show_law = function(n) {
                    //+Highcharts.setOptions(Highcharts.theme);
                    var total_show_laws = [0, 0, 0, 0, 0, 0, 0];

                    for (var i = 0; i < 7; i += 1)
                        if (i === n)
                            total_show_laws[i] = 1;

                    $scope.show_nonreserved = total_show_laws[0];
                    $scope.show_reserved_1 = total_show_laws[1];
                    $scope.show_reserved_2 = total_show_laws[2];
                    $scope.show_reserved_3 = total_show_laws[3];
                    $scope.show_reserved_4 = total_show_laws[4];
                    $scope.show_reserved_5 = total_show_laws[5];
                    $scope.show_comparison = total_show_laws[6];
                };


                $scope.num_changed = function() {

                    var elem_number = $scope.num_elem;

                    // если число элементов не определено, то кол-во выпадающих меню = 0
                    if (elem_number === undefined) {
                        $scope.elems = 0;

                        $scope.show_dropdowns = false;
                    } else {

                        // else, create array 0..elem_number
                        $scope.elems = [...Array(parseInt(elem_number, 10)).keys()];
                        $scope.show_dropdowns = 1;
                    }

                    // Only for non-reserved systems
                    var obj = {};
                    if ($scope.show_nonreserved) {
                        obj = $scope.dropdown_data.elems;
                        //count keys of elem object
                        var count = 0;
                        for (var key in obj)
                            count += 1;

                        //if elem objects more than elements
                        if (count > elem_number) {
                            // delete last elems from elem_number to count
                            for (var i = count - 1; elem_number <= i; i -= 1) {
                                delete $scope.dropdown_data.elems[i];
                            }
                        }
                    }
                };


                var enable_if_arr = [];
                //при изменении dropdown'a переключаем ng-if для форм ввода параметров законов
                $scope.dropdown_changed = function() {

                    var law_values_arr = [];
                    var law_obj = $scope.dropdown_data.elems;


                    for (var key in law_obj) {
                        law_values_arr.push(law_obj[key]);
                    }

                    enable_if_arr = getValuesForNgif(law_values_arr);
                    $scope.exp_if = enable_if_arr[0];
                    $scope.gamma_if = enable_if_arr[1];
                    $scope.usech_if = enable_if_arr[2];
                    $scope.relei_if = enable_if_arr[3];
                    $scope.veib_if = enable_if_arr[4];
                }

                function getValuesForNgif(law_values_arr) {
                    var int_arr = [];
                    //sting array to int array
                    int_arr = stringArrToIntArr(law_values_arr);
                    //ascending sort
                    int_arr = qsort(int_arr);
                    int_arr = delDoubles(int_arr);
                    int_arr = toBinary(int_arr);

                    return int_arr;
                }



                $scope.show_nonreserved_button_tables = function() {
                    if ($scope.dropdown_data.elems)
                        return 1;
                    return 0;
                }


                $scope.start_nonreserved = function() {

                    if (check_nonreserved_inputs()) {
                        calculate_non_reserved();
                        $scope.show_nonreserved_tables = true;
                    } else {
                        window.alert("Данные не валидны. Проверьте введенные значения.");
                    }
                }



                var check_nonreserved_inputs = function() {

                    // check that all dropdowns choosed
                    var dropdown_obj = $scope.dropdown_data.elems;
                    $scope.show_elem_warning = 0;

                    var keys_of_dropdowns_arr = [];
                    for (var key in dropdown_obj) {
                        keys_of_dropdowns_arr.push(key);
                    }

                    keys_of_dropdowns_arr = qsort(keys_of_dropdowns_arr);

                    var keys_of_dropdowns_length = keys_of_dropdowns_arr.length;

                    // 
                    for (var i = 0; i < keys_of_dropdowns_length; i += 1) {
                        if (keys_of_dropdowns_arr[i] != i) {

                            return 0;
                        }
                    }

                    //check form_total params 
                    if ($scope.form_total.num_elem.$invalid ||
                        $scope.form_total.exec_time.$invalid ||
                        $scope.form_total.step.$invalid) {

                        return 0;
                    }

                    //если все dropdowns не выбраны
                    if (keys_of_dropdowns_length != $scope.num_elem) {
                        $scope.show_elem_warning = 1;

                        return 0;
                    }

                    // 
                    // Если закон не выбран, значит форма для ввода параметров этого закона скрыта.
                    // Проверяем поля для не скрытых форм
                    //
                    // enable_if_arr - массив, в котором каждый элемент или 0 или 1, 
                    // в зависимости от того скрыта форма или нет
                    //
                    // для i от 0 до кол-ва законов
                    // если форма отображается
                    // проверяем валидацию формы для этого закона
                    //
                    var enable_length = enable_if_arr.length;
                    for (var i = 0; i < enable_length; i += 1) {

                        if (enable_if_arr[i]) {
                            switch (i) {
                                case 0:
                                    {
                                        if ($scope.form_exp.lambda_exp.$invalid) {
                                            return 0;
                                        }
                                    }
                                    break;
                                case 1:
                                    {
                                        if ($scope.form_gamma.alpha_gam.$invalid ||
                                            $scope.form_gamma.beta_gam.$invalid) {
                                            return 0;
                                        }

                                    }
                                    break;
                                case 2:
                                    {
                                        if ($scope.form_usech.m_zero.$invalid ||
                                            $scope.form_usech.b_zero.$invalid) {
                                            return 0;
                                        }

                                    }
                                    break;
                                case 3:
                                    {
                                        if ($scope.form_rel.lambda_rel.$invalid) {
                                            return 0;
                                        }
                                    }
                                    break;
                                case 4:
                                    {
                                        if ($scope.form_veib.alpha_veib.$invalid ||
                                            $scope.form_veib.beta_veib.$invalid) {
                                            return 0;
                                        }

                                    }
                                    break;
                            }
                        }
                    }

                    // если все проверки прошли, значит формы прошли валидацию
                    return 1;
                }


                var calculate_non_reserved = function() {

                    $scope.grid_opts.data.length = 0;
                    $scope.grid_opts_p.data.length = 0;
                    $scope.grid_opts_f.data.length = 0;

                    //показываем графики и таблицы

                    var N = parseInt($scope.num_elem, 10);
                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);

                    //EXPONENTIAL
                    var lambda_exp = parseFloat($scope.lambda_exp, 10);

                    //GAMMA
                    var alpha_gam = parseFloat($scope.alpha_gam, 10);
                    var beta_gam = parseFloat($scope.beta_gam, 10);

                    //УСЕЧЕННОЕ НОРМАЛЬНОЕ
                    var m_zero = parseFloat($scope.m_zero, 10);
                    var b_zero = parseFloat($scope.b_zero, 10)

                    //РЕЛЕЯ
                    var lambda_rel = parseFloat($scope.lambda_rel, 10);

                    //ВЕЙБУЛЛА
                    var alpha_veib = parseFloat($scope.alpha_veib, 10);
                    var beta_veib = parseFloat($scope.beta_veib, 10);

                    var l = 0,
                        k = 0;


                    var T = [];
                    var sigma = [];


                    var len = parseInt((time / step), 10);

                    var desc_time = [];
                    desc_time[0] = 0;

                    //рассчитываем время
                    for (index = 0; index < len; ++index) {
                        desc_time.push(step + desc_time[index]);
                    }

                    var P = new Array(N);
                    var f = new Array(N);
                    for (index = 0; index < N; ++index) {
                        P[index] = new Array(len);
                        f[index] = new Array(len);
                    }


                    //для каждого элемента рассчитываем его параметры
                    for (var index = 0; index < N; ++index) {

                        var elem_choosed = parseInt($scope.dropdown_data.elems[index], 10);

                        //свитч по выбранному закону распределения элемента
                        switch (elem_choosed) {
                            //EXPONENTIAL
                            case 0:
                                {
                                    T[index] = roundFloat(1 / lambda_exp, 3);
                                    sigma[index] = roundFloat(1 / lambda_exp, 3);

                                    for (var index2 = 0; index2 <= len; ++index2) {
                                        P[index][index2] = roundFloat(Math.exp(-lambda_exp * desc_time[index2]), 3);
                                        f[index][index2] = roundFloat((lambda_exp * Math.exp(-lambda_exp * desc_time[index2])), 6);
                                    }
                                }
                                break;
                                //GAMMA
                            case 1:
                                {
                                    T[index] = roundFloat(alpha_gam * beta_gam, 3);
                                    sigma[index] = roundFloat(Math.sqrt(alpha_gam) * beta_gam, 3);

                                    for (var index2 = 0; index2 <= len; ++index2) {
                                        P[index][index2] = roundFloat(1 - incompletegamma(alpha_gam, (desc_time[index2] / beta_gam)), 3);
                                        f[index][index2] = roundFloat((((Math.pow(desc_time[index2], alpha_gam - 1)) / (Math.pow(beta_gam, alpha_gam) * Gamma(alpha_gam))) * Math.exp(-desc_time[index2] / beta_gam)), 6);
                                    }
                                }
                                break;
                            case 2:
                                {
                                    k = (Math.exp(-(m_zero * m_zero) / (2 * b_zero * b_zero))) / ((Math.sqrt(2 * Math.PI)) * (0.5 + normaldistribution(m_zero / b_zero)));
                                    T[index] = roundFloat(m_zero + k * b_zero, 3);
                                    sigma[index] = roundFloat(b_zero * Math.sqrt(1 + k * m_zero / b_zero - k * k), 3);


                                    for (var index2 = 0; index2 <= len; ++index2) {
                                        P[index][index2] = roundFloat((0.5 - normaldistribution((desc_time[index2] - m_zero) / b_zero)) / (0.5 + normaldistribution(m_zero / b_zero)), 3);
                                        f[index][index2] = roundFloat((Math.exp(-((desc_time[index2] - m_zero) * (desc_time[index2] - m_zero)) / (2 * b_zero * b_zero))) / (b_zero * (Math.sqrt(2 * Math.PI)) * (0.5 + normaldistribution(m_zero / b_zero))), 6);
                                    }

                                }
                                break;
                            case 3:
                                {
                                    T[index] = roundFloat(Math.sqrt((Math.PI) / (4 * lambda_rel)), 3);
                                    sigma[index] = roundFloat(Math.sqrt((4 - Math.PI) / (4 * lambda_rel)), 3);


                                    for (var index2 = 0; index2 <= len; ++index2) {
                                        P[index][index2] = roundFloat((Math.exp(-lambda_rel * desc_time[index2] * desc_time[index2])), 3);
                                        f[index][index2] = roundFloat(2 * lambda_rel * desc_time[index2] * (Math.exp(-lambda_rel * desc_time[index2] * desc_time[index2])), 6);
                                    }
                                }
                                break;
                            case 4:
                                {
                                    T[index] = roundFloat(beta_veib * Gamma(1 + 1 / alpha_veib), 3);
                                    sigma[index] = roundFloat(beta_veib * Math.sqrt(Gamma(1 + 2 / alpha_veib) - Gamma(1 + 1 / alpha_veib) * Gamma(1 + 1 / alpha_veib)), 3);


                                    for (var index2 = 0; index2 <= len; ++index2) {
                                        P[index][index2] = roundFloat(Math.exp(-(Math.pow((desc_time[index2] / beta_veib), alpha_veib))), 3);
                                        f[index][index2] = roundFloat((((alpha_veib * Math.pow(desc_time[index2], alpha_veib - 1)) / (Math.pow(beta_veib, alpha_veib))) * Math.exp(-(Math.pow((desc_time[index2] / beta_veib), alpha_veib)))), 6);
                                    }
                                }

                                break;
                        }
                    }

                    var total_P = [];
                    //находим total_P - вероятность безотказной работы системы
                    for (var index = 0; index <= len; ++index) {
                        total_P.push(P[0][index]);
                        for (var index2 = 0; index2 < N; ++index2) {
                            total_P[index] *= P[index2][index];
                        }
                    }
                    for (var index = 0; index <= len; ++index) {
                        total_P[index] = roundFloat(total_P[index], 3)
                    }



                    //Таблица 1
                    column_def = [{ name: 'empty', displayName: ' ', width: 50 }];
                    for (var index = 1; index <= N; ++index) {
                        var obj = { name: 'elem' + index, displayName: 'Эл. №' + index }
                        column_def.push(obj);
                    }


                    var first_row = {};
                    var second_row = {};
                    first_row.empty = "Tc";
                    second_row.empty = "Dc";
                    for (var index = 0; index <= N; ++index) {
                        var elem = 'elem' + (index + 1);
                        first_row[elem] = T[index];
                        second_row[elem] = sigma[index];
                    }
                    data_1.push(first_row);
                    data_1.push(second_row);

                    $scope.grid_opts.columnDefs = column_def;
                    $scope.grid_opts.data = data_1;


                    //Столбцы таблицы P(t)
                    column_def_p = [{ name: 'time', displayName: 'Время, ч', width: 80 }];
                    for (var index = 1; index <= N; ++index) {
                        var obj = { name: 'p' + index, displayName: 'P' + index + '(t)' };
                        column_def_p.push(obj);
                    }
                    column_def_p.push({ name: 'total', displayName: 'Pc(t)' });

                    //строки таблицы P(t)
                    for (var index = 0; index <= len; ++index) {
                        var true_obj = {};
                        true_obj.time = desc_time[index];

                        for (var index2 = 0; index2 < N; ++index2) {
                            var key_name = 'p' + (index2 + 1);
                            true_obj[key_name] = P[index2][index];
                        }
                        true_obj.total = total_P[index];
                        data_p.push(true_obj);
                    }

                    $scope.grid_opts_p.columnDefs = column_def_p;
                    $scope.grid_opts_p.data = data_p;


                    //графики

                    //NEW TABLE
                    // $scope.chartSeries = [
                    //     { "name": "Some data", "data": [1, 2, 4, 7, 3] },
                    //     { "name": "Some data 3", "data": [3, 1, 3, 5, 2] }
                    // ];

                    $scope.$broadcast('highchartsng.reflow');
                    var chartGraph = [];
                    for (var index = 0; index < N; ++index) {
                        chartGraph.push({ "name": "P" + (index + 1) + "(t)", "data": P[index] });
                    }
                    chartGraph.push({ "name": "Pc(t)", "data": total_P });


                    $scope.chartConfig1 = {
                            series: chartGraph,
                            title: {
                                text: 'Вероятности отказов',
                            },
                            credits: {
                                enabled: true
                            },
                            xAxis: {


                                categories: desc_time,
                                title: {
                                    text: 'Время испытания, t'
                                }
                            },
                            yAxis: {
                                currentMin: 0,
                                currentMax: 1,
                                tickInterval: 0.1,
                                title: {
                                    text: 'Вероятность отказа, P'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            }
                        }
                        // chart.series.setData(chartGraph,true);


                    // Столбцы f(t)
                    column_def_f = [{ name: 'time', displayName: 'Время, ч.' }]
                    for (var index = 1; index <= N; ++index) {
                        var obj = { name: 'f' + index, displayName: 'f' + index + '(t)' };
                        column_def_f.push(obj);
                    }

                    //строки таблицы f(t)
                    for (var index = 0; index <= len; ++index) {
                        var true_obj = {};
                        true_obj.time = desc_time[index];

                        for (var index2 = 0; index2 < N; ++index2) {
                            var key_name = 'f' + (index2 + 1);
                            true_obj[key_name] = f[index2][index];
                        }
                        data_f.push(true_obj);
                    }

                    $scope.grid_opts_f.columnDefs = column_def_f;
                    $scope.grid_opts_f.data = data_f;


                    column_def = [];
                    data_1 = [];

                    column_def_p = [];
                    data_p = [];

                    column_def_f = [];
                    data_f = [];


                    //График F
                    // $scope.chartSeries = [
                    //     { "name": "Some data", "data": [1, 2, 4, 7, 3] },
                    //     { "name": "Some data 3", "data": [3, 1, 3, 5, 2] }
                    // ];
                    chartGraph = [];

                    for (var index = 0; index < N; ++index) {
                        var f_tmp = [];
                        for (var index2 = 0; index2 <= len; ++index2) {
                            f_tmp[index2] = f[index][index2];
                        }
                        chartGraph.push({ "name": "f" + (index + 1) + "(t)", "data": f_tmp });
                    }


                    $scope.chartConfig2 = {
                        series: chartGraph,
                        title: {
                            text: 'Плотность распределения времени до отказа',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'f(t)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        }
                    }
                }; //end of non_reserved()









                ///// Reserved_1 start
                $scope.start_reserved_1 = function() {
                    if (check_reserved_1_inputs()) {
                        calculate_reserved_1();
                        $scope.show_reserved_1_tables = true;
                    } else {
                        window.alert("Данные не валидны. Проверьте введенные значения.");
                    }
                }

                var check_reserved_1_inputs = function() {
                    if ($scope.form_total.num_elem.$invalid ||
                        $scope.form_total.exec_time.$invalid ||
                        $scope.form_total.step.$invalid ||
                        $scope.form_total.total_lambda.$invalid)
                        return 0;

                    return 1;
                }


                var calculate_reserved_1 = function() {

                    $scope.grid_reserved_1_opts.data.length = 0;

                    var T = 0,
                        i = 0;
                    var P = [];
                    var f = [];
                    var lambda_sys = [];

                    var m = parseInt($scope.num_elem, 10);
                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);
                    var lambda = parseFloat($scope.total_lambda);

                    var len = parseInt((time / step), 10);


                    var desc_time = [];
                    desc_time[0] = 0;
                    //рассчитываем время
                    for (i = 0; i < len; ++i) {
                        desc_time.push(step + desc_time[i]);
                    }


                    for (i = 0; i <= len; i += 1) {

                        P[i] = roundFloat((1 - Math.pow(1 - Math.exp(-lambda * desc_time[i]), m + 1)), 7);
                        f[i] = roundFloat((m + 1) * lambda * Math.exp(-lambda * desc_time[i]) * Math.pow(1 - Math.exp(-lambda * desc_time[i]), m), 7);
                        lambda_sys[i] = roundFloat(f[i] / P[i], 3);
                    }

                    var h = 0;
                    for (var z = 1; z <= m + 1; z += 1)
                        h = h + (1 / z);

                    T = (1 / lambda) * h;
                    $scope.reserved_1_T = roundFloat(T, 2);


                    // Шапка таблицы
                    column_def_reserved_1 = [{ name: 'time', displayName: 'Время, ч.' },
                        { name: 'p', displayName: 'P(t)' },
                        { name: 'f', displayName: 'f(t)' },
                        //{ name: 'lam', displayName: 'lambda(t)' }
                    ];

                    //Строки таблицы
                    for (i = 0; i <= len; i += 1) {
                        var true_obj = {
                            "time": desc_time[i],
                            "p": P[i],
                            "f": f[i],
                            //"lam": lambda_sys[i]
                        };

                        data_reserved_1.push(true_obj);
                    }


                    $scope.grid_reserved_1_opts.columnDefs = column_def_reserved_1;
                    $scope.grid_reserved_1_opts.data = data_reserved_1;


                    var chartGraph = [];
                    chartGraph.push({ "name": "P(t)", "data": P });
                    // chartGraph.push({ "name": "f(t)", "data": f });
                    // chartGraph.push({ "name": "Lambda(t)", "data": lambda_sys });
                    comparisonPush("Постоянное резервирование", P);



                    $scope.highchart_reserved_1_P_conf = {
                        series: chartGraph,
                        title: {
                            text: 'Вероятность безотказной работы системы',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            },
                            isDirty: true
                        },
                        yAxis: {
                            currentMin: 0,
                            currentMax: 1,
                            tickInterval: 0.1,
                            title: {
                                text: 'Вероятность безотказной работы, P'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        isDirty: true,

                    }

                    chartGraph = [];

                    chartGraph.push({ "name": "f(t)", "data": f });
                    //chartGraph.push({ "name": "Lambda(t)", "data": lambda_sys });


                    $scope.highchart_reserved_1_F_conf = {
                        xAxis: {
                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            }
                        },
                        series: chartGraph,
                        title: {
                            text: 'Плотность распределения времени до отказа',
                        },
                        credits: {
                            enabled: true
                        },

                        yAxis: {
                            title: {
                                text: 'f(t)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        }
                    }
                   
     


                };




                ///////Reserved 2 strat
                $scope.start_reserved_2 = function() {
                    if (check_reserved_2_inputs()) {
                        calculate_reserved_2();
                        $scope.show_reserved_2_tables = true;
                    } else {
                        window.alert("Данные не валидны. Проверьте введенные значения.");
                    }
                }


                var check_reserved_2_inputs = function() {
                    if ($scope.form_total.num_elem.$invalid ||
                        $scope.form_total.exec_time.$invalid ||
                        $scope.form_total.step.$invalid ||
                        $scope.form_total.total_lambda.$invalid)
                        return 0;

                    return 1;
                }

                var calculate_reserved_2 = function() {

                    $scope.grid_reserved_2_opts.data.length = 0;
                    var
                        b = 0,
                        i = 0,
                        P = 0,
                        T = 0;

                    var m = parseInt($scope.num_elem, 10);
                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);
                    var lambda = parseFloat($scope.total_lambda);

                    var len = parseInt((time / step), 10);


                    var desc_time = [];
                    desc_time[0] = 0;
                    //рассчитываем время
                    for (i = 0; i < len; ++i) {
                        desc_time.push(step + desc_time[i]);
                    }

                    P = [];

                    for (i = 0; i <= len; i++) {
                        P[i] = 0;
                        for (var z = 0; z <= m; z += 1) {
                            b = Factorial(z);
                            P[i] = P[i] + ((Math.pow(lambda * desc_time[i], z)) / b);
                        }
                        P[i] = roundFloat(P[i] * Math.exp(-lambda * desc_time[i]), 7);
                    }

                    T = 1 / lambda * (m + 1);
                    $scope.reserved_2_T = roundFloat(T, 2);




                    // Шапка таблицы
                    column_def_reserved_2 = [{ name: 'time', displayName: 'Время, ч.' },
                        { name: 'p', displayName: 'P(t)' },

                    ];

                    //Строки таблицы
                    for (i = 0; i <= len; i += 1) {
                        var true_obj = {
                            "time": desc_time[i],
                            "p": P[i],
                        };

                        data_reserved_2.push(true_obj);
                    }


                    $scope.grid_reserved_2_opts.columnDefs = column_def_reserved_2;
                    $scope.grid_reserved_2_opts.data = data_reserved_2;


                    var chartGraph = [];
                    chartGraph.push({ "name": "P(t)", "data": P });
                    comparisonPush("Резервирование замещением", P);


                    $scope.highchart_reserved_2_P_conf = {
                        series: chartGraph,
                        title: {
                            text: 'Вероятность безотказной работы системы.',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            },
                            isDirty: true
                        },
                        yAxis: {
                            currentMin: 0,
                            currentMax: 1,
                            tickInterval: 0.1,
                            title: {
                                text: 'Вероятность безотказной работы, P'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        isDirty: true,

                    }
                }




                ///////Reserved 3 strat
                $scope.start_reserved_3 = function() {
                    if (check_reserved_3_inputs()) {
                        calculate_reserved_3();
                        $scope.show_reserved_3_tables = true;
                    } else {
                        window.alert("Данные не валидны. Проверьте введенные значения.");
                    }
                }


                var check_reserved_3_inputs = function() {
                    if ($scope.form_total.num_elem.$invalid ||
                        $scope.form_total.exec_time.$invalid ||
                        $scope.form_total.step.$invalid ||
                        $scope.form_total.total_lambda.$invalid ||
                        $scope.form_total.rezerv_elem.$invalid)
                        return 0;

                    return 1;
                }

                var calculate_reserved_3 = function() {

                    $scope.grid_reserved_3_opts.data.length = 0;

                    var m = parseInt($scope.rezerv_elem, 10);
                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);
                    var lambda = parseFloat($scope.total_lambda);
                    var N = parseInt($scope.num_elem, 10);

                    var len = parseInt((time / step), 10);


                    var desc_time = [];
                    desc_time[0] = 0;
                    //рассчитываем время
                    for (i = 0; i < len; ++i) {
                        desc_time.push(step + desc_time[i]);
                    }

                    var P = [];

                    var h = 0,
                        Pr = 1,
                        Sum = 0,
                        i = 0,
                        T = 0;


                    for (i = 0; i <= len; i++) {
                        P[i] = roundFloat(Math.pow((1 - Math.pow(1 - Math.exp(-lambda * desc_time[i]), m + 1)), N), 3);
                    }


                    h = (Factorial(N - 1)) / (lambda * (m + 1));

                    for (var z = 0; z <= m; z += 1) {
                        Pr = 1;

                        for (var x = 0; x <= N - 1; x += 1) {
                            Pr = Pr * (((z + 1) / (m + 1)) + x);

                        }

                        Sum = Sum + 1 / Pr;

                    }
                    T = h * Sum;
                    $scope.reserved_3_T = roundFloat(T, 2);

                    // Шапка таблицы
                    column_def_reserved_3 = [{ name: 'time', displayName: 'Время, ч.' },
                        { name: 'p', displayName: 'P(t)' },

                    ];

                    //Строки таблицы
                    for (i = 0; i <= len; i += 1) {
                        var true_obj = {
                            "time": desc_time[i],
                            "p": P[i],
                        };

                        data_reserved_3.push(true_obj);
                    }


                    $scope.grid_reserved_3_opts.columnDefs = column_def_reserved_3;
                    $scope.grid_reserved_3_opts.data = data_reserved_3;


                    var chartGraph = [];
                    chartGraph.push({ "name": "P(t)", "data": P });
                    // chartGraph.push({ "name": "f(t)", "data": f });
                    // chartGraph.push({ "name": "Lambda(t)", "data": lambda_sys });
                    comparisonPush("Поэлементное резервирование", P);


                    $scope.highchart_reserved_3_P_conf = {
                        series: chartGraph,
                        title: {
                            text: 'Вероятность безотказной работы системы.',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            },
                            isDirty: true
                        },
                        yAxis: {
                            currentMin: 0,
                            currentMax: 1,
                            tickInterval: 0.1,
                            title: {
                                text: 'Вероятность безотказной работы, P'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        isDirty: true,

                    }
                }




                ///////Reserved 3 strat
                $scope.start_reserved_4 = function() {
                    if (check_reserved_4_inputs()) {
                        calculate_reserved_4();
                        $scope.show_reserved_4_tables = true;
                    } else {
                        window.alert("Данные не валидны. Проверьте введенные значения.");
                    }
                }


                var check_reserved_4_inputs = function() {
                    if ($scope.form_total.num_elem.$invalid ||
                        $scope.form_total.exec_time.$invalid ||
                        $scope.form_total.step.$invalid ||
                        $scope.form_total.total_lambda.$invalid ||
                        $scope.form_total.rezerv_elem.$invalid)
                        return 0;

                    return 1;
                }

                var calculate_reserved_4 = function() {

                    $scope.grid_reserved_4_opts.data.length = 0;

                    var P = [];

                    var T = 0,
                        i = 0,
                        z = 0,
                        a = 0,
                        b = 0,
                        lambda0 = 0;


                    var h = parseInt($scope.rezerv_elem, 10);
                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);
                    var lambda = parseFloat($scope.total_lambda);
                    var N = parseInt($scope.num_elem, 10);

                    var len = parseInt((time / step), 10);

                    var lambda0 = N * lambda;


                    var desc_time = [];
                    desc_time.push(0);

                    //рассчитываем время
                    for (i = 0; i < len; ++i) {
                        desc_time.push(step + desc_time[i]);
                    }



                    for (i = 0; i <= len; i++) {

                        P[i] = 0;
                        for (z = 0; z <= h; z += 1) {

                            b = Factorial(z);
                            P[i] = P[i] + ((Math.pow(lambda0 * desc_time[i], z)) / b);

                        }
                        P[i] = roundFloat(P[i] * Math.exp(-lambda0 * desc_time[i]), 7);

                    }


                    T = (h + 1) / lambda0;
                    $scope.reserved_4_T = roundFloat(T, 2);

                    // Шапка таблицы
                    column_def_reserved_4 = [{ name: 'time', displayName: 'Время, ч.' },
                        { name: 'p', displayName: 'P(t)' },

                    ];

                    //Строки таблицы
                    for (i = 0; i <= len; i += 1) {
                        var true_obj = {
                            "time": desc_time[i],
                            "p": P[i],
                        };

                        data_reserved_4.push(true_obj);
                    }


                    $scope.grid_reserved_4_opts.columnDefs = column_def_reserved_4;
                    $scope.grid_reserved_4_opts.data = data_reserved_4;


                    var chartGraph = [];
                    chartGraph.push({ "name": "P(t)", "data": P });
                    // chartGraph.push({ "name": "f(t)", "data": f });
                    // chartGraph.push({ "name": "Lambda(t)", "data": lambda_sys });
                    comparisonPush("Скользящее резервирование", P);


                    $scope.highchart_reserved_4_P_conf = {
                        series: chartGraph,
                        title: {
                            text: 'Вероятность безотказной работы системы.',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            },
                            isDirty: true
                        },
                        yAxis: {
                            currentMin: 0,
                            currentMax: 1,
                            tickInterval: 0.1,
                            title: {
                                text: 'Вероятность безотказной работы, P'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        isDirty: true,

                    }
                }



                ///////Reserved 2 strat
                $scope.start_reserved_5 = function() {
                    if (check_reserved_5_inputs()) {
                        calculate_reserved_5();
                        $scope.show_reserved_5_tables = true;
                    } else {
                        window.alert("Данные не валидны. Проверьте введенные значения.");
                    }
                }


                var check_reserved_5_inputs = function() {
                    if ($scope.form_total.num_elem.$invalid ||
                        $scope.form_total.exec_time.$invalid ||
                        $scope.form_total.step.$invalid ||
                        $scope.form_total.total_lambda.$invalid ||
                        $scope.form_total.rezerv_elem.$invalid)
                        return 0;

                    return 1;
                }

                var calculate_reserved_5 = function() {

                    $scope.grid_reserved_5_opts.data.length = 0;
                    var i = 0,
                        T = 0;


                    var n = parseInt($scope.num_elem, 10)
                    var m = parseInt($scope.rezerv_elem, 10);

                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);
                    var lambda = parseFloat($scope.total_lambda);

                    var len = parseInt((time / step), 10);


                    var desc_time = [];
                    desc_time[0] = 0;
                    //рассчитываем время
                    for (i = 0; i < len; ++i) {
                        desc_time.push(step + desc_time[i]);
                    }


                    var P = new Array(n);
                    var f = new Array(n);
                    for (i = 0; i < n; ++i) {
                        P[i] = new Array(len);
                        f[i] = new Array(len);
                    }


                    for (i = 0; i < n; i += 1) {
                        for (var j = 0; j <= len; j += 1) {
                            var lam = 1 - Math.exp(-lambda * desc_time[j]);
                            P[i][j] = roundFloat(binomialdistribution(i, n, lam), 5);
                        }
                    }

                    var x =0;
                    for(var i = 0;i<m;i++){
                        x=x+(1/(n+i));
                    }
                    $scope.reserved_5_T = roundFloat((1/lambda)*x,3);

                    // T = 1 / lambda * (m + 1);
                    // $scope.reserved_5_T = roundFloat(T, 2);

                    // Шапка таблицы
                    column_def_reserved_5 = [{ name: 'time', displayName: 'Время, ч.' }
                        // { name: 'p', displayName: 'P(t)' },

                    ];
                    for (i = 1; i <= n; i += 1) {
                        column_def_reserved_5.push({ name: 'p' + i, displayName: 'P' + i + '(t)' });
                    }


                    //Строки таблицы
                    for (i = 0; i <= len; i += 1) {
                        var true_obj = {
                            "time": desc_time[i]
                        };
                        for (j = 0; j < n; j += 1) {
                            true_obj['p' + (j+1)] = P[j][i];
                        }
                        data_reserved_5.push(true_obj);
                    }

                    comparisonPush("С дробной кратностью", P[n-1]);

                    $scope.grid_reserved_5_opts.columnDefs = column_def_reserved_5;
                    $scope.grid_reserved_5_opts.data = data_reserved_5;


                    var chartGraph = [];
                    for (j = 0; j < n; j += 1) {
                        chartGraph.push({ "name": 'P' + (j+1) + '(t)', "data": P[j] });
                    }
                    //chartGraph.push({ "name": "P(t)", "data": P });
                    // comparisonPush("Резервирование замещением", P);


                    $scope.highchart_reserved_5_P_conf = {
                        series: chartGraph,
                        title: {
                            text: 'Вероятность безотказной работы системы.',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            },
                            isDirty: true
                        },
                        yAxis: {
                            currentMin: 0,
                            currentMax: 1,
                            tickInterval: 0.1,
                            title: {
                                text: 'Вероятность  безотказной работы, P'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        isDirty: true,

                    }
                }




                //
                // Comparison part
                //
                var comparisonPush = function(name, data) {
                    var comparisonSeriesLength = comparisonSeries.length;

                    var flag = true;
                    for (var i = 0; i < comparisonSeriesLength; i += 1) {
                        if (comparisonSeries[i].name === name) {
                            comparisonSeries[i].data = data;
                            flag = false;
                            break;
                        }
                    }
                    if (flag || comparisonSeriesLength === 0) {
                        comparisonSeries.push({ "name": name, "data": data });
                    }
                }

                var comparisonSeries = [];
                $scope.comparison_calc = function() {
                    //Highcharts.setOptions(Highcharts.comparisonTheme);

                    var time = parseInt($scope.exec_time, 10);
                    var step = parseInt($scope.step, 10);
                    var len = parseInt((time / step), 10);

                    var desc_time = [];
                    desc_time.push(0);

                    // рассчитываем время
                    for (var i = 0; i < len; ++i) {
                        desc_time.push(step + desc_time[i]);
                    }


                    $scope.highchart_comparison_conf = {
                        setOptions: {
                            chart: {

                                marginBottom: 110,
                                marginTop: 60
                            }
                        },
                        series: comparisonSeries,
                        title: {
                            text: 'Вероятность безотказой работы системы',
                        },
                        credits: {
                            enabled: true
                        },
                        xAxis: {

                            categories: desc_time,
                            title: {
                                text: 'Время испытания, t'
                            },
                            isDirty: true
                        },
                        yAxis: {
                            currentMin: 0,
                            currentMax: 1,
                            tickInterval: 0.1,
                            title: {
                                text: 'Вероятность безотказной работы, P(t)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        isDirty: true

                    }
                }




                ////SOME GUI THINGS

                $scope.dropdown_data = {
                    repeatSelect: false,
                    availableOptions: [
                        { id: '0', name: 'Экспоненциальный' },
                        { id: '1', name: 'Гамма' },
                        { id: '2', name: 'Усеченный нормальный' },
                        { id: '3', name: 'Релея' },
                        { id: '4', name: 'Вейбулла' }
                    ],
                };

                $scope.test_data = function() {
                    $scope.num_elem = 5;
                    $scope.exec_time = 2000;
                    $scope.step = 100;
                    $scope.num_changed();

                    $scope.lambda_exp = 0.0002;

                    $scope.alpha_gam = 7;
                    $scope.beta_gam = 300;

                    $scope.m_zero = 2000;
                    $scope.b_zero = 900;

                    $scope.lambda_rel = 0.00000008;

                    $scope.alpha_veib = 2;
                    $scope.beta_veib = 1800;

                    $scope.total_lambda = 0.05;

                    $scope.rezerv_elem = 5

                    $scope.dropdown_data.elems = {}
                    $scope.dropdown_data.elems[0] = "0";
                    $scope.dropdown_data.elems[1] = "1";
                    $scope.dropdown_data.elems[2] = "2";
                    $scope.dropdown_data.elems[3] = "3";
                    $scope.dropdown_data.elems[4] = "4";

                    var enable_if_arr = [1, 1, 1, 1, 1];
                    $scope.exp_if = enable_if_arr[0];
                    $scope.gamma_if = enable_if_arr[1];
                    $scope.usech_if = enable_if_arr[2];
                    $scope.relei_if = enable_if_arr[3];
                    $scope.veib_if = enable_if_arr[4];
                };


                var column_def = [],
                    data_1 = [],
                    column_def_p = [],
                    data_p = [],
                    column_def_f = [],
                    data_f = [],
                    column_def_reserved_1 = [],
                    data_reserved_1 = [],
                    column_def_reserved_2 = [],
                    data_reserved_2 = [],
                    column_def_reserved_3 = [],
                    data_reserved_3 = [],
                    column_def_reserved_4 = [],
                    data_reserved_4 = [],
                    column_def_reserved_5 = [],
                    data_reserved_5 = [];



                $scope.grid_opts = {
                    columnDefs: column_def,
                    data: data_1
                };

                $scope.grid_opts_p = {
                    columnDefs: column_def_p,
                    data: data_p
                };

                $scope.grid_opts_f = {
                    columnDefs: column_def_f,
                    data: data_f
                };

                $scope.grid_reserved_1_opts = {
                    columnDefs: column_def_reserved_1,
                    data: data_reserved_1
                };

                $scope.grid_reserved_2_opts = {
                    columnDefs: column_def_reserved_2,
                    data: data_reserved_2
                };

                $scope.grid_reserved_3_opts = {
                    columnDefs: column_def_reserved_3,
                    data: data_reserved_3
                };
                $scope.grid_reserved_4_opts = {
                    columnDefs: column_def_reserved_4,
                    data: data_reserved_4
                };
                $scope.grid_reserved_5_opts = {
                    columnDefs: column_def_reserved_5,
                    data: data_reserved_5
                };


                $scope.grid_opts.enableHorizontalScrollbar = 0;
                $scope.grid_opts.enableVerticalScrollbar = 0;
                $scope.grid_opts_p.enableHorizontalScrollbar = 0;
                $scope.grid_opts_f.enableHorizontalScrollbar = 0;
                $scope.grid_reserved_1_opts.enableHorizontalScrollbar = 0;
                $scope.grid_reserved_2_opts.enableHorizontalScrollbar = 0;
                $scope.grid_reserved_3_opts.enableHorizontalScrollbar = 0;
                $scope.grid_reserved_4_opts.enableHorizontalScrollbar = 0;
                $scope.grid_reserved_5_opts.enableHorizontalScrollbar = 0;


                Highcharts.theme = {
                    plotOptions: {
                        line: {
                            animation: false,
                            enableMouseTracking: true,
                            stickyTracking: true,
                            shadow: false,
                            dataLabels: {
                                style: {
                                    textShadow: false
                                }
                            }
                        }
                    },
                    chart: {
                        type: 'line',
                        backgroundColor: null,
                        style: {
                            fontFamily: "Dosis, sans-serif"
                        },
                        marginLeft: 60,
                        marginBottom: 110,
                        marginTop: 38
                    },


                    tooltip: {
                        borderWidth: 1,
                        backgroundColor: 'rgba(219,219,216,0.8)',
                        shadow: false
                    },
                    legend: {
                        itemStyle: {
                            fontSize: '12px'
                        }
                    },
                    xAxis: {
                        isDirty: true,
                        gridLineWidth: 1,
                        labels: {
                            style: {
                                fontSize: '12px'
                            }
                        }
                    },
                    yAxis: {
                        labels: {
                            style: {
                                fontSize: '12px'
                            }
                        }
                    },

                    // General
                    background2: '#F0F0EA'

                };
                // Apply the theme
                Highcharts.setOptions(Highcharts.theme);


                // Highcharts.comparisonTheme = {
                //     chart: {
                //         type: 'line',
                //         backgroundColor: null,
                //         style: {
                //             fontFamily: "Dosis, sans-serif"
                //         },
                //         marginLeft: 60,
                //         marginBottom: 110,
                //         marginTop: 60
                //     },


                //     tooltip: {
                //         borderWidth: 1,
                //         backgroundColor: 'rgba(219,219,216,0.8)',
                //         shadow: false
                //     },
                //     legend: {
                //         itemStyle: {
                //             fontSize: '12px'
                //         }
                //     },
                //     xAxis: {
                //         isDirty: true,
                //         gridLineWidth: 1,
                //         labels: {
                //             style: {
                //                 fontSize: '12px'
                //             }
                //         }
                //     },
                //     yAxis: {
                //         labels: {
                //             style: {
                //                 fontSize: '12px'
                //             }
                //         }
                //     },

                //     // General
                //     background2: '#F0F0EA'

                // };

                ////////////////////////////

                $scope.openModal = function() {

                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalDialogController'

                    });

                    modalInstance.result.then(function(selectedItem) {
                        $scope.elemName = selectedItem.name;
                        $scope.total_lambda = selectedItem.lambda;

                    });
                    //$scope.lammm = ModalDialogDataShareService.getLambda();
                };




                function stringArrToIntArr(a) {
                    var int_arr = [];
                    for (var value in a) {
                        int_arr.push(parseInt(a[value], 10));
                    }
                    return int_arr;
                }

                function qsort(a) {
                    if (a.length <= 1) return a;

                    var left = [],
                        right = [],
                        pivot = a[0];

                    for (var i = 1; i < a.length; i++) {
                        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
                    }

                    return qsort(left).concat(pivot, qsort(right));
                }

                function delDoubles(a) {
                    if (a.length <= 1) return a;

                    var arr = [];
                    for (var i = 0; i <= a.length; i++) {
                        if (a[i] != a[i + 1]) {
                            arr.push(a[i]);
                        }
                    }
                    return arr;
                }

                function toBinary(a) {
                    var arr = [];

                    for (var i = 0; i < 5; i += 1) {
                        arr[i] = 0;
                    }
                    for (var i = 0; i < 5; i += 1) {
                        arr[a[i]] = 1;
                    }

                    return arr;
                }


                //////////////////////
                //////////////////////
                //MATH STUFF



                var binomialdistribution = function(k, n, p) {
                    var result = 0;
                    var dk = 0;
                    var dn = 0;

                    if (p >= 0 && p <= 1) {
                    }
                    if (k >= -1 && k <= n) {
                    }

                    if (k == -1) {
                        result = 0;
                        return result;
                    }
                    if (k == n) {
                        result = 1;
                        return result;
                    }
                    dn = n - k;
                    if (k == 0) {
                        dk = Math.pow(1.0 - p, dn);
                    } else {
                        dk = k + 1;
                        dk = incompletebeta(dn, dk, 1.0 - p);
                    }
                    result = dk;
                    return result;
                }


                var math = {
                    machineepsilon: 5E-16,
                    maxrealnumber: 1E300,
                    minrealnumber: 1E-300
                };


                var incompletebeta = function(a, b, x) {
                    var result = 0;
                    var t = 0;
                    var xc = 0;
                    var w = 0;
                    var y = 0;
                    var flag = 0;
                    var sg = 0;
                    var big = 0;
                    var biginv = 0;
                    var maxgam = 0;
                    var minlog = 0;
                    var maxlog = 0;



                    big = 4.503599627370496e15;
                    biginv = 2.22044604925031308085e-16;
                    maxgam = 171.624376956302725;
                    minlog = Math.log(math.minrealnumber);
                    maxlog = Math.log(math.maxrealnumber);

                    if ((a) > (0) && (b) > (0)) {
                    }
                    if ((x) >= (0) && (x) <= (1)) {
                    }

                    if ((x) == (0)) {
                        result = 0;
                        return result;
                    }
                    if ((x) == (1)) {
                        result = 1;
                        return result;
                    }
                    flag = 0;
                    if ((b * x) <= (1.0) & (x) <= (0.95)) {
                        result = incompletebetaps(a, b, x, maxgam);
                        return result;
                    }
                    w = 1.0 - x;
                    if ((x) > (a / (a + b))) {
                        flag = 1;
                        t = a;
                        a = b;
                        b = t;
                        xc = x;
                        x = w;
                    } else {
                        xc = w;
                    }
                    if ((flag == 1 & (b * x) <= (1.0)) & (x) <= (0.95)) {
                        t = incompletebetaps(a, b, x, maxgam);
                        if ((t) <= (math.machineepsilon)) {
                            result = 1.0 - math.machineepsilon;
                        } else {
                            result = 1.0 - t;
                        }
                        return result;
                    }
                    y = x * (a + b - 2.0) - (a - 1.0);
                    if ((y) < (0.0)) {
                        w = incompletebetafe(a, b, x, big, biginv);
                    } else {
                        w = incompletebetafe2(a, b, x, big, biginv) / xc;
                    }
                    y = a * Math.log(x);
                    t = b * Math.log(xc);
                    if (((a + b) < (maxgam) && (Math.abs(y)) < (maxlog)) && (Math.abs(t)) < (maxlog)) {
                        t = Math.pow(xc, b);
                        t = t * Math.pow(x, a);
                        t = t / a;
                        t = t * w;
                        t = t * (gammafunction(a + b) / (gammafunction(a) * gammafunction(b)));
                        if (flag == 1) {
                            if ((t) <= (math.machineepsilon)) {
                                result = 1.0 - math.machineepsilon;
                            } else {
                                result = 1.0 - t;
                            }
                        } else {
                            result = t;
                        }
                        return result;
                    }
                    y = y + t + lngamma(a + b, sg) - lngamma(a, sg) - lngamma(b, sg);
                    y = y + Math.log(w / a);
                    if ((y) < (minlog)) {
                        t = 0.0;
                    } else {
                        t = Math.exp(y);
                    }
                    if (flag == 1) {
                        if ((t) <= (math.machineepsilon)) {
                            t = 1.0 - math.machineepsilon;
                        } else {
                            t = 1.0 - t;
                        }
                    }
                    result = t;
                    return result;
                }

                var incompletebetafe = function(a, b, x, big, biginv) {
                    var result = 0;
                    var xk = 0;
                    var pk = 0;
                    var pkm1 = 0;
                    var pkm2 = 0;
                    var qk = 0;
                    var qkm1 = 0;
                    var qkm2 = 0;
                    var k1 = 0;
                    var k2 = 0;
                    var k3 = 0;
                    var k4 = 0;
                    var k5 = 0;
                    var k6 = 0;
                    var k7 = 0;
                    var k8 = 0;
                    var r = 0;
                    var t = 0;
                    var ans = 0;
                    var thresh = 0;
                    var n = 0;

                    k1 = a;
                    k2 = a + b;
                    k3 = a;
                    k4 = a + 1.0;
                    k5 = 1.0;
                    k6 = b - 1.0;
                    k7 = k4;
                    k8 = a + 2.0;
                    pkm2 = 0.0;
                    qkm2 = 1.0;
                    pkm1 = 1.0;
                    qkm1 = 1.0;
                    ans = 1.0;
                    r = 1.0;
                    n = 0;
                    thresh = 3.0 * math.machineepsilon;
                    do {
                        xk = -(x * k1 * k2 / (k3 * k4));
                        pk = pkm1 + pkm2 * xk;
                        qk = qkm1 + qkm2 * xk;
                        pkm2 = pkm1;
                        pkm1 = pk;
                        qkm2 = qkm1;
                        qkm1 = qk;
                        xk = x * k5 * k6 / (k7 * k8);
                        pk = pkm1 + pkm2 * xk;
                        qk = qkm1 + qkm2 * xk;
                        pkm2 = pkm1;
                        pkm1 = pk;
                        qkm2 = qkm1;
                        qkm1 = qk;
                        if ((qk) != (0)) {
                            r = pk / qk;
                        }
                        if ((r) != (0)) {
                            t = Math.abs((ans - r) / r);
                            ans = r;
                        } else {
                            t = 1.0;
                        }
                        if ((t) < (thresh)) {
                            break;
                        }
                        k1 = k1 + 1.0;
                        k2 = k2 + 1.0;
                        k3 = k3 + 2.0;
                        k4 = k4 + 2.0;
                        k5 = k5 + 1.0;
                        k6 = k6 - 1.0;
                        k7 = k7 + 2.0;
                        k8 = k8 + 2.0;
                        if ((Math.abs(qk) + Math.abs(pk)) > (big)) {
                            pkm2 = pkm2 * biginv;
                            pkm1 = pkm1 * biginv;
                            qkm2 = qkm2 * biginv;
                            qkm1 = qkm1 * biginv;
                        }
                        if ((Math.abs(qk)) < (biginv) | (Math.abs(pk)) < (biginv)) {
                            pkm2 = pkm2 * big;
                            pkm1 = pkm1 * big;
                            qkm2 = qkm2 * big;
                            qkm1 = qkm1 * big;
                        }
                        n = n + 1;
                    }
                    while (n != 300);
                    result = ans;
                    return result;
                }

                var incompletebetafe2 = function(a, b, x, big, biginv) {
                    var result = 0;
                    var xk = 0;
                    var pk = 0;
                    var pkm1 = 0;
                    var pkm2 = 0;
                    var qk = 0;
                    var qkm1 = 0;
                    var qkm2 = 0;
                    var k1 = 0;
                    var k2 = 0;
                    var k3 = 0;
                    var k4 = 0;
                    var k5 = 0;
                    var k6 = 0;
                    var k7 = 0;
                    var k8 = 0;
                    var r = 0;
                    var t = 0;
                    var ans = 0;
                    var z = 0;
                    var thresh = 0;
                    var n = 0;

                    k1 = a;
                    k2 = b - 1.0;
                    k3 = a;
                    k4 = a + 1.0;
                    k5 = 1.0;
                    k6 = a + b;
                    k7 = a + 1.0;
                    k8 = a + 2.0;
                    pkm2 = 0.0;
                    qkm2 = 1.0;
                    pkm1 = 1.0;
                    qkm1 = 1.0;
                    z = x / (1.0 - x);
                    ans = 1.0;
                    r = 1.0;
                    n = 0;
                    thresh = 3.0 * math.machineepsilon;
                    do {
                        xk = -(z * k1 * k2 / (k3 * k4));
                        pk = pkm1 + pkm2 * xk;
                        qk = qkm1 + qkm2 * xk;
                        pkm2 = pkm1;
                        pkm1 = pk;
                        qkm2 = qkm1;
                        qkm1 = qk;
                        xk = z * k5 * k6 / (k7 * k8);
                        pk = pkm1 + pkm2 * xk;
                        qk = qkm1 + qkm2 * xk;
                        pkm2 = pkm1;
                        pkm1 = pk;
                        qkm2 = qkm1;
                        qkm1 = qk;
                        if ((qk) != (0)) {
                            r = pk / qk;
                        }
                        if ((r) != (0)) {
                            t = Math.abs((ans - r) / r);
                            ans = r;
                        } else {
                            t = 1.0;
                        }
                        if ((t) < (thresh)) {
                            break;
                        }
                        k1 = k1 + 1.0;
                        k2 = k2 - 1.0;
                        k3 = k3 + 2.0;
                        k4 = k4 + 2.0;
                        k5 = k5 + 1.0;
                        k6 = k6 + 1.0;
                        k7 = k7 + 2.0;
                        k8 = k8 + 2.0;
                        if ((Math.abs(qk) + Math.abs(pk)) > (big)) {
                            pkm2 = pkm2 * biginv;
                            pkm1 = pkm1 * biginv;
                            qkm2 = qkm2 * biginv;
                            qkm1 = qkm1 * biginv;
                        }
                        if ((Math.abs(qk)) < (biginv) | (Math.abs(pk)) < (biginv)) {
                            pkm2 = pkm2 * big;
                            pkm1 = pkm1 * big;
                            qkm2 = qkm2 * big;
                            qkm1 = qkm1 * big;
                        }
                        n = n + 1;
                    }
                    while (n != 300);
                    result = ans;
                    return result;
                }

                var incompletebetaps = function(a, b, x, maxgam) {
                    var result = 0;
                    var s = 0;
                    var t = 0;
                    var u = 0;
                    var v = 0;
                    var n = 0;
                    var t1 = 0;
                    var z = 0;
                    var ai = 0;
                    var sg = 0;

                    ai = 1.0 / a;
                    u = (1.0 - b) * x;
                    v = u / (a + 1.0);
                    t1 = v;
                    t = u;
                    n = 2.0;
                    s = 0.0;
                    z = math.machineepsilon * ai;
                    while ((Math.abs(v)) > (z)) {
                        u = (n - b) * x / n;
                        t = t * u;
                        v = t / (a + n);
                        s = s + v;
                        n = n + 1.0;
                    }
                    s = s + t1;
                    s = s + ai;
                    u = a * Math.log(x);
                    if ((a + b) < (maxgam) & (Math.abs(u)) < (Math.log(math.maxrealnumber))) {
                        t = gammafunction(a + b) / (gammafunction(a) * gammafunction(b));
                        s = s * t * Math.pow(x, a);
                    } else {
                        t = lngamma(a + b, sg) - lngamma(a, sg) - lngamma(b, sg) + u + Math.log(s);
                        if ((t) < (Math.log(math.minrealnumber))) {
                            s = 0.0;
                        } else {
                            s = Math.exp(t);
                        }
                    }
                    result = s;
                    return result;
                }


                var gammafunction = function(x) {
                    var result = 0;
                    var p = 0;
                    var pp = 0;
                    var q = 0;
                    var qq = 0;
                    var z = 0;
                    var i = 0;
                    var sgngam = 0;

                    sgngam = 1;
                    q = Math.abs(x);
                    if ((q) > (33.0)) {
                        if ((x) < (0.0)) {
                            p = Math.floor(q);
                            i = Math.round(p);
                            if (i % 2 == 0) {
                                sgngam = -1;
                            }
                            z = q - p;
                            if ((z) > (0.5)) {
                                p = p + 1;
                                z = q - p;
                            }
                            z = q * Math.sin(Math.PI * z);
                            z = Math.abs(z);
                            z = Math.PI / (z * gammastirf(q));
                        } else {
                            z = gammastirf(x);
                        }
                        result = sgngam * z;
                        return result;
                    }
                    z = 1;
                    while ((x) >= (3)) {
                        x = x - 1;
                        z = z * x;
                    }
                    while ((x) < (0)) {
                        if ((x) > (-0.000000001)) {
                            result = z / ((1 + 0.5772156649015329 * x) * x);
                            return result;
                        }
                        z = z / x;
                        x = x + 1;
                    }
                    while ((x) < (2)) {
                        if ((x) < (0.000000001)) {
                            result = z / ((1 + 0.5772156649015329 * x) * x);
                            return result;
                        }
                        z = z / x;
                        x = x + 1.0;
                    }
                    if ((x) == (2)) {
                        result = z;
                        return result;
                    }
                    x = x - 2.0;
                    pp = 1.60119522476751861407E-4;
                    pp = 1.19135147006586384913E-3 + x * pp;
                    pp = 1.04213797561761569935E-2 + x * pp;
                    pp = 4.76367800457137231464E-2 + x * pp;
                    pp = 2.07448227648435975150E-1 + x * pp;
                    pp = 4.94214826801497100753E-1 + x * pp;
                    pp = 9.99999999999999996796E-1 + x * pp;
                    qq = -2.31581873324120129819E-5;
                    qq = 5.39605580493303397842E-4 + x * qq;
                    qq = -4.45641913851797240494E-3 + x * qq;
                    qq = 1.18139785222060435552E-2 + x * qq;
                    qq = 3.58236398605498653373E-2 + x * qq;
                    qq = -2.34591795718243348568E-1 + x * qq;
                    qq = 7.14304917030273074085E-2 + x * qq;
                    qq = 1.00000000000000000320 + x * qq;
                    result = z * pp / qq;
                    return result;
                }

                var gammastirf = function(x) {
                    var result = 0;
                    var y = 0;
                    var w = 0;
                    var v = 0;
                    var stir = 0;

                    w = 1 / x;
                    stir = 7.87311395793093628397E-4;
                    stir = -2.29549961613378126380E-4 + w * stir;
                    stir = -2.68132617805781232825E-3 + w * stir;
                    stir = 3.47222221605458667310E-3 + w * stir;
                    stir = 8.33333333333482257126E-2 + w * stir;
                    w = 1 + w * stir;
                    y = Math.exp(x);
                    if ((x) > (143.01608)) {
                        v = Math.pow(x, 0.5 * x - 0.25);
                        y = v * (v / y);
                    } else {
                        y = Math.pow(x, x - 0.5) / y;
                    }
                    result = 2.50662827463100050242 * y * w;
                    return result;
                }


                var Factorial = function(n) {
                    if (n === 0)
                        return 1;
                    else
                        return n * Factorial(n - 1);
                }

                var roundFloat = function(number, del) {
                    var residue = Math.pow(10, del)
                    return (Math.round(number * residue) / residue);
                };

                var GammLn = function(x) {
                    var lg = 0,
                        lg1 = 0;
                    var cof = new Array();
                    cof = [2.5066282746310005, 1.0000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5, ];

                    lg1 = Math.log(cof[0] * (cof[1] + cof[2] / (x + 1) + cof[3] / (x + 2) + cof[4] / (x + 3) + cof[5] / (x + 4) + cof[6] / (x + 5) + cof[7] / (x + 6)) / x);
                    lg = (x + 0.5) * Math.log(x + 5.5) - (x + 5.5) + lg1;
                    return lg;
                };

                var Gamma = function(x) {
                    return (Math.exp(GammLn(x)));
                };

                var errorfunction = function(x) {
                    var result = 0,
                        xsq = 0,
                        s = 0,
                        p = 0,
                        q = 0;

                    s = Math.sign(x);
                    x = Math.abs(x);
                    if (x < 0.5) {
                        xsq = x * x;
                        p = 0.007547728033418631287834;
                        p = 0.288805137207594084924010 + xsq * p;
                        p = 14.3383842191748205576712 + xsq * p;
                        p = 38.0140318123903008244444 + xsq * p;
                        p = 3017.82788536507577809226 + xsq * p;
                        p = 7404.07142710151470082064 + xsq * p;
                        p = 80437.3630960840172832162 + xsq * p;
                        q = 0.0;
                        q = 1.00000000000000000000000 + xsq * q;
                        q = 38.0190713951939403753468 + xsq * q;
                        q = 658.070155459240506326937 + xsq * q;
                        q = 6379.60017324428279487120 + xsq * q;
                        q = 34216.5257924628539769006 + xsq * q;
                        q = 80437.3630960840172826266 + xsq * q;
                        result = s * 1.1283791670955125738961589031 * x * p / q;
                        return result;
                    }
                    if (x >= 10) {
                        result = s;
                        return result;
                    }
                    result = s * (1 - errorfunctionc(x));
                    return result;
                };

                var errorfunctionc = function(x) {
                    var result = 0,
                        p = 0,
                        q = 0;

                    if (x < 0) {
                        result = 2 - errorfunctionc(-x);
                        return result;
                    }
                    if (x < 0.5) {
                        result = 1.0 - errorfunction(x);
                        return result;
                    }
                    if (x >= 10) {
                        result = 0;
                        return result;
                    }
                    p = 0.0;
                    p = 0.5641877825507397413087057563 + x * p;
                    p = 9.675807882987265400604202961 + x * p;
                    p = 77.08161730368428609781633646 + x * p;
                    p = 368.5196154710010637133875746 + x * p;
                    p = 1143.262070703886173606073338 + x * p;
                    p = 2320.439590251635247384768711 + x * p;
                    p = 2898.0293292167655611275846 + x * p;
                    p = 1826.3348842295112592168999 + x * p;
                    q = 1.0;
                    q = 17.14980943627607849376131193 + x * q;
                    q = 137.1255960500622202878443578 + x * q;
                    q = 661.7361207107653469211984771 + x * q;
                    q = 2094.384367789539593790281779 + x * q;
                    q = 4429.612803883682726711528526 + x * q;
                    q = 6089.5424232724435504633068 + x * q;
                    q = 4958.82756472114071495438422 + x * q;
                    q = 1826.3348842295112595576438 + x * q;
                    result = Math.exp(-x * x) * p / q;
                    return result;

                };

                var normaldistribution = function(x) {

                    var result = 0;

                    //result = 0.5 * (errorfunction(x / Math.Sqrt(2)) + 1);
                    result = 0.5 * (errorfunction(x / Math.sqrt(2)));
                    return result;
                };

                var lngamma = function(x, sgngam) {
                    var result = 0,
                        a = 0,
                        b = 0,
                        c = 0,
                        p = 0,
                        q = 0,
                        u = 0,
                        w = 0,
                        z = 0,
                        i = 0,
                        logpi = 0,
                        ls2pi = 0,
                        tmp = 0;

                    sgngam = 0;

                    sgngam = 1;
                    logpi = 1.14472988584940017414;
                    ls2pi = 0.91893853320467274178;
                    if ((x) < (-34.0)) {
                        q = -x;
                        w = lngamma(q, tmp);
                        p = Math.floor(q);
                        i = Math.round(p);
                        if (i % 2 == 0) {
                            sgngam = -1;
                        } else {
                            sgngam = 1;
                        }
                        z = q - p;
                        if ((z) > (0.5)) {
                            p = p + 1;
                            z = p - q;
                        }
                        z = q * Math.sin(Math.PI * z);
                        result = logpi - Math.log(z) - w;
                        return result;
                    }
                    if ((x) < (13)) {
                        z = 1;
                        p = 0;
                        u = x;
                        while ((u) >= (3)) {
                            p = p - 1;
                            u = x + p;
                            z = z * u;
                        }
                        while ((u) < (2)) {
                            z = z / u;
                            p = p + 1;
                            u = x + p;
                        }
                        if ((z) < (0)) {
                            sgngam = -1;
                            z = -z;
                        } else {
                            sgngam = 1;
                        }
                        if ((u) == (2)) {
                            result = Math.log(z);
                            return result;
                        }
                        p = p - 2;
                        x = x + p;
                        b = -1378.25152569120859100;
                        b = -38801.6315134637840924 + x * b;
                        b = -331612.992738871184744 + x * b;
                        b = -1162370.97492762307383 + x * b;
                        b = -1721737.00820839662146 + x * b;
                        b = -853555.664245765465627 + x * b;
                        c = 1;
                        c = -351.815701436523470549 + x * c;
                        c = -17064.2106651881159223 + x * c;
                        c = -220528.590553854454839 + x * c;
                        c = -1139334.44367982507207 + x * c;
                        c = -2532523.07177582951285 + x * c;
                        c = -2018891.41433532773231 + x * c;
                        p = x * b / c;
                        result = Math.log(z) + p;
                        return result;
                    }
                    q = (x - 0.5) * Math.log(x) - x + ls2pi;
                    if ((x) > (100000000)) {
                        result = q;
                        return result;
                    }
                    p = 1 / (x * x);
                    if ((x) >= (1000.0)) {
                        q = q + ((7.9365079365079365079365 * 0.0001 * p - 2.7777777777777777777778 * 0.001) * p + 0.0833333333333333333333) / x;
                    } else {
                        a = 8.11614167470508450300 * 0.0001;
                        a = -(5.95061904284301438324 * 0.0001) + p * a;
                        a = 7.93650340457716943945 * 0.0001 + p * a;
                        a = -(2.77777777730099687205 * 0.001) + p * a;
                        a = 8.33333333333331927722 * 0.01 + p * a;
                        q = q + a / x;
                    }
                    result = q;
                    return result;
                };

                var incompletegamma = function(a, x) {
                    var result = 0,
                        igammaepsilon = 0,
                        ans = 0,
                        ax = 0,
                        c = 0,
                        r = 0,
                        tmp = 0;

                    igammaepsilon = 0.000000000000001;
                    if ((x) <= (0) | (a) <= (0)) {
                        result = 0;
                        return result;
                    }
                    if ((x) > (1) & (x) > (a)) {
                        result = 1 - incompletegammac(a, x);
                        return result;
                    }
                    ax = a * Math.log(x) - x - lngamma(a, tmp);
                    if ((ax) < (-709.78271289338399)) {
                        result = 0;
                        return result;
                    }
                    ax = Math.exp(ax);
                    r = a;
                    c = 1;
                    ans = 1;
                    do {
                        r = r + 1;
                        c = c * x / r;
                        ans = ans + c;
                    }
                    while ((c / ans) > (igammaepsilon));
                    result = ans * ax / a;
                    return result;
                };


                var incompletegammac = function(a, x) {
                    var result = 0,
                        igammaepsilon = 0,
                        igammabignumber = 0,
                        igammabignumberinv = 0,
                        ans = 0,
                        ax = 0,
                        c = 0,
                        yc = 0,
                        r = 0,
                        t = 0,
                        y = 0,
                        z = 0,
                        pk = 0,
                        pkm1 = 0,
                        pkm2 = 0,
                        qk = 0,
                        qkm1 = 0,
                        qkm2 = 0,
                        tmp = 0;

                    igammaepsilon = 0.000000000000001;
                    igammabignumber = 4503599627370496.0;
                    igammabignumberinv = 2.22044604925031308085 * 0.0000000000000001;
                    if ((x) <= (0) | (a) <= (0)) {
                        result = 1;
                        return result;
                    }
                    if ((x) < (1) | (x) < (a)) {
                        result = 1 - incompletegamma(a, x);
                        return result;
                    }
                    ax = a * Math.log(x) - x - lngamma(a, tmp);
                    if ((ax) < (-709.78271289338399)) {
                        result = 0;
                        return result;
                    }
                    ax = Math.exp(ax);
                    y = 1 - a;
                    z = x + y + 1;
                    c = 0;
                    pkm2 = 1;
                    qkm2 = x;
                    pkm1 = x + 1;
                    qkm1 = z * x;
                    ans = pkm1 / qkm1;
                    do {
                        c = c + 1;
                        y = y + 1;
                        z = z + 2;
                        yc = y * c;
                        pk = pkm1 * z - pkm2 * yc;
                        qk = qkm1 * z - qkm2 * yc;
                        if ((qk) != (0)) {
                            r = pk / qk;
                            t = Math.abs((ans - r) / r);
                            ans = r;
                        } else {
                            t = 1;
                        }
                        pkm2 = pkm1;
                        pkm1 = pk;
                        qkm2 = qkm1;
                        qkm1 = qk;
                        if ((Math.abs(pk)) > (igammabignumber)) {
                            pkm2 = pkm2 * igammabignumberinv;
                            pkm1 = pkm1 * igammabignumberinv;
                            qkm2 = qkm2 * igammabignumberinv;
                            qkm1 = qkm1 * igammabignumberinv;
                        }
                    }
                    while ((t) > (igammaepsilon));
                    result = ans * ax;
                    return result;
                };
                //MATH
                //////////////////////
                //////////////////////

            };
            return ["$scope", "$modal", "$resource", ModelCtrl];
        });


}(define));
