var usuario = document.getElementById("usuario");
var senha = document.getElementById("senha");
 
function login(){
 
    try{
        if(usuario.value !== "professores" || senha.value !== "Senai115") throw "Usuário ou Senha Inválidos!!!"
 
        window.location.href = "Boletim.html"
 
    }
    catch(err){
        alert(err)
        window.location.href = "Index.html"
    }
}