$(document).ready(function () {

    $("#errorZone").hide();

    $("#search").click(function () {

        let poolId = $("#poolId").val();
        let appClientId = $("#appClientId").val();
        let userName = $("#userName").val();
        let password = $("#password").val();

        let url = `http://127.0.0.1:8080/token/${poolId}/${appClientId}?user=${userName}&password=${password}`;

        $.ajax({
            type: "GET",
            url,
            dataType: 'json',
            data: {},
            error: (xhr, error) => {
                $("#errorZone").show();
                $("#error").text(xhr.responseJSON.message);
            },
            success: (token) => {
                $("#errorZone").hide();
                $("#result").text(token);
            }
        });

    });

    $("#copy").click(function () {
        copyToClipboard("#result");
    })

});

function copyToClipboard(element) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}