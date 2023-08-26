(function($) {
    $(window).on("load", function() {
        $(document).scrollzipInit();
        $(document).rollerInit();
    });
    $(window).on("load scroll resize", function() {
        $('.numscroller').scrollzip({
            showFunction: function() {
                numberRoller($(this).attr('data-slno'));
            },
            wholeVisible: false,
        });
    });
    $.fn.scrollzipInit = function() {
        $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
    };
    $.fn.rollerInit = function() {
        var i = 0;
        $('.numscroller').each(function() {
            i++;
            $(this).attr('data-slno', i);
            $(this).addClass("roller-title-number-" + i);
        });
    };
    $.fn.scrollzip = function(options) {
        var settings = $.extend({
            showFunction: null,
            hideFunction: null,
            showShift: 0,
            wholeVisible: false,
            hideShift: 0,
        }, options);
        return this.each(function(i, obj) {
            $(this).addClass('scrollzip');
            try {
                if ($.isFunction(settings.showFunction)) {
                    if (!$(this).hasClass('isShown') &&
                        ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
                        ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
                    ) {
                        $(this).addClass('isShown');
                        settings.showFunction.call(this);
                    }
                }
                if ($.isFunction(settings.hideFunction)) {
                    if (
                        $(this).hasClass('isShown') &&
                        (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
                            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
                    ) {
                        $(this).removeClass('isShown');
                        settings.hideFunction.call(this);
                    }
                }
            } catch (e) {}
            return this;
        });
    };

    function numberRoller(slno) {
        var min = $('.roller-title-number-' + slno).attr('data-min');
        var max = $('.roller-title-number-' + slno).attr('data-max');
        var timediff = $('.roller-title-number-' + slno).attr('data-delay');
        var increment = $('.roller-title-number-' + slno).attr('data-increment');
        var addtionalText = $('.roller-title-number-' + slno).attr('data-addtional');
        var numdiff = max - min;
        var timeout = (timediff * 1000) / numdiff;
        numberRoll(slno, min, max, increment, timeout, addtionalText);

    }

    function numberRoll(slno, min, max, increment, timeout, addtionalText) {
        if (min <= max) {
            $('.roller-title-number-' + slno).html(min);
            min = parseInt(min) + parseInt(increment);
            setTimeout(function() {
                numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout), addtionalText)
            }, timeout);
        } else {
            if (addtionalText != undefined) {
                $('.roller-title-number-' + slno).html("" + max + addtionalText);
            } else {
                $('.roller-title-number-' + slno).html(max);
            }
        }
    }
})(jQuery);