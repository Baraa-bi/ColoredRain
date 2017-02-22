$(document).ready(function(){
    surveys.init();
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
                $("#"+slider_val[0]['id']).text(slideEvt.value);
            });

            $("#"+input[1]['id']).click(function() {
                //parent
                var parent = $(this).parent().parent();
                if(!this.checked) {
                    // With JQuery
                    $("#"+input[0]['id']).slider("enable");
                    $(parent).addClass('disabled');
                }
                else {
                    // With JQuery
                    $("#"+input[0]['id']).slider("disable");
                    $(parent).removeClass('disabled');
                }
            });
        });
    },
};