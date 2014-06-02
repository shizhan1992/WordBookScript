$(document).ready(function () {
    var array;
    $("#test").click(function() {
        if ($("#bookname").val() == '') {
            alert("bookname is null");
            $("#bookname").focus();
            return;
        }
        if ($("#describe").val() == '') {
            alert("describe is null");
            $("#describe").focus();
            return;
        }
        if ($("#file").val() == '') {
            alert("file is null");
            $("#file").focus();
            return;
        }
        loadword();
    });

    chrome.cookies.getAll({
        url: "http://www.shanbay.com"
    }, function (cookies) {
        document.getElementById('msg').innerHTML = cookies.length;
    });
});

    function loadword() {
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Print the contents of the file
                var span = document.createElement('span');
                var str = e.target.result.toString();
                var strs = new Array();
                strs = str.split("\n");
                for (i = 0; i < strs.length; i++) {
                    if(i%200 == 0)
                         var id = createunit(i/200+1);
                    alert("id = "+ id + "word = "+strs[i]);
                    addword(id,strs[i]);
                }
            };
        })(file);
        // Read in the file
        reader.readAsText(file);
    }

    function createunit(uu){
//        document.getElementById('msg').innerHTML = $('#bookname').val();
        var xhr = new XMLHttpRequest();
        var params = "name=unit" + uu + "&description= &wordbook_id=85744";

        xhr.open("POST", "http://www.shanbay.com/api/v1/wordbook/wordlist/", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.setRequestHeader("Cookie", chrome.cookies);
        xhr.setRequestHeader("Content-length", params.length);
        xhr.send(params);
        if(xhr.status == 200){
            array = xhr.responseText.match("\"id\": (.*?),");
            alert("unit id = "+array[1]);
            return array[1];
        }else{
            return 0;
        }
    }

    function addword(id, word) {
        var xhr1 = new XMLHttpRequest();
        var params1 = "id="  +id  + "&word=" + word;
//    document.getElementById("msg").innerHTML = "id="  +array[1] + "&word=" + $('#describe').val();
        xhr1.open("POST", "http://www.shanbay.com/api/v1/wordlist/vocabulary/", false);
//        xhr1.onreadystatechange = function () {
//        if (xhr1.readyState == 4) {
//            // innerText does not let the attacker inject HTML elements.
//            document.getElementById("shuzu").innerText = xhr1.responseText;
//        }
//        };
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr1.setRequestHeader("Cookie", chrome.cookies);
        xhr1.setRequestHeader("Content-length", params1.length);
        xhr1.send(params1);
    }