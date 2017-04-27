
(function () {
    var today = new Date();
    var todayparser = today.toISOString().substr(0, 10).split(/-/);
    var todayview = today.toISOString().substr(0, 10);
    function getGold() {
        jQuery.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.cbr.ru%2Fscripts%2Fxml_metall.asp%3Fdate_req1%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "%26date_req2%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "'&format=json&diagnostics=true&callback=").done(function (obj) {
            var gold = +obj.query.results.body.metall.record[0].sell.replace(/,/g, ".");
            getUsd(gold);
        });
    };

    function getUsd(gold) {
        jQuery.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.cbr.ru%2Fscripts%2FXML_dynamic.asp%3Fdate_req1%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "%26date_req2%3D" + todayparser[2] + "%2F" + todayparser[1] + "%2F" + todayparser[0] + "%26VAL_NM_RQ%3DR01235'&format=json&diagnostics=true&callback=").done(function (obj) {
            var usd = +obj.query.results.body.valcurs.record.value.replace(/,/g, ".");
            var sum = (gold * 1000) / usd;
            alert(todayview + " The cost of one kilogram of gold: " + String(sum).substr(0, 7) + ' USD');
        });
    };
    getGold();
})()
