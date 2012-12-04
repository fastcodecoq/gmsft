 
/*  

  Controlador de eventos en el sitio cliente 
  Desarrollado por Gomosoft... 
  info@gomosoft.com
  http://gomosoft.com

*/

 var w = $(window),
     d = $(document),
     url = document.location;

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
                  $(".video iframe").removeClass("hidden").attr("src","http://player.vimeo.com/video/54752811?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=f0f2f2&autoplay=1");

             }


             function controlHash( hash ){


                  switch( hash ){

                    case "#play":

                      play();

                    break;

                    case "#facebook": case "#twitter":    

                       $("body").animate({ marginTop : "-" + ( ( $(window).height() - $("footer").height() - $("header").height() ) - 8 ) + "px" });

                    break;

                    case "#cerrarFoot":

                      $("body").animate({ marginTop : "0px" });

                    break;

                    case "#suscribirme":

                        suscribirme();   

                    break;

                    case "#cerrarPop":

                       $(".pop").css({marginBottom : "-1000px"});

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
                     $(this).css({ bottom : "50%" , marginBottom : "-" + h/2 + "px" });  

                  });
                  

             }

             function alerta(title,msg){

                  $(".pop .popCab h1").text(title);
                  $(".pop .popBody p").text(msg);
                   centrarPop();

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


            