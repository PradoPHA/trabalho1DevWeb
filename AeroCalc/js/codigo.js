function areaAsa(tipo, envergadura, semiEnvergadura, cordaRaiz, cordaPonta) {

    if (tipo == 1) {
        area = envergadura * cordaRaiz;
    }
    if (tipo == 2) {
        area = ((cordaRaiz + cordaPonta) * envergadura)/2;
    }
    if (tipo == 3) {
        area = semiEnvergadura * cordaRaiz + (cordaRaiz + cordaPonta) * ((envergadura - semiEnvergadura)/2);
    }

    return area;
}

function alongamentoAsa(envergadura, areaAsa) {
    return (envergadura * envergadura)/areaAsa;
}

function afilamentoAsa(cordaRaiz, cordaPonta, tipo) {
    let afilamento;

    if (tipo == 1) {
        afilamento = cordaRaiz/cordaRaiz;
    }
    else {
        afilamento = cordaPonta/cordaRaiz;
    }

    return afilamento;
}

function cordaMediaAsa(cordaRaiz, afilamento, tipo) {
    let cordaMedia;

    if (tipo == 1) {
        cordaMedia = cordaRaiz;
    }
    else {
        cordaMedia = (2/3) * cordaRaiz * ((1 + afilamento + (afilamento*afilamento))/(1 + afilamento));
    }

    return cordaMedia;
}

function yMedioAsa(envergadura, afilamento) {
    return (envergadura/6) * ((1 + (2 * afilamento)) / (1 + afilamento));
}

function numeroReynolds(velocidade, cordaMedia, viscoCin) {
    return (velocidade * cordaMedia)/viscoCin;
}

function constanteProporcionalidade(delta, alongamento) {
    return 1/(Math.PI * 0.75 * (1/(1 + delta)) * alongamento);
}

function coefAtritoEquivalenteLam(reynolds) {
    return 1.328/(Math.sqrt(reynolds));
}

function coefAtritoEquivalenteTurb(reynolds) {
    return 0.42/((Math.log(0.056 * reynolds)) * (Math.log(0.056 * reynolds)));
}

function coefAngularPerfil (alpha1, cl1, alpha2, cl2) {
    return (cl2 - cl1)/(alpha2 - alpha1);
}

function coefAngularAsa (a0, alongamento, delta) {
    let a;

    if (alongamento > 4) {
        a = a0 / (1+((a0*57.2958)/(Math.PI * alongamento * (1/(1+delta)))))
    }
    else {
        a = a_0 / Math.sqrt(1 + Math.pow( (a0*57.2958) /(Math.PI * alongamento), 2) + ( (a0 * 57.2958) /(Math.PI * alongamento)))
    }

    return a;
}

function CLMaxAsa (a0, a, clMax) {
    return clMax*(1 - (1 - (a / a0)));
}

function coefArrastoParasita (coefAtritoEquivalente, areaAsa, areaMolhada) {
    return coefAtritoEquivalente * (areaMolhada / areaAsa);
}

function coefSustentacaoProjeto (coefArrastoParasita, constanteProporcionalidade) {
    return Math.sqrt(coefArrastoParasita / constanteProporcionalidade);
}

function coefArrastoProjeto (coefArrastoParasita, constanteProporcionalidade, coefSustentacaoProjeto) {
    return coefArrastoParasita + constanteProporcionalidade * Math.pow(coefSustentacaoProjeto, 2);
}

function eficienciaMaxProjeto (coefSustentacaoProjeto, coefArrastoProjeto) {
    return coefSustentacaoProjeto / coefArrastoProjeto;
}

function velocidadeEstol (peso, densidadeAr, areaAsa, CLMaxAsa) {
    return Math.sqrt((2 * peso) / (densidadeAr * areaAsa * CLMaxAsa))
}

function sustentaçãoPontoAtuante (nMax, peso) {
    return nMax * peso;
}

function calcReynolds() {
    let velocidade, cordaRaiz, cordaPonta, tipo, viscoCin, cordaMedia, afilamento;

    // Dados do Avião
    velocidade = parseFloat(document.getElementById("velocidade").value);

    // Características do Fluido
    viscoCin = parseFloat(document.getElementById("viscoCin").value);

    // Dados da Asa
    tipo = parseInt(document.getElementById("tipoAsa").value);
    cordaRaiz = parseFloat(document.getElementById("cordaRaiz").value);
    cordaPonta = parseFloat(document.getElementById("cordaPonta").value);

    // Cálculo
    afilamento = afilamentoAsa(cordaRaiz, cordaPonta, tipo);
    cordaMedia = cordaMediaAsa(cordaRaiz, afilamento, tipo);

    // Mostrar no site
    document.getElementById("calcReynolds").innerText = "Reynolds: " + numeroReynolds(velocidade, cordaMedia, viscoCin);
}

function calculo1() {

    let tipo, envergadura, semiEnvergadura, cordaRaiz, cordaPonta;
    let area, alongamento, afilamento, cordaMedia, yMed, reynolds;

    // Características do Fluido
    velocidade = parseFloat(document.getElementById("velocidade").value);
    viscoCin = parseFloat(document.getElementById("viscoCin").value);

    // Dados da Asa
    tipo = parseInt(document.getElementById("tipoAsa").value);
    envergadura = parseFloat(document.getElementById("envergadura").value);
    semiEnvergadura = parseFloat(document.getElementById("semiEnvergadura").value);
    cordaRaiz = parseFloat(document.getElementById("cordaRaiz").value);
    cordaPonta = parseFloat(document.getElementById("cordaPonta").value);

    // Cálculo
    area = areaAsa(tipo, envergadura, semiEnvergadura, cordaRaiz, cordaPonta);
    alongamento = alongamentoAsa(envergadura, area);
    afilamento = afilamentoAsa(cordaRaiz, cordaPonta, tipo);
    cordaMedia = cordaMediaAsa(cordaRaiz, afilamento, tipo);
    yMed = yMedioAsa(envergadura, afilamento);
    reynolds = numeroReynolds(velocidade, cordaMedia, viscoCin);

    // Mostrar no site
    document.getElementById("AfilamentoAlongamento").innerText = "Informe Delta para Alongamento = " + alongamento + " e Afilamento = " + afilamento;
}

function calculo2() {
    let tipo, envergadura, semiEnvergadura, cordaRaiz, cordaPonta, delta, peso, densidadeAr, clProjeto, cdProjeto;
    let clMax, clZero, clAlphaZero, alpha1, cl1, alpha2, cl2, constProp, CLMax, coefAtrito, areaMolhada, efProjeto;
    let area, alongamento, afilamento, cordaMedia, yMed, reynolds, a0, aAsa, velStol, coefParasita;

    // Dados do Avião
    peso = parseFloat(document.getElementById("peso").value);
    areaMolhada = parseFloat(document.getElementById("areaMolhada").value);

    // Características do Fluido
    velocidade = parseFloat(document.getElementById("velocidade").value);
    densidadeAr = parseFloat(document.getElementById("densidade").value);
    viscoCin = parseFloat(document.getElementById("viscoCin").value);

    // Dados da Asa
    tipo = parseInt(document.getElementById("tipoAsa").value);
    envergadura = parseFloat(document.getElementById("envergadura").value);
    semiEnvergadura = parseFloat(document.getElementById("semiEnvergadura").value);
    cordaRaiz = parseFloat(document.getElementById("cordaRaiz").value);
    cordaPonta = parseFloat(document.getElementById("cordaPonta").value);

    // Dados do Perfil Aerodinâmico
    clMax = parseFloat(document.getElementById("clMax").value);
    clZero = parseFloat(document.getElementById("clZero").value);
    clAlphaZero = parseFloat(document.getElementById("clAlphaZero").value);
    alpha1 = parseFloat(document.getElementById("alpha1").value);
    alpha2 = parseFloat(document.getElementById("alpha2").value);
    cl1 = parseFloat(document.getElementById("cl1").value);
    cl2 = parseFloat(document.getElementById("cl2").value);
    delta = parseFloat(document.getElementById("delta").value);

    // Cálculo
    area = areaAsa(tipo, envergadura, semiEnvergadura, cordaRaiz, cordaPonta);
    alongamento = alongamentoAsa(envergadura, area);
    afilamento = afilamentoAsa(cordaRaiz, cordaPonta, tipo);
    cordaMedia = cordaMediaAsa(cordaRaiz, afilamento, tipo);
    yMed = yMedioAsa(envergadura, afilamento);
    reynolds = numeroReynolds(velocidade, cordaMedia, viscoCin);
    a0 = coefAngularPerfil(alpha1, cl1, alpha2, cl2);
    aAsa = coefAngularAsa(a0, alongamento, delta);
    constProp = constanteProporcionalidade(delta, alongamento);
    CLMax = CLMaxAsa(a0, aAsa, clMax);
    velStol = velocidadeEstol(peso, densidadeAr, area, CLMax);
    coefAtrito = coefAtritoEquivalenteTurb(reynolds);
    coefParasita = coefArrastoParasita(coefAtrito, area, areaMolhada);
    clProjeto = coefSustentacaoProjeto(coefParasita, constProp);
    cdProjeto = coefArrastoProjeto(coefParasita, constProp, clProjeto);
    efProjeto = eficienciaMaxProjeto(clProjeto, cdProjeto);

    // VALORES QUE DEVEM IR PRA LINHA DA TABELA
    document.getElementById("areaAsa").innerText = "Area da Asa: " + area;
    document.getElementById("alongamento").innerText = "Alongamento: " + alongamento;
    document.getElementById("afilamento").innerText = "Afilamento: " + afilamento;
    document.getElementById("cordaMedia").innerText = "Corda média: " + cordaMedia;
    document.getElementById("yMedio").innerText = "Y medio: " + yMed;
    document.getElementById("a0").innerText = "Coeficiente angular do perfil: " + a0;
    document.getElementById("aAsa").innerText = "Coeficiente angular da asa: " + aAsa;
    document.getElementById("constProp").innerText = "Constante de proporcionalidade: " + constProp;
    document.getElementById("CLMax").innerText = "Constante de sustentação máximo da asa: " + CLMax;
    document.getElementById("velStol").innerText = "Velocidade de estol: " + velStol;
    document.getElementById("coefAtrito").innerText = "Coeficiente de atrito Equivalente: " + coefAtrito;
    document.getElementById("coefParasita").innerText = "Coeficiente de arrasto parasita: " + coefParasita;
    document.getElementById("clProjeto").innerText = "Coeficiente de Sustentação do projeto: " + clProjeto;
    document.getElementById("cdProjeto").innerText = "Coeficiente de arrasto do projeto: " + cdProjeto;
    document.getElementById("efProjeto").innerText = "Eficiencia máxima do projeto: " + efProjeto;
}