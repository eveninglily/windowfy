(function ($) {
    $('head').append('<link rel="stylesheet" href="jquery.windowfy.css" type="text/css" />');
    $.fn.windowfy = function (params) {
        params = this.extend({ title: 'window' } , params);
        return this.each(function () {
            var body = this;

            var holder = $('<div/>').attr({
                class: 'jquery-DraggableWindow'
            }).appendTo('body');

            var header = $('<div/>').attr({
                width: '100%'
            });

            var title = $('<div/>').attr({
                class: 'windowTitle grab'
            }).html(params.title).appendTo(header);

            var options = $('<div/>').attr({
                class: 'options'
            }).appendTo(header);

            var hide = $('<div/>').attr({
                class: 'minimize'
            }).html('-').on('click', function () {
                $(body).toggle();
            }).appendTo(options);

            var e = $('<div/>').attr({
                class: 'exit'
            }).html('x').on('click', function () {
                holder.remove();
            }).appendTo(options);

            holder.append(header).append(body);

            var offsetX = 0;
            var offsetY = 0;

            $(document).on('mousedown', '.windowTitle', function (evt) {
                $(this).removeClass('grab');
                $(this).addClass('grabbing');
                offsetX = evt.pageX - holder.offset().left;
                offsetY = evt.pageY - holder.offset().top;
            }).on('mouseup', function () {
                title.addClass('grab');
                title.removeClass('grabbing');
            }).on('mousemove', function (evt) {
                evt.preventDefault();
                document.getSelection().removeAllRanges();
                if (title.hasClass('grabbing')) {
                    holder.css({ left: (evt.pageX - offsetX) + 'px' });
                    holder.css({ top: (evt.pageY - offsetY) + 'px' });
                }
            });
            return this;
        });
    };
})( jQuery );