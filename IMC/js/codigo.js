 function calcularImc(){

    let peso, altura, imc, resultado;

    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const tbody = document.querySelector("tbody");

    peso = parseFloat(document.getElementById("peso").value);

    altura = parseFloat(document.getElementById("altura").value);

    imc = (peso / (altura * altura)).toFixed(1);

    if(imc <= 18.5){
        resultado = "Abaixo do peso.";
    } else if (imc >= 18.6 && imc <= 24.9){
        resultado = "Peso ideal (parabéns).";
    } else if (imc >= 25.0 && imc <= 29.9){
        resultado = "Levemente acima do peso.";
    } else if (imc >= 30.0 && imc <= 34.9){
        resultado = "Obesidade grau I.";
    } else if (imc >= 35.0 && imc <= 39.9){
        resultado = "Obesidade grau II (severa).";
    } else if (imc >= 40.0){
        resultado = "Obesidade grau III (mórbida).";
    } else {
        resultado = "Padrão não encontrado."
    }

    td.innerText = peso;
    td2.innerText = altura;
    td3.innerText = imc;
    td4.innerText = resultado;
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
}