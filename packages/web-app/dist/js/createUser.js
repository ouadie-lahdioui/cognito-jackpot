function copyToClipboard(e){let a=$("<input>");$("body").append(a),a.val($(e).text()).select(),document.execCommand("copy"),a.remove()}function loadFromLocalStorage(){let e=localStorage.getItem("poolId"),a=localStorage.getItem("appClientId"),o=localStorage.getItem("userName"),s=localStorage.getItem("userEmail"),l=localStorage.getItem("password");$("#poolId").val(e),$("#appClientId").val(a),$("#userName").val(o),$("#userEmail").val(s),$("#password").val(l)}function clear(){$("#poolId").val(""),$("#appClientId").val(""),$("#userName").val(""),$("#userEmail").val(""),$("#password").val("")}function isValidForm(){return $("#poolId").val()&&$("#appClientId").val()&&$("#userName").val()&&$("#userEmail").val()&&$("#password").val()}function showSuccessMessage(e){$("#successZone").show(),$("#errorZone").hide(),$("#result").text(e)}function showErrorMessage(e){$("#successZone").hide(),$("#errorZone").show(),$("#error").text(e)}function callRestApi(e,a){let o=$("#poolId").val(),s=$("#appClientId").val(),l=$("#userName").val(),r=$("#userEmail").val(),c=$("#password").val(),t=`${$("#restApiUrl").val()}user/${o}/${s}?user=${l}&password=${c}&email=${r}`;$.ajax({type:"PUT",url:t,dataType:"json",data:{},error:a,success:e})}$(document).ready(function(){loadFromLocalStorage(),$("#successZone").show(),$("#errorZone").hide(),callRestApi(e=>{},(e,a)=>{}),$("#search").click(function(){isValidForm()?($("#cover-spin").show(),callRestApi(e=>{showSuccessMessage(e),$("#animatedArea").hide(),$("#cover-spin").hide()},(e,a)=>{showErrorMessage(e.responseJSON.message),$("#cover-spin").hide()})):showErrorMessage("Pool Id, App client id, User and Password are required.")}),$("#copy").click(function(){copyToClipboard("#result")}),$("#save").click(function(){let e=$("#poolId").val(),a=$("#appClientId").val(),o=$("#userName").val(),s=$("#password").val();localStorage.setItem("poolId",e),localStorage.setItem("appClientId",a),localStorage.setItem("userName",o),localStorage.setItem("password",s),showSuccessMessage("Successfully copied to your local storage")}),$("#load").click(function(){loadFromLocalStorage(),showSuccessMessage("Successfully loaded from your local storage")}),$("#clear").click(function(){clear(),showSuccessMessage("Successfully cleaned up your local storage"),$("#animatedArea").show()})});