function dataAtualFormatada() {
    let data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();
    return `${dia}-${mes}-${ano}`;
}
console.log(dataAtualFormatada());
var iBack = new Image(),
    iMark = "EVIDÊNCIA PCI - " + dataAtualFormatada(),
    canvas = document.getElementById("demo"),
    ctx = canvas.getContext("2d");

function cmark() {
    canvas.width = iBack.naturalWidth;
    canvas.height = iBack.naturalHeight;
    ctx.drawImage(iBack, 0, 0, iBack.naturalWidth, iBack.naturalHeight);

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
    ctx.fillText(iMark, 10, 30);

    let anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "EVIDÊNCIA PCI - " + dataAtualFormatada() + ".png";
    anchor.click();
    anchor.remove();
}

function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function (e) {
            iBack.onload = cmark;
            iBack.src = document.getElementById("demo").src = e.target.result;
        };
        file.readAsDataURL(this.files[0]);
    }
}
document.getElementById("img-input").addEventListener("change", readImage, false);