import { validarInput } from "../common/validaciones.js";

document.addEventListener("DOMContentLoaded", () => {

  const submit = document.getElementById("submit");

  submit.addEventListener("click", async (event) => {
    event.preventDefault();

    let validacion = {estado: true} ; 
    const inputs = document.querySelectorAll("input");
    let  valores = {}
    for (let input of inputs) {
          validarInput(input , validacion) 
          valores = {...valores, [input.id]: input.value};
    }
  
    if(validacion.estado){
         login(valores);
    }
    
  });
});

async function login(valores) {

  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  await fetch(
    `http://localhost/proyecto_final/Modelo/loginComprobacion.php?usuario=${usuario}&contraseña=${contraseña}`
  )
    .then((response) => response.json())
    .then((data) => {
      let verificado = data.verificado ?? "";
      if (verificado == "verificado") {
        localStorage.setItem("id", data.id);
        window.location.href = "http://localhost/proyecto_final/index2.php";
      }
      else{
         const  errorLogin =  document.querySelector(".errorlogin"); 
         errorLogin.style.color = "red";
         errorLogin.style.fontSize = "15px";
         errorLogin.innerHTML = "usuario o contraseña incorrectos.";
      }
    })
    .catch((error) => console.error("Error:", error));
}



// function validarInput(input , validacion) {
//     const valor = input.value.trim();
   
//    let valido =   document.querySelector(`.validar${input.name}`); 
//    valido.innerHTML = "";
//   switch (input.type) {
//       case "text":
//           if (valor === "") {
//               valido.innerHTML = "Introduce un " + input.name;
//               valido.style.color = "red";
//               validacion.estado= false;
//           }
//           break;
//       case "password":
//           if (valor === "") {
//             valido.innerHTML = "Introduce una contraseña";
//             valido.style.color = "red";
//             validacion.estado= false;
//           }
//           break;
//       case "email":
//           if (valor === "" || !valor.includes("@")) {
//               valido.innerHTML= "Introduce un correo válido";
//               valido.style.color = "red";
//               validacion.estado= false;
//           }
//           else if (!valor.includes("@")) {
//               valido.innerHTML = "Introduce @ en la dirección de correo";
//               valido.style.color = "red";
//               validacion.estado= false;
//           }
//           break;
//       default:
//           break;
//   }

// }