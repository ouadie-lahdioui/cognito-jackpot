$(document).ready(function () {


    loadFromLocalStorage();

    $("#successZone").show();

    $("#errorZone").hide();

    $("#search").click(function () {

        if(isValidForm()) {

            let poolId = $("#poolId").val();
            let appClientId = $("#appClientId").val();
            let userName = $("#userName").val();
            let password = $("#password").val();

            let restApiBaseUrl = $("#restApiUrl").val();
            let url = `${restApiBaseUrl}token/${poolId}/${appClientId}?user=${userName}&password=${password}`;
            console.log(">>>>" + url);


            $.ajax({
                type: "GET",
                url,
                dataType: 'json',
                data: {},
                error: (xhr, error) => {
                    $("#successZone").hide();
                    $("#errorZone").show();
                    $("#error").text(xhr.responseJSON.message);
                },
                success: (token) => {
                    $("#successZone").show();
                    $("#errorZone").hide();
                    $("#result").text(token);
                }
            });

        } else {

            $("#successZone").hide();
            $("#errorZone").show();
            $("#error").text("Pool Id, App client id, User and Password are required.");

        }

    });

    $("#copy").click(function () {
        copyToClipboard("#result");
    });

    $("#save").click(function () {
        let poolId = $("#poolId").val();
        let appClientId = $("#appClientId").val();
        let userName = $("#userName").val();
        let password = $("#password").val();

        localStorage.setItem('poolId', poolId);
        localStorage.setItem('appClientId', appClientId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
    });

    $("#load").click(function () {
        loadFromLocalStorage();
    });

    $("#clear").click(function () {
        clear();
    });

});

function copyToClipboard(element) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

function loadFromLocalStorage() {

    let poolId = localStorage.getItem('poolId');
    let appClientId = localStorage.getItem('appClientId');
    let userName = localStorage.getItem('userName');
    let password = localStorage.getItem('password');

    $("#poolId").val(poolId);
    $("#appClientId").val(appClientId);
    $("#userName").val(userName);
    $("#password").val(password);
}

function clear() {
    $("#poolId").val("");
    $("#appClientId").val("");
    $("#userName").val("");
    $("#password").val("");
}

function isValidForm() {
    return $("#poolId").val() && $("#appClientId").val() && $("#userName").val("") && $("#password").val("");
}