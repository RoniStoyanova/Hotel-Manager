//var myColor = ["#390402","#861611","#8E9321","#022E53","#107AD2","#D24309","#6F9E55","#233319","#6B2408","#191C33","#D41500","#A11000"];
//var myData = [10,30,20,60,40];

function getTotal(myData){
    var myTotal = 0;
    for (var j = 0; j < myData.length; j++) {
        myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
    }
    return myTotal;
}

function plotData(myData,myColor) {
    var canvas;
    var ctx;
    var lastend = 0;
    var myTotal = getTotal(myData);

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < myData.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(200,150);
        ctx.arc(200,150,150,lastend,lastend+
        (Math.PI*2*(myData[i]/myTotal)),false);
        ctx.lineTo(200,150);
        ctx.fill();
        lastend += Math.PI*2*(myData[i]/myTotal);
    }
}

