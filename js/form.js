$(document).ready(function(){
    surveys.init();


    $('input[type=radio][name=color-type]').change(function() {
      coloringType=parseInt(this.value);
    });

    function wait() {
        console.log("audio clip ended, waiting 10 seconds to replay....");
        setTimeout(play, 10000);
    }

    function play() {
        $('#audio')[0].play();
        $('#audio').on("ended", wait);
    }
play();
});


var surveys = {

    init : function()
    {
        //Load all the sliders
        surveys.initSliders();
    },

    initSliders : function()
    {
        $('.slider').each(function(i, obj) {
            //Get input element
            var input = $(this).find("input");
            var slider_val = $(this).find(".slider-val");

            //Init folding slider
            $("#"+input[0]['id']).slider();
            $("#"+input[0]['id']).on("slide", function(slideEvt) {
              var id=slider_val[0]['id'];
              $("#"+id).text(slideEvt.value);

              if(id=='slider-1-val')
                changeFRate(slideEvt.value);
              else if(id=="slider-2-val")
                changeNo(slideEvt.value);
              else if(id=="slider-3-val")
                changeDropSize(slideEvt.value);
              else if(id=="slider-4-val")
                changeBackgroundColor(slideEvt.value);

            });


        });
    },
};


function changeFRate(val){
  val = parseInt(val);
  fRate = val;
  frameRate(fRate);
}

function changeNo(val){
  val = parseInt(val);
  dropNum = val;
}

function changeDropSize(val){
  val = parseInt(val);
  width=val;
  height=width*4.3 + (val >= 4 ? val : 0);
  circleW = val * val == 1 ? 5 : 20;
  circleH = circleW * 0.16;
}

function changeBackgroundColor(val){
  let rgb = "("+val+","+val+","+val+")";
  document.body.style="background-color:rgb"+rgb;
}

function changeMask()
{
  let val = document.getElementById("mask").value;
  if(val.length==8)
      mask=parseInt(val,2);
    console.log(val);
}
