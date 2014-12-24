


(function(a){

	
    
    var gomo = function(){    	    

    	
    	var hh;    	
    	
    	a.langCode = {
    		"es" : "es-CO",
            "en" : "en-US",         
    		"fr" : "fr-FR",
            sources : {
                "es" : "es.json",
                "en" : "en.json",                
                "fr" : "fr.json"                
             }
     	}

       a.portfolio = {
            "web" : [  
                    { name : "Markakalinka" , pic : "markakalinka.jpg"},
                    { name : "Serviaseo S.A." , pic : "aseo.jpg"},
                    { name : "Castleway" , pic : "castleway.jpg"},
                    { name : "Chocolates la torre" , pic : "choco.jpg"},
                    { name : "Fifa Comidas" , pic : "fifa.jpg"},
                    { name : "Fragma Club" , pic : "fragma.jpg"},
                    { name : "Hosting Colombia" , pic : "hcol.jpg"},
                    { name : "Home Perfection" , pic : "home.jpg"},
                    { name : "Hotelea" , pic : "hotelea.jpg"},
                    { name : "Hoo2Chat" , pic : "hoo2chat.jpg"},
                    { name : "Ininteg" , pic : "ininteg.jpg"},
                    { name : "Innova Espacios" , pic : "innova.jpg"},
                    { name : "IT Version 6" , pic : "itv6.jpg"},
                    { name : "National Luxury Coach" , pic : "national.jpg"},
                    { name : "Native Bijoux" , pic : "native.jpg"},
                    { name : "Salud & Drogas" , pic : "saluddrogas.jpg"},
                    { name : "Scholes Store" , pic : "scholes.jpg"},
                    { name : "Turismo Del Morrosquillo" , pic : "turismodelmorrosquillo.jpg"},
                    { name : "Webshot" , pic : "webshot.jpg"}
                    ],
             "apps" : [
                       { name : "Fragma Club" , pic : "fragmapp.jpg"},
                       { name : "Hoo2Chat" , pic : "hoo2chat.jpg"},
                       { name : "Webshot" , pic : "webshot.jpg"}                       
                      ],
            "design" : [  
                    { name : "Serviaseo S.A." , pic : "aseo.jpg"},
                    { name : "Fifa Comidas" , pic : "fifa.jpg"},
                    { name : "Hosting Colombia" , pic : "hcol.jpg"},
                    { name : "Hotelea" , pic : "hotelea.jpg"},
                    { name : "Hoo2Chat" , pic : "hoo2chat.jpg"},
                    { name : "Ininteg" , pic : "ininteg.jpg"},
                    { name : "Innova Espacios" , pic : "innova.jpg"},
                    { name : "Salud & Drogas" , pic : "saluddrogas.jpg"},
                    { name : "Turismo Del Morrosquillo" , pic : "turismodelmorrosquillo.jpg"},
                    { name : "Webshot" , pic : "webshot.jpg"}
                    ]            
       };

     	a.title = {
    		"es" : "Gomosoft - Diseño de páginas web & Desarrollo de aplicaciones móviles",
    		"en" : "Gomosoft - Web design & Mobile apps development",
    		"fr" : "Gomosoft - Web design & Mobile Apps développement"
     	}

    	this.run = function(){
        
        if(!$)
        { console.log("jQuery is required"); return false; 	}

        if(window.localStorage)
        a.ls = window.localStorage;

        a.container = document.getElementById("main");
        a.alert = dialog.show;

 		
        if(!ls.lang)
        a.lang = a.navigator.language
                                    .split("-")[0]
                                    .replace(/\s/ , "")
                                    .toLowerCase();	
        else
        a.lang = ls.lang;

        if(a.langCode["sources"][a.lang])
            a.sLang = a.langCode["sources"][a.lang];
        else
            a.sLang = a.langCode["sources"]["en"];

              
	    $(changeLanguage);                                    


        }


        function on(){
        	  onEvents();
        	  hh = $("header").outerHeight();      
        	  checkPath();  	                
        	   $.fn.gt = function(){
        	 return $(this).attr("data-target");
        }
        }


        function loadPortafolio(section){

            var section = section || "web";            
            var markup = '<div class="item">'
                        +'<figure><img class="lazy" data-original="{{src}}" alt=""></figure>'
                        +'<span class="over">{{name}}</span>'
                        +'</div>';
           var content = "";

            
       
            for(x in portfolio[section])
                 content += markup.replace(/\{\{src\}\}/g, "/assets/portfolio/" + section + "/" + portfolio[section][x].pic)
                                  .replace(/\{\{\name}\}/g, portfolio[section][x].name);             

             $(".portfolio .items").html(content);
             $(".portfolio .active").removeClass("active");
             $(".portfolio a[href='/"+section+"']").addClass("active");
             $(".lazy").lazyload();

        }

        function linter(){

        	$(window).scroll(function(e){

        		 var scroll = $(window).scrollTop();

        		 var sections = $("section");

        		 for(x in section)
        		 	if($(section[x]).offset().top <= scroll)
        		        {
        		        	history.pushState(null, null, $(section[x]).attr("data-target").replace(/#/,""));
        		        	return false;
        		        }



        	});

        }


      


        function checkPath(){
        	if(document.location.pathname)                                    
        		scrollTo(document.location.pathname.replace(/\//,"#"), { target : { textContent : null , href : document.location.pathname.replace(/\//,"")} });
        }

        function scrollerController(e){
        		
        		e.preventDefault();
        		e.stopPropagation();
     
        		var th = $(this);
        		var to = th.gt();
        		scrollTo(to, e);
        }

       function scrollTo (to, e){

       		  var too = to.replace("#","");

       	        if(too.match(/^(.*)\.html$|^es$|^en|^fr$/g))
       	        	return false;

       		    if(to.match(/^(#design|#apps|#web)+/g))
       		    	{   
                        var section = to.replace("/","").replace("#","");
                        loadPortafolio(section);
                        to = "#portfolio";
                    }else
                    loadPortafolio();
                

                if(to === "#")
                    to = "#home";

        	    var to = $(to).offset().top + 15;
        		history.pushState(null, e.target.textContent, e.target.href);
        		$("html, body").animate({scrollTop : to - hh });


       }


        function changeLanguage(ini, update){
        	
        	 $.getJSON("/assets/langs/" + a.sLang , function(rs){

        	 	console.log(a.container);
            	
            	$("html").attr("lang", rs.code);
            	$("title").text(a.title[a.lang]);
      			rs.year = new Date().getFullYear();
                a.writer = rs;
      	
	    	    a.container.innerHTML = new EJS({ url : "/views/home.ejs"}).render(rs);
	    	    

	    	  
			    	   if(ini instanceof Object)
			            on();



	          });

        }

        function portfolioController(e){
        	e.preventDefault();
        	history.pushState(null, e.target.textContent, e.target.href);
            loadPortafolio($(this).attr("href").replace(/\//,""));
        }


        function languangeController(e){
        	e.preventDefault();
        	a.lang = $(this).attr("data-to");  
            a.sLang = a.langCode["sources"][a.lang];
        	
        	if(a.ls)
        	a.ls.lang = a.lang;   
        	history.pushState(null, e.target.textContent, e.target.href);

        	changeLanguage(false, true);
            loadPortafolio();
        }


        function quoteClickController(el){
             var scroll = el.parents("#quote:first").offset().top;
             var offset =  $("header").outerHeight() + 51;

             $("body, html").animate({scrollTop : scroll - offset});
        }


        function quoteController(e){

            e.preventDefault();

            console.log(e)

            switch(e.type){
                 case "focusin":
                      quoteClickController($(this));
                 break;
            }

        }


        function mailController(e){
            e.preventDefault();

                alert(a.writer.waitformail);

                function success(rs){
                    if(rs.error)
                    {
                        var errors = rs.error.split("|");
                        var output = a.writer.mailunsent+":<br><br><ol>";
                        for(x in errors)
                          if(a.writer[errors[x]])
                            output += "<li>" + a.writer[errors[x]] + "</li>";

                        alert(output + "</ol><br>");
                        //console.log(errors);

                        return false;
                    }

                    alert(a.writer.mailsent + "<br>");
                    $("#quote")[0].reset();

                }

                function error(err){
                     //console.log(err);
                }


                data = {
                    lang : a.lang,
                    name : $(this).find("input[name='name']").val(), 
                    email : $(this).find("input[name='email']").val(), 
                    tel : $(this).find("input[name='tel']").val(), 
                    message : $(this).find("textarea[name='message']").val(), 
                }

                $.ajax({
                    url : "/mail",
                    data : data,
                    type : "POST",
                    dataType : "JSON",
                    success : success,
                    error : error 
                });

            return false;
        }


        function onEvents(){


        	$("[data-scroller]").die("click").live("click", scrollerController);
        	$("[data-portfolio-control]").die("click").live("click", portfolioController);
            $("[data-change-language]").die("click").live("click", languangeController);                       
            $("#quote").die("submit").live("submit", mailController);        	           
            $("#quote input, #quote textarea").die("focus").live("focus", quoteController);


        }

    }


     new gomo().run();

})(window);


/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

