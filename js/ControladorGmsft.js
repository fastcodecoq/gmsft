 
/*  

  Controlador de eventos en el sitio cliente 
  Desarrollado por Gomosoft... 
  info@gomosoft.com
  http://gomosoft.com

*/

 var w = $(window),
     d = $(document),
     url = document.location,
     heig = 0;

   	       d.ready(function(){

                 ini();


   	       });


             function ini(){

                  renderisar( function(){ redimensionar(); } );

                  if ( url.toString().match(/#/g) )
                      controlHash( "#" + url.toString().split("#")[1] );
 

                 $("a[href*='#']").click(function(){

                   var hash = $(this).attr("href");
                
                    controlHash(hash);                                    
                    

                 }); 


                 $("form[name='news']").bind("submit",suscribirme);

                 console.log ("soporta transitions? =>" +  (mod.csstransitions) ? "si" : "no") ;

             }


             function renderisar( callback ){

               var height = w.height();
                   height = height - ($("header").height());
                   height = height - ($("footer").height());
                   height = height - 49;

                     $("section#info").height(height);

                     //$(".youtube iframe").height(height+21);

                   if(callback)
                        callback();                                                      


             }


             function redimensionar(){


                  w.resize(function(){

                      renderisar();

                   });

             }


             function play(){


                  $(".video div.over").remove();
                  $(".video iframe:first").removeClass("hidden").attr("src","http://player.vimeo.com/video/54752811?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=f0f2f2&autoplay=1");

             }


             function controlHash( hash ){


                  switch( hash ){

                    case "#play":

                      play();

                      console.log("play");

                    break;

                    case "#facebook": case "#twitter":  

                      var mas = $("#mas").height();
                          heig =  ( $(window).height() - $("footer").height() - $("header").height() ) - 8;              

                         ir(heig);

                       if( hash == "#facebook")
                           $("footer .lineas .facebook").addClass("fbC");
                        else
                           $("footer .lineas .twitter").addClass("twiC");

                    break;

                    case "#cerrarFoot":

                     ir(0,function(){

                           $("footer .lineas .facebook").removeClass("fbC");
                           $("footer .lineas .twitter").removeClass("twiC");
                           $("a[href='#contacto']").fadeIn();
                           heig = 0;

                     });


                    break;

                    case "#suscribirme":

                        suscribirme();   

                    break;

                    case "#cerrarPop":

                        cerrarPop();

                    break;


                    case "#alerta":

                       alerta("Hola...", "Cómo se ve esto?");

                    break;

                    case "#paMiMoshi":

                      alerta("Amor, reina...", "You´re the best that has been happened me, i love'uuuuuuu, don't forget this never. <3");

                    break;

                    case "#cargar":

                       $("#info .splash").remove();
                       $(".cargando").show();

                    break;

                    case "#girar":

                     $("body").addClass("rotarPath"); 

                     if(mod.csstransforms)
                          $("body").addClass("rotar");  

                    break;

                    case "#tour":
                      

                      if(mod.csstransforms)
                          $("body").addClass("rotar");    

                    var c = setInterval( function(){ 

                                  console.log("inteval");

                                  $("body").addClass("rotarPath"); 

                                  alerta(
                                    "Woooohooooo!","Es un placer que nos visites, veamos si te convencemos de contratarnos :)"
                                  ,
                                    function(){

                                        controlHash("#play");

                                    });

                                      clearInterval(c);    
                                                                                         

                                         }
                                         , 2200);                  

                    break; 

                    case "#contacto":

                          heig = (heig != 0 ) ? heig + ( $("#mas").height() ) : ( ( $(window).height() - $("footer").height() - $("header").height() ) - 8 ) + ( $("#mas").height() );
                          ir(heig, function(){


                             $("a[href='#contacto']").fadeOut();

                          });



                    break;


                    default:

                      console.log( "cmd" + hash );

                    break;


                  } 




             }



             function centrarPop(){

                  var h = 0;                  
                  
                  $(".pop").each(function(){

                     h = $(this).height() + 40;

                     if( mod.csstransitions )
                      $(this).css({ bottom : "50%" , marginBottom : "-" + h/2 + "px" });  
                     else
                      $(this).animate({ bottom : "50%" , marginBottom : "-" + h/2 + "px" },50);  

                  });
                  

             }

             function alerta(title,msg,callback){

                  $(".pop .popCab h1").text(title);
                  $(".pop .popBody p").text(msg);
                    
                    centrarPop();

                    if(callback)
                      $(".popFoot").bind("click",function(e){

                          e.preventDefault();

                           callback();
                           $(this).unbind("click");

                      });
                       

             }

             function ir(heig,callback){

                      if( mod.csstransitions )
                       $("body").css({ marginTop : "-" + heig + "px" });
                      else
                       $("body").animate({ marginTop : "-" + heig + "px" });

                     if(callback)
                         callback();

             }


             function suscribirme(e){

                if(e)
                   e.preventDefault();

                  var correo = $("#correoNews").val();

                  if( /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i.test(correo) )
                    
                    {
                     
                     $("#correoNews").val("");
                     
                     alerta("Enhorabuena","Te has registrado para recibir todas nuestras novedades.");

                    }

                  else
                    
                    {

                      alerta("Args tenemos problemas", "dirección de correo electrónico no  válida.");                     

                    }
             


             }


             function cerrarPop( callback ){

                 if( mod.csstransitions )
                     $(".pop").css({marginBottom : "-1300px"});
                 else
                    $("body").animate({ marginBottom : "-1300px" },50);

                  if(callback)
                       callback;

             }


             function cerrarFoot( callback ){


                  if( mod.csstransitions )
                      $("body").css({ marginTop : "0px" });
                    else
                      $("body").animate({ marginTop : "0px" },50);

                   $("footer .lineas .facebook").removeClass("fbC");
                   $("footer .lineas .twitter").removeClass("twiC");
                   heig = 0;

                   if(callback)
                       callback();

             }


            