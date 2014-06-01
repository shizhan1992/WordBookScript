$(document).ready(function () {
    var array;
    $("#test").click(function() {
        document.getElementById('msg').innerHTML = $('#bookname').val();
        var xhr = new XMLHttpRequest();
        var params = "name=" + $('#bookname').val() + "&description= &wordbook_id=85744";
        xhr.open("POST", "http://www.shanbay.com/api/v1/wordbook/wordlist/", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // innerText does not let the attacker inject HTML elements.
//                document.getElementById("msg").innerText = xhr.responseText;
                array = xhr.responseText.match("\"id\": (.*?),");
                document.getElementById("shuzu").innerText = "id=" + array[1];
            }
        };
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.setRequestHeader("Cookie", chrome.cookies);
        xhr.setRequestHeader("Content-length", params.length);
        xhr.send(params);
    });
    $("#word").click( function() {
        var xhr1 = new XMLHttpRequest();
        var params1 = "id="  + array[1] + "&word=" + $('#describe').val();
        document.getElementById("msg").innerHTML = "id="  +array[1] + "&word=" + $('#describe').val();
        xhr1.open("POST", "http://www.shanbay.com/api/v1/wordlist/vocabulary/", true);
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState == 4) {
                // innerText does not let the attacker inject HTML elements.
                document.getElementById("shuzu").innerText = xhr1.responseText;
            }
        };
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr1.setRequestHeader("Cookie", chrome.cookies);
        xhr1.setRequestHeader("Content-length", params1.length);
        xhr1.send(params1);
    });
    chrome.cookies.getAll({
        url: "http://www.shanbay.com"
    }, function (cookies) {
        document.getElementById('msg').innerHTML = cookies.length;

    });
});
