function clickStart() {
  const listaTotal = document.querySelector("#casasBingo").value.split("\n");
  const qtdCartelas = parseInt(document.querySelector("#qtdCartelas").value, 0);
  const nomeBingo = document.querySelector("#nomeBingo").value;
  // const imgCartela = document.querySelector("#imgCartela").value;
  const tipoBingo = parseInt(
    document.querySelector('input[name="tipoBingo"]:checked').value
  );

  if (!listaTotal || listaTotal.length < 30) {
    alert("É necessário uma lista de, pelo menos, 30 items!");
    return;
  }

  const gen = new Gerador(listaTotal, tipoBingo);
  const out = document.querySelector("#output");
  out.className = "";
  out.innerHTML = "";
  out.classList.add(tipoBingo === 1 ? "bingo-num" : "bingo-text");

  for (let i = 0; i < qtdCartelas; i++) {
    var t = new Cartela(nomeBingo, gen.GerarCartela());
    out.append(t.genNode());
  }
}

function gerarValoresPadroes() {
  const tipoBingo = parseInt(
    document.querySelector('input[name="tipoBingo"]:checked').value
  );

  const valores = document.querySelector("#casasBingo");

  if (tipoBingo === 1) {
    // gerando 90 números das casas
    valores.value = Array(60)
      .fill()
      .map((_, index) => index + 1)
      .toString()
      .split(",")
      .join("\n");
  } else {
    valores.value = "";
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Gerador {
  constructor(lista, imagem, tipoBingo) {
    this.max = lista.length;
    this.listaBase = [];
    this.tipoBingo = tipoBingo;
    for (let item of lista) {
      this.listaBase.push(new CasaCartela(item.trim()));
    }
    imagem = "superlogica.png";
    this.casaImagem = new CasaCartela(null, imagem);
  }

  GerarCartela = function () {
    let usada = [];
    let i = 0;
    let retorno = [];
    let j;

    while (i < 25) {
      if (i == 12) {
        i++;
        continue;
      }

      do {
        j = getRandomInt(0, this.max);
      } while (usada[j] === true);

      usada[j] = true;
      retorno.push(this.listaBase[j]);
      i++;
    }

    // somente se for do tipo numérico
    if (this.tipoBingo === 1) {
      // ordenar os números
      retorno = retorno.sort(
        (a, b) => parseInt(a.display, 10) - parseInt(b.display, 10)
      );
    }
    // incluir a casa da imagem no centro da cartela
    retorno.splice(12, 0, this.casaImagem);
    return retorno;
  };
}

class Cartela {
  constructor(_titulo, _casas) {
    this.titulo = _titulo;
    this.casas = [[], [], [], [], []];
    let i = 0;
    let j = 0;
    // cria a matriz bidimensional transposta para ordenar corretamente de cima para baixo
    for (let y = 0; y < 5; y++) {
      for (let x = y, c = 0; c < 5; x += 5, c++) {
        this.casas[i][j++] = _casas[x];
        if (j > 4) {
          i++;
          j = 0;
        }

        if (i > 4) break;
      }
    }
  }
}

Cartela.prototype.genNode = function () {
  let container = document.createElement("div");
  container.classList.add("cartela");
  container.innerHTML = `
        <h2 class="cartela-titulo">${this.titulo} </h2>
            <div class ="cartela-corpo">
            ${this.casas
              .map(
                (item, i) => `
                <div class="cartela-linha">
                    ${item.map((casa, j) => `${casa.genTemplate()} `).join("")}
                </div>
            `
              )
              .join("")}
        </div>`;
  return container;
};

class CasaCartela {
  constructor(valor, imagem) {
    this.display = valor != null ? valor : imagem;
    this.tipo = valor != null ? 1 : 2;
  }
}

CasaCartela.prototype.genTemplate = function () {
  if (this.tipo == 1) return `<div class="cartela-casa">${this.display} </div>`;
  else
    return `<div class ="cartela-casa cartela-casa-img"><img src='${this.display}' /></div>`;
};

document.addEventListener("DOMContentLoaded", function (event) {
  gerarValoresPadroes();
});

var purecookieTitle = "Cookies."
  , purecookieDesc = "Este site não faz nada com os seus dados!<br>"
  , purecookieLink = '<a href="https://www.youtube.com/embed/hjZvP15bzIc" target="_blank">Clique aqui para que nada aconteça!</a>'
  , purecookieButton = "Aceito";
function pureFadeIn(e, o) {
    var i = document.getElementById(e);
    i.style.opacity = 0,
    i.style.display = o || "block",
    function e() {
        var o = parseFloat(i.style.opacity);
        (o += .02) > 1 || (i.style.opacity = o,
        requestAnimationFrame(e))
    }()
}
function pureFadeOut(e) {
    var o = document.getElementById(e);
    o.style.opacity = 1,
    function e() {
        (o.style.opacity -= .02) < 0 ? o.style.display = "none" : requestAnimationFrame(e)
    }()
}
function setCookie(e, o, i) {
    var t = "";
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
        t = "; expires=" + n.toUTCString()
    }
    document.cookie = e + "=" + (o || "") + t + "; path=/"
}
function getCookie(e) {
    for (var o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
        for (var n = i[t]; " " == n.charAt(0); )
            n = n.substring(1, n.length);
        if (0 == n.indexOf(o))
            return n.substring(o.length, n.length)
    }
    return null
}
function eraseCookie(e) {
    document.cookie = e + "=; Max-Age=-99999999;"
}
function cookieConsent() {
    getCookie("purecookieDismiss") || (document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' + purecookieTitle + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + " " + purecookieLink + '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + purecookieButton + "</a></div></div>",
    pureFadeIn("cookieConsentContainer"))
}
function purecookieDismiss() {
    setCookie("purecookieDismiss", "1", 7),
    pureFadeOut("cookieConsentContainer")
}
window.onload = function() {
    cookieConsent()
}
;