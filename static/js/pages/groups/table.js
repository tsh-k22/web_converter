$(document).ready(function() {

    var options = {};

    /*$(document).on('click', '#questions_table table tbody tr', function(e) {
        $(this).addClass('selected').siblings().removeClass('selected');
        question_id = $(this).data('id');
        $("#copy_question").attr("href", "/questions/copy/" + question_id);
    });*/

    $(document).on('click', '#groups_table ul.pagination a.page-link', function(e) {
        options.page = e.target.innerHTML;
        getTable('/groups/table', options, '#groups_table');
    });


    /*$('#copy_question').click(function(e) {
        if (!question_id) {
            e.preventDefault()
            bootboxError('Необходимо выбрать вопрос, на основе которого вы хотите создать новый. Для этого нажмите на соответствующую строчку в таблице (она должна подсветиться голубым цветом).');
        } 
    });*/


    getTable('/groups/table', options, '#groups_table', function() {});

    $('#groups_table').on('click', '#delete', function(event) {
        var group_id = $(this).parents('tr').attr('data-id');

        event.preventDefault();
        bootbox.confirm({
            title: '<i class="icon-trash2"></i> Вы уверены, что хотите удалить данную группу?',
            message: 'После удаления группы для нее нельзя будет назначить контрольную работу.',
            className: "slideInDown custom-bootbox",
            buttons: {
                confirm: {
                    label: "OK",
                    className: "btn-success"
                },
                cancel: {
                    label: " Отмена",
                    className: "btn-danger mr-1"
                }
            },
            callback: function(result){
                if (result) {
                    $.ajax('/groups/remove/' + group_id, {method: 'DELETE'})
                        .done(function(result) {
                            if (result.success){
                                var options = {};
                                getTable('/groups/table', options, '#groups_table', function() {});
                            }
                        })
                       .fail(function(result){});
                }
            }
        });
    });

});
