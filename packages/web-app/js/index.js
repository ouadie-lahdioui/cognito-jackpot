$(document).ready(function () {

    loadFromLocalStorage();

    $("#successZone").show();

    $("#errorZone").hide();

    // wakeup rest-api at startup
    callRestApi(
        (token) => {},
        (xhr, error) => {}
    );

    $("#search").click(function () {

        if (isValidForm()) {

            $('#cover-spin').show();

            callRestApi(
                (token) => {
                    showSuccessMessage(token);
                    $("#animatedArea").hide();
                    $('#cover-spin').hide();
                },
                (xhr, error) => {
                    showErrorMessage(xhr.responseJSON.message);
                    $('#cover-spin').hide();
                }
            );

        } else {
            showErrorMessage("Pool Id, App client id, User and Password are required.");
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

        showSuccessMessage("Successfully copied to your local storage");
    });

    $("#load").click(function () {
        loadFromLocalStorage();
        showSuccessMessage("Successfully loaded from your local storage");
    });

    $("#clear").click(function () {
        clear();
        showSuccessMessage("Successfully cleaned up your local storage");
        $("#animatedArea").show();
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
    return $("#poolId").val() && $("#appClientId").val() && $("#userName").val() && $("#password").val();
}

function showSuccessMessage(message) {
    $("#successZone").show();
    $("#errorZone").hide();
    $("#result").html(JSON.stringify(message, undefined, 2));
}

function showErrorMessage(message) {
    $("#successZone").hide();
    $("#errorZone").show();
    $("#error").text(message);
}

function callRestApi(onSuccess, onError) {
    let poolId = $("#poolId").val();
    let appClientId = $("#appClientId").val();
    let userName = $("#userName").val();
    let password = $("#password").val();

    let restApiBaseUrl = $("#restApiUrl").val();
    let url = `${restApiBaseUrl}token/${poolId}/${appClientId}?user=${userName}&password=${password}`;

    $.ajax({
        type: "GET",
        url,
        dataType: 'json',
        data: {},
        error: onError,
        success: onSuccess
    });
}