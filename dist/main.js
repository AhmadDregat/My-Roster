$('button').on('click', function() {
    const input = $('input').val()
    $.get(`/teams/${input}`, function(Players) {
        showPlayers(Players)

    })

})
const showPlayers = function(Players) {
    let source = $("#PlayersInfo").html()
    const template = Handlebars.compile(source);
    $(".playersdetails").empty();
    let newHtml = template({ Players });
    $(".playersdetails").append(newHtml);
}