function copyToClipboard(e){let o=$("<input>");$("body").append(o),o.val($(e).text()).select(),document.execCommand("copy"),o.remove()}function loadFromLocalStorage(){let e=localStorage.getItem("poolId"),o=localStorage.getItem("appClientId"),a=localStorage.getItem("userName"),l=localStorage.getItem("password");$("#poolId").val(e),$("#appClientId").val(o),$("#userName").val(a),$("#password").val(l)}function clear(){$("#poolId").val(""),$("#appClientId").val(""),$("#userName").val(""),$("#password").val("")}function isValidForm(){return $("#poolId").val()&&$("#appClientId").val()&&$("#userName").val("")&&$("#password").val("")}$(document).ready(function(){loadFromLocalStorage(),$("#successZone").show(),$("#errorZone").hide(),$("#search").click(function(){if(isValidForm()){let e=$("#poolId").val(),o=$("#appClientId").val(),a=$("#userName").val(),l=$("#password").val(),r=`${$("#restApiUrl").val()}token/${e}/${o}?user=${a}&password=${l}`;console.log(">>>>"+r),$.ajax({type:"GET",url:r,dataType:"json",data:{},error:(e,o)=>{$("#successZone").hide(),$("#errorZone").show(),$("#error").text(e.responseJSON.message)},success:e=>{$("#successZone").show(),$("#errorZone").hide(),$("#result").text(e)}})}else $("#successZone").hide(),$("#errorZone").show(),$("#error").text("Pool Id, App client id, User and Password are required.")}),$("#copy").click(function(){copyToClipboard("#result")}),$("#save").click(function(){let e=$("#poolId").val(),o=$("#appClientId").val(),a=$("#userName").val(),l=$("#password").val();localStorage.setItem("poolId",e),localStorage.setItem("appClientId",o),localStorage.setItem("userName",a),localStorage.setItem("password",l)}),$("#load").click(function(){loadFromLocalStorage()}),$("#clear").click(function(){clear()})});