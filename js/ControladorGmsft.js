 
/*  

  Controlador de eventos en el sitio cliente 
  Desarrollado por Gomosoft... 
  info@gomosoft.com
  http://gomosoft.com

*/

 var w = $(window),
     d = $(document);

   	       d.ready(function(){

                 ini();

                 $("a[href*='#']").click(function(){

                  var hash = $(this).attr("href");

                  switch( hash ){

                    case "#play":
                      play();
                    break;

                    default:

                      console.log( "cmd" + hash );

                    break;


                  }                                        
                    

                 });

   	       });


             function ini(){

                  renderisar( function(){ redimensionar(); } );

             }


             function renderisar( callback ){

               var height = w.height();
                   height = height - ($("header").height());
                   height = height - ($("footer").height());
                   height = height - 41;
                                              
                     $("section#info").height(height);
                     //$(".youtube iframe").height(height+21);

                   if(callback)
                        callback;                                                      


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