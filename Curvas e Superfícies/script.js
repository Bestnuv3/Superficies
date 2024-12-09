"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);
var materialLinha = new THREE.LineBasicMaterial({color:0xFFFFFF});
var pontos = [];
var controles = new THREE.OrbitControls(camera, render.domElement);
/*
var raio = 1;
for (var ang = 0; ang <= Math.PI * 2; ang += Math.PI/5){
    var x = raio * Math.cos(ang);
    var y = raio * Math.sin(ang);
    pontos.push(new THREE.Vector3(x, y, 0));
}


var x = raio * Math.cos(ang);
var y = raio * Math.sin(ang);
pontos.push(new THREE.Vector3(x, y, 0));

/*
var raio = 1;
for (var y = -1; y <=1; y+=0.1){
    var x = Math.sqrt(raio * raio - y * y);
    pontos.push(new THREE.Vector3(x, y, 0)); 
}


var p1 = new THREE.Vector3(-0.5, 0, 0);
var t1 = new THREE.Vector3(-2, 2, 0);
var p2 = new THREE.Vector3(0.5, 0, 0);
var t2 = new THREE.Vector3(1, 1, 0);

for(var s=0; s <= 1; s += 0.1){
    var s2 = s * s;
    var s3 = s2 * s;
    var h1 = 2 * s3 - 3 *s2 + 1;
    var h2 = -2 * s3 + 3 * s2;
    var h3 = s3 - 2 *s2 + s;
    var h4 = s3 - s2;
    var pt = new THREE.Vector3(0, 0, 0);

    pt.add(p1.clone().multiplyScalar(h1));
    pt.add(p2.clone().multiplyScalar(h2));
    pt.add(t1.clone().multiplyScalar(h3));
    pt.add(t2.clone().multiplyScalar(h4));
    pontos.push(pt);
}


var curva = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 1.5, 0),
    new THREE.Vector3(2, 1.5, 0),
    new THREE.Vector3(1, 0, 0)
);

pontos = curva.getPoints(10);

var curva = new THREE.SplineCurve([
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1.5, 0.5, 0),
    new THREE.Vector3(2, 0, 0)
]);
*/

function gerarCilindroLinhas(raio=1, altura=2, pRaio=8){
    var pontos = [];
    for (var a=0; a<=Math.PI*2; a+=(Math.PI*2)/pRaio){
        var x = Math.sin(a) * raio;
        var z = Math.cos(a) * raio;
        pontos.push(new THREE.Vector3(x, -altura/2, z));
        pontos.push(new THREE.Vector3(x, altura/2, z));
    }
    return new THREE.BufferGeometry().setFromPoints(pontos);
}

function gerarQuadro(larg = 1, alt = 1){
    var pontos = [];
    pontos.push(new THREE.Vector3(-larg/2, alt/2));
    pontos.push(new THREE.Vector3(larg/2, alt/2));
    pontos.push(new THREE.Vector3(-larg/2, -alt/2));
    pontos.push(new THREE.Vector3(larg/2, alt/2));
    pontos.push(new THREE.Vector3(-larg/2, -alt/2));
    pontos.push(new THREE.Vector3(larg/2, -alt/2));

    return new THREE.BufferGeometry().setFromPoints(pontos);
}

function gerarCilindro(r = 1, alt = 1, pRaio = 4){
    var pontos = [];
    for (var a = 0; a<=Math.PI*2; a += (Math.PI*2)/(pRaio)){
        var x = Math.sin(a) * r;
        var x2 = Math.sin(a+(Math.PI*2)/(pRaio)) * r;
        var z = Math.cos(a) * r;
        var z2 = Math.cos((a+(Math.PI*2)/(pRaio))) * r;
        pontos.push(new THREE.Vector3(x, -alt/2, z));
        pontos.push(new THREE.Vector3(x2, alt/2, z2));
        pontos.push(new THREE.Vector3(x, alt/2, z));
        pontos.push(new THREE.Vector3(x, -alt/2, z));
        pontos.push(new THREE.Vector3(x2, -alt/2, z2));
        pontos.push(new THREE.Vector3(x2, alt/2, z2));
    }
    return new THREE.BufferGeometry().setFromPoints(pontos);
}

function gerarSuperficiePlana(lar = 1, alt = 1, p = 1){
    var pontos = [];
    for (var x = -lar/2; x < lar/2; x += lar/p){
        for (var y = alt/2; y > -alt/2; y -= alt/p){
            pontos.push(new THREE.Vector3 (x, y, 0));
            pontos.push(new THREE.Vector3 (x, y-alt/p, 0));
            pontos.push(new THREE.Vector3 (x+lar/p, y-alt/p, 0));
            pontos.push(new THREE.Vector3 (x, y, 0));
            pontos.push(new THREE.Vector3 (x+lar/p, y-alt/p, 0));
            pontos.push(new THREE.Vector3 (x+lar/p, y, 0));
        }
    }
    return new THREE.BufferGeometry().setFromPoints(pontos);
}

var forma = new THREE.LineSegments(gerarSuperficiePlana(2, 3, 5), new THREE.LineBasicMaterial({color: 0xffffff}));
cena.add(forma);
/*
pontos = curva.getPoints(50);
var materialPonto = new THREE.PointsMaterial({size: 10, sizeAttenuation: false});

for (let p of curva.points){
    var coord = [];
    coord.push(new THREE.Vector3(p.x, p.y, p.z));
    var geometriaPonto = new THREE.BufferGeometry().setFromPoints(coord);
    var ponto = new THREE.Points(geometriaPonto, materialPonto);
    cena.add(ponto);
}

var geometriaLinha = new THREE.BufferGeometry().setFromPoints(pontos);
var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);
*/
camera.position.z = 5;

function desenhar() {
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);