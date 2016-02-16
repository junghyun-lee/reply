/*Created by leejunghyun on 16. 2. 16..*/
NaverReply = function(choice){
    this.htmlFactory = new HTMLFactory();

    this.initDate = function(){
        var message = document.querySelector('#message');
        var str = message.innerText;
        var formHTML = "";

        console.log(str);

        var myObject = JSON.parse(str);
        console.log(myObject);
        for (var i in myObject)
        {
            formHTML += this.htmlFactory.defaultHtml(myObject[i]["title"], myObject[i]['url']);
            this.dbSave(formHTML);
        }
        this.htmlSet(formHTML);
        message.style.display = 'none';
    }

    this.htmlSet = function(formHTML){
        document.querySelector('#lnb_reply > ul').innerHTML += formHTML;
    }

    this.dbSave = function(data){
        //비동기 형태
    }
}

HTMLFactory = function(){
    this.defaultHtml = function(title, url){
        var formHTML = "";
        formHTML += "<li>";
        formHTML += title + "</br>" + url;
        formHTML += "</li>";

        return formHTML;
    }
}

var NaverReply = new NaverReply();
NaverReply.initDate();