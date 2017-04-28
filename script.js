(function () {
    var today = new Date();  //берем сегодняшнюю дату 
    var todayparser = today.toISOString().substr(0, 10).split(/-/); //рабиваеем ее по число, месяц, год
    var todayview = today.toISOString().substr(0, 10); // это для вывода даты пользователю в формате ISO
    function getGold() {
        jQuery.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.cbr.ru%2Fscripts%2Fxml_metall.asp%3Fdate_req1%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "%26date_req2%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "'&format=json&diagnostics=true&callback=").done(function (obj) {//  обращаемся (подставляем сегодняшнюю дату) к cbr.ru через запрос к Yahoo developer, который возвращает нам json (XML to JSON)
            var gold = +obj.query.results.body.metall.record[0].sell.replace(/,/g, "."); //вытаскиваем из Json золото и преобразуем его в число заменив запятую
            getUsd(gold); //передаем чистое золото след. функции 
        });
        var rem = document.getElementById('project_bookmarklet_3383'); 
        document.body.removeChild(rem); //удаляем контейнер с отработанными скриптами (jquery и этот скрипт)
    };

    function getUsd(gold) {  //делаем тоже самое + вычисляем во сколько обойдется 1кг золота в USD (usd также подтягиваем с cbr.ru через Yahoo)
        jQuery.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.cbr.ru%2Fscripts%2FXML_dynamic.asp%3Fdate_req1%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "%26date_req2%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "%26VAL_NM_RQ%3DR01235'&format=json&diagnostics=true&callback=").done(function (obj) { // обращаемся с запросом (подставляем сегодняшнюю дату) к Yahoo developer, который возвращает нам json с сервера центрабанка  (XML to JSON)
            var usd = +obj.query.results.body.valcurs.record.value.replace(/,/g, ".");
            var sum = (gold * 1000) / usd;
            alert(todayview + " The cost of one kilogram of gold: " + String(sum).substr(0, 7) + ' USD'); //выводим результат отбрасывая тысячные у рационального числа
        });
    };
    getGold();

})()
