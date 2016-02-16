/*Created by leejunghyun on 16. 2. 14..*/
NaverLnb = function(choice){
    this.choice = choice;
    this.selector;
    this.aTag;

    this.htmlFactory = new HTMLFactory();

    this.choiceDate = function(){
        console.log('chocieDate');
        if(this.choice == 1){
            this.selector = '#lnb > ul';
            this.aTag = "<a href='http://localhost:3000/lnb/sub/";
        }
        else if(this.choice == 2){
            this.selector = '#lnb_sub > ul';
            this.aTag = "<a href='http://localhost:3000/lnb/sub/title/";
        }
        else if(this.choice == 3){
            this.selector = '#lnb_article > ul';
            this.aTag = "<a href='http://localhost:3000/lnb/sub/article/";
        }
    }

    this.initDate = function(){
        this.choiceDate();
        var message = document.querySelector('#message');
        var str = message.innerText;
        var formHTML = "";
        //var str = a.substring(14);
        console.log(str);
        console.log(this.selector);

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
        document.querySelector(this.selector).innerHTML += formHTML;
        //$("#lnbContainer").prepend(this.htmlFactory.defaultHtml());
    }
}

HTMLFactory = function(){
    this.loddingBar = function(){

    }
    this.defaultHtml = function(title, url){
        var formHTML = "";
        formHTML += "<li>";
        formHTML += NaverLnb.aTag + url + "'" + ">";
        formHTML += title + " " + url;
        formHTML += "</a>";
        formHTML += "</li>";

        return formHTML;
    }
}
//var num = Number(document.getElementById('number').innerText);
var num = document.getElementById('number').innerText;
var NaverLnb = new NaverLnb(num);
NaverLnb.initDate();