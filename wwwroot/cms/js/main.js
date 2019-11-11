var Library = {};

$(function() {
    /**
     * SubjectController
     */
    Library.SubjectController = {
        load: function (element) {
            var elem = $(element);
            var link = elem.attr('href');
            var mainSection = $("#main-content");
            $(".subject-link").removeClass('active');
            elem.addClass('active');
            history.pushState('data', '',  link);
            mainSection.load(link + " #subject");
        }
    };

    /**
     * DashBoardController
     */
    Library.DashboardController = {
        load: function (element) {
            var elem = $(element);
            var link = elem.attr('href');
            var mainSection = $("#main-content");
            $(".subject-link").removeClass('active');
            elem.addClass('active');
            
            mainSection.load(link + " #dashboard");
        },
        returnBook: function (element) {
            var elem = $(element);
            var id = elem.attr('data-form');
            var form = $("#form-" + id)
            var tr = form.parent();
            $.ajax({
                url: form.attr('action'),
                type: 'POST',
                data: form.serialize(),
                success: function (data) {
                    if (data.status == 100) {
                        tr.fadeOut(500);
                    }
                }
            })
        }
    };

    $(document).on("click", ".borrow-form", function () {
        var form = $(this).parents('tr').children('form');
        $.ajax({
            url: form.action,
            type: 'POST',
            data: form.serialize() + '&_token=' + $('#token').attr('value')
        }).then(function(data) {
            console.log(data);
        });
    });
});