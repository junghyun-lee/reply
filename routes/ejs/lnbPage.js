/**
 * Created by leejunghyun on 16. 2. 14..
 */
NaverLnb = function(){
    this.htmlFactory = new HTMLFactory();

    this.initDate = function(){
        var message = document.querySelector('#message');
        var str = message.innerText;
        var formHTML = "";
        //var str = a.substring(14);
        console.log(str);

        var myObject = JSON.parse(str);
        console.log(myObject);
        for (var i in myObject)
        {
            formHTML += this.htmlFactory.defaultHtml(myObject[i]["title"], myObject[i]['url']);
        }
        this.htmlSet(formHTML);
        message.style.display = 'none';
    }
    this.htmlSet = function(formHTML){
        document.querySelector('#lnb > ul').innerHTML += formHTML;
        //$("#lnbContainer").prepend(this.htmlFactory.defaultHtml());
    }
}

HTMLFactory = function(){
    this.loddingBar = function(){

    }
    this.defaultHtml = function(title, url){
        var formHTML = "";
        formHTML += "<li>";
        formHTML += "<a href='http://localhost:3000/title/" + url + "'" + ">";
        formHTML += title + " " + url;
        formHTML += "</a>";
        formHTML += "</li>";

        return formHTML;
    }
}

var NaverLnb = new NaverLnb();
NaverLnb.initDate();