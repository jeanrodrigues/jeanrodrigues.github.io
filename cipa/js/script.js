const main = document.getElementById('main')
const cardHTML = `<br><h2 class="center" id="contador"></h2>
    <h2 class="center"0 id="contadorRecorde"></h2>`
main.innerHTML = cardHTML

document.ready = function () {

};
setInterval(function () {

    var _segundo = 1000;
    var _minuto = _segundo * 60;
    var _hora = _minuto * 60;
    var _dia = _hora * 24;

    var atual = new Date();
    var ultimoAcidente = new Date('12/31/2024'); // MM/DD/YYYY HH:MM:SS
    var recordeMaximo = 0;

    var diferenca = atual - ultimoAcidente;
    var diasSemAcidentes = Math.floor(diferenca / _dia);

    var face = "mood";
    if ((diasSemAcidentes == 0)) {
        face = "mood_bad";
    }

    if ((diasSemAcidentes > recordeMaximo)) {
        var recordeMaximo = diasSemAcidentes;
    }

    document.getElementById("face").innerHTML = face;
    document.getElementById('contador').innerHTML = '<b>ESTAMOS TRABALHANDO HÁ <u>' + diasSemAcidentes + '</u> DIA(S) SEM ACIDENTES.</b>';
    document.getElementById('contadorRecorde').innerHTML = '<b>NOSSO RECORDE É DE <u>' + recordeMaximo + '</u> DIA(S).</b>';

}, 1000);