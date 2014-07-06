/**
 * Created by rushshi on 2014/6/10.
 */
$(document).ready(function () {
    count = 0;
    done = 0;
//    topLoader = $("#topLoader").percentageLoader({width: 120, height: 120, controllable : true});
//    topLoader.setProgress(0);
//    topLoader.setValue('0');

    $("#test").click(function() {
        if ($("#bookid").val() == '') {
            alert("bookid is null");
            $("#bookname").focus();
            return;
        }
        if ($("#file").val() == '') {
            alert("file is null");
            $("#file").focus();
            return;
        }
        var regex = /\.txt$/;
        if(!regex.test($("#file").val())) {
            alert("file is not txt");
            $("#file").focus();
            return;
        }
        loadword();
    });

    chrome.cookies.getAll({
        url: "http://www.shanbay.com"
    }, function (cookies) {
//        document.getElementById('msg').innerHTML = cookies.length;
    });
});
function loadword() {
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (e) {
        var str = this.result.toString();
        strs = new Array();
        strs = str.split(/\r?\n/);
        book_id = $("#bookid").val();
        var totalwordsnum = strs.length;
        if(totalwordsnum <= 1800){
            if(confirm("确认添加单词书？一共"+strs.length + "个单词")){
                i = 0;
                setTimeout(loop,100);
            }else{
                return;
            }
        }else{
            alert("一次添加单词不能超过1800个！（详见使用说明）");
            return;
        }
    });
    // Read in the file
    reader.readAsText(file);
}

var loop = function(){
    if(i < strs.length){
        if(i%60 == 0){
            document.getElementById('hint').innerHTML = "正在添加............."+done+"/"+strs.length;
        }
        if(i%200 == 0){
            id = createunit(book_id);
            if(id != -1){
                addword(id,strs[i].trim()) ;
                i++;
                setTimeout(loop,1000);
            }
            return;
        }
        var status = addword(id,strs[i].trim());
        if( status == 1){
            i++;
            setTimeout(loop,50);
        }
        else
            return;
    }
    else{
//        topLoader.setProgress(done / strs.length);
        document.getElementById('hint').innerHTML = "添加完成！一共添加了"+ done + "个单词！\r\n" +
            "（如少于预期个数，可能是有重复单词或者错误拼写单词）";
    }
}

function createunit(bookidp){
    var xhr = new XMLHttpRequest();
    var params = "name=unit1&description= &wordbook_id="+bookidp;

    xhr.open("POST", "http://www.shanbay.com/api/v1/wordbook/wordlist/", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xhr.setRequestHeader("Cookie", chrome.cookies);
    xhr.setRequestHeader("Content-length", params.length);
    xhr.send(params);
    if(xhr.status == 200){
        array = xhr.responseText.match("\"id\": (.*?),");
//            alert("unit id = "+array[1]);
        return array[1];
    }else{
        alert("请检查单词书id是否正确并确保网络正常！（如都正常，请在60分钟后重试）");
        return -1;
    }
}

function addword(id, word) {
    var xhr1 = new XMLHttpRequest();
    var params1 = "id="  +id  + "&word=" + word;
//    document.getElementById("msg").innerHTML = "id="  +array[1] + "&word=" + $('#describe').val();
    xhr1.open("POST", "http://www.shanbay.com/api/v1/wordlist/vocabulary/", false);
//    xhr1.onreadystatechange = function () {
//        if (xhr1.readyState == 4) {
//            count++;
//            if(xhr1.status == 200)
//                done++;
//        }
//    };
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xhr1.setRequestHeader("Cookie", chrome.cookies);
    xhr1.setRequestHeader("Content-length", params1.length);
    xhr1.send(params1);
    count++;
    if(xhr1.status == 200){
        done++;
        return 1;
    }else{
        alert("请检查单词书id是否正确并确保网络正常！（如都正常，请在60分钟后重试）");
        return -1;
    }
}



