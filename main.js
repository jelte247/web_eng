import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

//Szene + Kamera
const sc = new THREE.Scene();
sc.background = new THREE.Color( 0x31a4eb );
const cam = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
cam.position.z = 5;

//Renderer
const rend = new THREE.WebGLRenderer({antialias: true});
rend.setSize( window.innerWidth, window.innerHeight );
rend.setAnimationLoop( animate );
document.body.appendChild( rend.domElement );

const controls = new OrbitControls( cam, rend.domElement );

//Materialien
const aussenMat = new THREE.MeshStandardMaterial({color: 0x999c97, castShadow: true});
const boxMat = new THREE.MeshStandardMaterial({color: 0x000000, castShadow: true});
const schwarzMetallMat = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    side: THREE.DoubleSide, 
    roughness: 1,
    metalness: 1,
});
const metallMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    side: THREE.DoubleSide,
    metalness: 0.5,
    roughness: 1,
});
const holzMat = new THREE.MeshStandardMaterial({color: 0xd2b48c})
const schwarzMattMat = new THREE.MeshLambertMaterial({color: 0x282828});
const og2ZaunMat = new THREE.MeshBasicMaterial({color: 0xe0e0e0, transparent: true, opacity: 0.95});
og2ZaunMat.side = THREE.DoubleSide;
const groundMat = new THREE.MeshStandardMaterial({ color: 0xc9ccc6, castShadow: true});
groundMat.side = THREE.DoubleSide;
const mensaMat = new THREE.MeshStandardMaterial({
    color: 0x8a8a8a,
    roughness: 0.8,
    castShadow: true,
});
const floorMat = new THREE.MeshStandardMaterial({color: 0xcbe1f2, castShadow: true});
const fensterMat = new THREE.MeshPhysicalMaterial({
    color: 0x6e6d6d,
    metalness: 0.0,
    roughness: 0.0,
    opacity: 0.2,
    transparent: true,
    side: THREE.DoubleSide,
});
const fensterDarkMat = new THREE.MeshPhongMaterial({
    color: 0x050505,
    transparent: true,
    opacity: 0.4,
    shininess: 100,
});
const infoMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    opacity: 0.9,
    transparent: true,
    metalness: 100,
});
const mensa2OGMat = new THREE.MeshBasicMaterial({color: 0xffffff});
mensa2OGMat.side = THREE.DoubleSide;
const og2Mat = new THREE.MeshBasicMaterial({color: 0xe9e9e9});
og2Mat.side = THREE.DoubleSide;
const og2TopMat = new THREE.MeshStandardMaterial();
const bodenMat = new THREE.MeshStandardMaterial({color: 0xcf695d, castShadow: true});
bodenMat.side = THREE.DoubleSide;
const thekeMat = new THREE.MeshStandardMaterial({castShadow: true});
thekeMat.side = THREE.DoubleSide;
const unterFrontMat = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide, castShadow: true});
const unterFrontTopMat = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, castShadow: true});
const unterMat = [
    unterFrontMat,
    unterFrontMat,
    unterFrontTopMat,
    unterFrontMat,
    unterFrontMat,
    unterFrontMat,
]
unterMat.castShadow = true;
const mensaOG2MatArr = [
    og2Mat,
    og2Mat,
    og2TopMat,
    floorMat,
    og2Mat,
    og2Mat,
]
const erdeMat = new THREE.MeshStandardMaterial({color: 0x6b3d00});
erdeMat.side = THREE.DoubleSide;
floorMat.side = THREE.DoubleSide;
mensaMat.side = THREE.DoubleSide;
const treppeMat = [
    unterFrontMat,
    unterFrontMat,
    aussenMat,
    unterFrontMat,
    unterFrontMat,
    unterFrontMat,
]
const infoMatArr = [
    infoMat,
    infoMat,
    unterFrontMat,
    unterFrontMat,
    infoMat,
    infoMat,
]
//Texturen
const loadbrick = new THREE.TextureLoader();
const brickT = loadbrick.load("textures/1K_brick_wall_21_basecolor.png");
brickT.repeat.set(3, 3);
brickT.wrapS = THREE.RepeatWrapping;
brickT.wrapT = THREE.RepeatWrapping;
const brickMat = new THREE.MeshPhysicalMaterial({
    map: brickT,
    side: THREE.DoubleSide,
    color: 0xe0e0e0,
    roughness: 1,
})
const loadgras = new THREE.TextureLoader();
const grasT = loadgras.load("textures/Poliigon_GrassPatchyGround_4585_BaseColor.jpg");
const grassMat = new THREE.MeshPhysicalMaterial({
    map: grasT,
    side: THREE.DoubleSide,
})

//Meshes
//Untergrund
const groundGeom = new THREE.PlaneGeometry(8, 4.7);
const ground = new THREE.Mesh (groundGeom, groundMat);
ground.rotation.x = -Math.PI / 2;               //Ansatz aus ChatGPT
ground.position.x = 1.8;
ground.position.y = -0.02;
sc.add(ground);
const wegGeom = new THREE.PlaneGeometry(2, 0.7);
const weg = new THREE.Mesh(wegGeom, groundMat);
weg.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
weg.position.set(-3.2, -0.02, 2);
sc.add(weg);
const eingAGeom = new THREE.PlaneGeometry(0.7, 1.8);
const eingA = new THREE.Mesh(eingAGeom, groundMat);
eingA.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
eingA.position.set(-2.8, -0.02, 2.1);
sc.add(eingA);
const eingBGeom = new THREE.PlaneGeometry(0.7, 0.7);
const eingB = new THREE.Mesh(eingBGeom, groundMat);
eingB.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
eingB.position.set(2.5, -0.02, 2.65);
sc.add(eingB);
const vorMensaGeom = new THREE.PlaneGeometry(3.7, 0.5);
const vorMensa = new THREE.Mesh(vorMensaGeom, groundMat);
vorMensa.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
vorMensa.position.set(0.3, -0.02, 2.6);
sc.add(vorMensa);

const grassGeom = new THREE.PlaneGeometry(9, 6);
const grass = new THREE.Mesh (grassGeom, grassMat);
grass.rotation.x = -Math.PI / 2;               //Ansatz aus ChatGPT
grass.position.y = -0.021;
grass.position.x = 1.3;
sc.add(grass, grassMat);

//Mensa
//linke Wand
const mensaLeftGlasGeom = new THREE.BoxGeometry(0.1, 0.5, 2.2);
const mensaLeftGlas = new THREE.Mesh(mensaLeftGlasGeom, fensterMat);
mensaLeftGlas.position.set(-1.5, 0.23, -0.4);
sc.add(mensaLeftGlas);
const mensaLeftWandGeom = new THREE.BoxGeometry(0.1, 0.3, 0.8);
const mensaLeftWand = new THREE.Mesh(mensaLeftWandGeom, mensaMat);
mensaLeftWand.position.set(-1.5, 0.13, 1.1);
sc.add(mensaLeftWand);
const mensaLeftFensterreiheGeom = new THREE.BoxGeometry(0.1, 0.2, 0.8);
const mensaLeftFensterreihe = new THREE.Mesh(mensaLeftFensterreiheGeom, fensterDarkMat);
mensaLeftFensterreihe.position.set(-1.5, 0.38, 1.1);
sc.add(mensaLeftFensterreihe);
const mensaLeftOGGeom = new THREE.BoxGeometry(0.1, 0.3, 3);
const mensaLeftOG = new THREE.Mesh(mensaLeftOGGeom, mensaMat);
mensaLeftOG.position.set(-1.5, 0.632, 0);
sc.add(mensaLeftOG);
const mensaLeftFensterreiheOGGeom = new THREE.BoxGeometry(0.1, 0.18, 3);
const mensaLeftFensterreiheOG = new THREE.Mesh(mensaLeftFensterreiheOGGeom, fensterDarkMat);
mensaLeftFensterreiheOG.position.set(-1.5, 0.87, 0);
sc.add(mensaLeftFensterreiheOG);
const mensaLeftOG2Geom = new THREE.BoxGeometry(0.1, 0.25, 3);
const mensaLeftOG2 = new THREE.Mesh(mensaLeftOG2Geom, mensaMat);
mensaLeftOG2.position.set(-1.5, 1.08, 0);
sc.add(mensaLeftOG2);

//Frontwand
const mensaFrontWandLGeom = new THREE.BoxGeometry(0.9, 0.3, 0.1);
const mensaFrontWandL = new THREE.Mesh(mensaFrontWandLGeom, mensaMat);
mensaFrontWandL.position.set(-1.101, 0.13, 1.5);
sc.add(mensaFrontWandL);
const mensaFrontFensterreiheLinksGeom = new THREE.BoxGeometry(0.9, 0.2, 0.1);
const mensaFrontFensterreiheLinks = new THREE.Mesh(mensaFrontFensterreiheLinksGeom, fensterDarkMat);
mensaFrontFensterreiheLinks.position.set(-1.101, 0.38, 1.5);
sc.add(mensaFrontFensterreiheLinks);
const mensaFrontTuerLinksGeom = new THREE.BoxGeometry(0.3, 0.35, 0.1)
const mensaFrontTuerLinks = new THREE.Mesh(mensaFrontTuerLinksGeom, fensterMat);
mensaFrontTuerLinks.position.set(-0.5, 0.155, 1.5);
sc.add(mensaFrontTuerLinks);
const mensaFrontFensterreiheZentGeom = new THREE.BoxGeometry(1.5, 0.15, 0.1);
const mensaFrontFensterreiheZent = new THREE.Mesh(mensaFrontFensterreiheZentGeom, fensterDarkMat);
mensaFrontFensterreiheZent.position.set(0.1, 0.405, 1.5);
sc.add(mensaFrontFensterreiheZent);
const mensaFrontWandZGeom = new THREE.BoxGeometry(0.7, 0.35, 0.1);
const mensaFrontWandZ = new THREE.Mesh(mensaFrontWandZGeom, unterMat);
mensaFrontWandZ.position.set(0.26, 0.155, 1.5);
sc.add(mensaFrontWandZ);
const mensaFrontTuerRechtsGeom = new THREE.BoxGeometry(0.238, 0.35, 0.1);
const mensaFrontTuerRechts = new THREE.Mesh(mensaFrontTuerRechtsGeom, fensterMat);
mensaFrontTuerRechts.position.set(0.73, 0.155, 1.5);
sc.add(mensaFrontTuerRechts);
const mensaFrontWandRGeom = new THREE.BoxGeometry(0.67, 1.225, 0.1);
const mensaFrontWandR = new THREE.Mesh(mensaFrontWandRGeom, mensaMat);
mensaFrontWandR.position.set(1.17, 0.5925, 1.5);
sc.add(mensaFrontWandR);
const mensaFrontWandOGGeom = new THREE.BoxGeometry(2.386, 0.3, 0.1);
const mensaFrontWandOG = new THREE.Mesh(mensaFrontWandOGGeom, mensaMat);
mensaFrontWandOG.position.set(-0.357, 0.63, 1.5);
sc.add(mensaFrontWandOG);
const mensaFrontFensterreiheOGGeom = new THREE.BoxGeometry(2.386, 0.18, 0.1);
const mensaFrontFensterreiheOG = new THREE.Mesh(mensaFrontFensterreiheOGGeom, fensterDarkMat);
mensaFrontFensterreiheOG.position.set(-0.357, 0.87, 1.5);
sc.add(mensaFrontFensterreiheOG);
const mensaFrontWandOG2Geom = new THREE.BoxGeometry(2.386, 0.25, 0.1);
const mensaFrontWandOG2 = new THREE.Mesh(mensaFrontWandOG2Geom, mensaMat);
mensaFrontWandOG2.position.set(-0.357, 1.08, 1.5);
sc.add(mensaFrontWandOG2);

//rechte Wand
const mensaRechtsWandLGeom = new THREE.BoxGeometry(0.1, 1.225, 0.7);
const mensaRechtsWandL = new THREE.Mesh(mensaRechtsWandLGeom, mensaMat);
mensaRechtsWandL.position.set(1.5, 0.5925, 1.2);
sc.add(mensaRechtsWandL);
const mensaRechtsKWandLGeom = new THREE.BoxGeometry(0.1, 0.35, 0.3);
const mensaRechtsKWandL = new THREE.Mesh(mensaRechtsKWandLGeom, unterMat);    //mat fehlt
mensaRechtsKWandL.position.set(1.5, 0.155, 0.7);
sc.add(mensaRechtsKWandL);
const mensaRechtsTuerGeom = new THREE.BoxGeometry(0.1, 0.35, 0.25);
const mensaRechtsTuer = new THREE.Mesh(mensaRechtsTuerGeom, fensterDarkMat);
mensaRechtsTuer.position.set(1.5, 0.155, 0.425);
sc.add(mensaRechtsTuer);
const mensaRechtsKWandRGeom = new THREE.BoxGeometry(0.1, 0.35, 0.95);
const mensaRechtsKWandR = new THREE.Mesh(mensaRechtsKWandRGeom, unterMat);
mensaRechtsKWandR.position.set(1.5, 0.155, -0.175);
sc.add(mensaRechtsKWandR);
const mensaRechtsFensterreiheGeom = new THREE.BoxGeometry(0.1, 0.15, 1.5);
const mensaRechtsFensterreihe = new THREE.Mesh(mensaRechtsFensterreiheGeom, fensterDarkMat);
mensaRechtsFensterreihe.position.set(1.5, 0.405, 0.1);
sc.add(mensaRechtsFensterreihe);
const mensaRechtsWandRGeom = new THREE.BoxGeometry(0.1, 0.5, 0.85);
const mensaRechtsWandR = new THREE.Mesh(mensaRechtsWandRGeom, mensaMat);
mensaRechtsWandR.position.set(1.5, 0.23, -1.075);
sc.add(mensaRechtsWandR);
const mensaRechtsWandOGGeom = new THREE.BoxGeometry(0.1, 0.3, 2.35);
const mensaRechtsWandOG = new THREE.Mesh(mensaRechtsWandOGGeom, mensaMat);
mensaRechtsWandOG.position.set(1.5, 0.63, -0.325);
sc.add(mensaRechtsWandOG);
const mensaRechtsFensterreiheOGGeom = new THREE.BoxGeometry(0.1, 0.25, 2.35);
const mensaRechtsFensterreiheOG = new THREE.Mesh(mensaRechtsFensterreiheOGGeom, fensterDarkMat);
mensaRechtsFensterreiheOG.position.set(1.5, 0.87, -0.325);
sc.add(mensaRechtsFensterreiheOG);
const mensaRechtsWandOG2Geom = new THREE.BoxGeometry(0.1, 0.25, 2.35);
const mensaRechtsWandOG2 = new THREE.Mesh(mensaRechtsWandOG2Geom, mensaMat);
mensaRechtsWandOG2.position.set(1.5, 1.08, -0.325);
sc.add(mensaRechtsWandOG2);

//Wand Rückseite
const mensaBackGlasGeom = new THREE.BoxGeometry(2.2, 0.5, 0.1);
const mensaBackGlas = new THREE.Mesh(mensaBackGlasGeom, fensterMat);
mensaBackGlas.position.set(-0.45, 0.23, -1.5);
sc.add(mensaBackGlas);
const mensaBackWandOGGeom = new THREE.BoxGeometry(3.1, 0.3, 0.1);
const mensaBackWandOG = new THREE.Mesh(mensaBackWandOGGeom, mensaMat);
mensaBackWandOG.position.set(0, 0.632, -1.5);
sc.add(mensaBackWandOG);
const mensaBackFensterreiheOGGeom = new THREE.BoxGeometry(3.1, 0.18, 0.1);
const mensaBackFensterreiheOG = new THREE.Mesh(mensaBackFensterreiheOGGeom, fensterDarkMat);
mensaBackFensterreiheOG.position.set(0, 0.87, -1.5);
sc.add(mensaBackFensterreiheOG);
const mensaBackWandOG2Geom = new THREE.BoxGeometry(3.1, 0.25, 0.1);
const mensaBackWandOG2 = new THREE.Mesh(mensaBackWandOG2Geom, mensaMat);
mensaBackWandOG2.position.set(0, 1.08, -1.5);
sc.add(mensaBackWandOG2);
const mensaBackWandLGeom = new THREE.BoxGeometry(0.8, 0.5, 0.1);
const mensaBackWandL = new THREE.Mesh(mensaBackWandLGeom, mensaMat);
mensaBackWandL.position.set(1.05, 0.23, -1.5);
sc.add(mensaBackWandL);

//Hinter
const pfeilerLGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.43);
const pfeilerL = new THREE.Mesh(pfeilerLGeom, schwarzMetallMat);
pfeilerL.position.set(-1.4, 0.2, -2.1);
sc.add(pfeilerL);
const pfeilerR = pfeilerL.clone();
pfeilerR.position.x = 0.5;
sc.add(pfeilerR);
const glassdachGeom = new THREE.PlaneGeometry(2, 0.8);
const glassdach = new THREE.Mesh(glassdachGeom, fensterMat);
glassdach.rotation.x = 20;
glassdach.position.set(-0.45, 0.5, -1.85);
sc.add(glassdach);
const glassdachRandGeom = new THREE.EdgesGeometry(glassdachGeom);
const glassdachRand = new THREE.LineSegments(glassdachRandGeom, schwarzMetallMat);
glassdachRand.position.set(2, 2, 2);
glassdachRand.position.set(-0.45, 0.5, -1.85);
glassdachRand.rotation.x = 20;
sc.add(glassdachRand);

//OG2
const og2BlockAGeom = new THREE.BoxGeometry(3, 0.7, 1.5);
const og2BlockA = new THREE.Mesh(og2BlockAGeom, mensaOG2MatArr);
og2BlockA.position.set(0, 1.55, 0.75);
sc.add(og2BlockA);
const og2BlockBGeom = new THREE.BoxGeometry(2.3, 0.7, 1.5);
const og2BlockB = new THREE.Mesh(og2BlockBGeom, mensaOG2MatArr);
og2BlockB.position.set(-0.35, 1.55, -0.75);
sc.add(og2BlockB);
const og2AussenRechtsGeom = new THREE.PlaneGeometry(1.5, 0.6);
const og2AussenRechts = new THREE.Mesh(og2AussenRechtsGeom, og2ZaunMat);
og2AussenRechts.position.set(1.5, 1.4, -0.75);
og2AussenRechts.rotation.y = Math.PI / 2;               //Ansatz aus ChatGPT
sc.add(og2AussenRechts);
const og2AussenRueckGeom = new THREE.PlaneGeometry(0.7, 0.6)
const og2AussenRueck = new THREE.Mesh(og2AussenRueckGeom, og2ZaunMat);
og2AussenRueck.position.set(1.15, 1.4, -1.5);
sc.add(og2AussenRueck);

//Innen
//Boden
const bodenEGGeom = new THREE.PlaneGeometry(3, 3);
const bodenEG = new THREE.Mesh(bodenEGGeom, bodenMat);
bodenEG.rotation.x = -Math.PI / 2;        //Ansatz aus ChatGPT
bodenEG.position.set(0, -0.019, 0);
sc.add(bodenEG);
const bodenOG1Geom = new THREE.PlaneGeometry(3, 3);
const bodenOG1 = new THREE.Mesh(bodenOG1Geom, groundMat);
bodenOG1.rotation.x = -Math.PI / 2;        //Ansatz aus ChatGPT
bodenOG1.position.set(0, 0.6, 0);
bodenOG1.castShadow = true;
sc.add(bodenOG1);
const bodenOG2Geom = new THREE.PlaneGeometry(3, 3);
const bodenOG2 = new THREE.Mesh(bodenOG2Geom, groundMat);
bodenOG2.rotation.x = -Math.PI / 2;         //Ansatz aus ChatGPT
bodenOG2.position.set(0, 1.119, 0);
sc.add(bodenOG2);

//Boxen
const boxVorneLinksGeom = new THREE.BoxGeometry(1, 0.615, 0.5);
const boxVorneLinks = new THREE.Mesh(boxVorneLinksGeom, brickMat);     
boxVorneLinks.position.set(-0.95, 0.29, 1.2);
sc.add(boxVorneLinks);
const boxVorneRechtsGeom = new THREE.BoxGeometry(0.9, 0.615, 0.75);
const boxVorneRechts = new THREE.Mesh(boxVorneRechtsGeom, aussenMat);
boxVorneRechts.position.set(1, 0.29, 1.075);
sc.add(boxVorneRechts);
//Wände
const wandFrontLGeom = new THREE.PlaneGeometry(1, 0.615);
const wandFrontL = new THREE.Mesh(wandFrontLGeom, brickMat);
wandFrontL.position.set(-0.95, 0.29, 0.699);
sc.add(wandFrontL);
const glassFrontLGeom = new THREE.PlaneGeometry(0.1, 0.615);
const glassFrontL = new THREE.Mesh(glassFrontLGeom, fensterMat);
glassFrontL.position.set(-0.4, 0.29, 0.699);
sc.add(glassFrontL);
const glassFrontTopGeom = new THREE.PlaneGeometry(0.4, 0.2);
const glassFrontTop = new THREE.Mesh(glassFrontTopGeom, fensterMat);
glassFrontTop.position.set(-0.15, 0.5, 0.699);
sc.add(glassFrontTop);
const glassFrontRGeom = new THREE.PlaneGeometry(0.1, 0.615);
const glassFrontR = new THREE.Mesh(glassFrontRGeom, fensterMat);
glassFrontR.position.set(0.1, 0.29, 0.699);
sc.add(glassFrontR);
const wandFrontRGeom = new THREE.PlaneGeometry(1.3, 0.615);
const wandFrontR = new THREE.Mesh(wandFrontRGeom, brickMat);
wandFrontR.position.set(0.8, 0.29, 0.699);
sc.add(wandFrontR);
//Mensa
const thekeAGeom = new THREE.BoxGeometry(0.1, 0.2, 2.2);
const thekeA = new THREE.Mesh(thekeAGeom, thekeMat);
thekeA.position.set(1, 0.08, -0.4);
sc.add(thekeA);
const thekeBGeom = new THREE.PlaneGeometry(0.2, 2.2);
const thekeB = new THREE.Mesh(thekeBGeom, schwarzMetallMat);
thekeB.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
thekeB.position.set(1, .181, -0.4);
sc.add(thekeB);
const thekeZentFGeom = new THREE.BoxGeometry(0.4, 0.2, 0.05);
const thekeZentF = new THREE.Mesh(thekeZentFGeom, thekeMat);
thekeZentF.position.set(0.45, 0.08, 0.2);
sc.add(thekeZentF);
const thekeZentB = thekeZentF.clone();
thekeZentB.position.z = -0.4;
sc.add(thekeZentB);
const thekeZentLGeom = new THREE.BoxGeometry(0.05, 0.2, 0.6);
const thekeZentL = new THREE.Mesh(thekeZentLGeom, thekeMat);
thekeZentL.position.set(0.275, 0.08, -0.1);
sc.add(thekeZentL);
const thekeZentR = thekeZentL.clone();
thekeZentR.position.x = 0.625;
sc.add(thekeZentR);
const thekeZentTopFGeom = new THREE.PlaneGeometry(0.45, 0.1);
const thekeZentTopF = new THREE.Mesh(thekeZentTopFGeom, schwarzMetallMat);
thekeZentTopF.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
thekeZentTopF.position.set(0.45, 0.181, 0.2);
sc.add(thekeZentTopF);
const thekeZentTopB = thekeZentTopF.clone();
thekeZentTopB.position.z = -0.4;
sc.add(thekeZentTopB);
const thekeZentTopLGeom = new THREE.PlaneGeometry(0.1, 0.65);
const thekeZentTopL = new THREE.Mesh(thekeZentTopLGeom, schwarzMetallMat);
thekeZentTopL.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
thekeZentTopL.position.set(0.275, 0.181, -0.1);
sc.add(thekeZentTopL);
const thekeZentTopR = thekeZentTopL.clone();
thekeZentTopR.position.x = 0.625;
sc.add(thekeZentTopR);
const kuecheTrennGeom = new THREE.BoxGeometry(0.4, 0.3, 0.05);
const kuecheTrenn = new THREE.Mesh(kuecheTrennGeom, thekeMat);
kuecheTrenn.position.set(0.75, 0.15, -0.85);
sc.add(kuecheTrenn);
const thekeVorGeom = new THREE.PlaneGeometry(0.4, 0.15);
const thekeVor = new THREE.Mesh(thekeVorGeom, schwarzMetallMat);
thekeVor.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
thekeVor.position.set(0.75, 0.181, -0.775);
sc.add(thekeVor);
const mensaTrennGeom = new THREE.BoxGeometry(0.02, 0.3, 0.4);
const mensaTrenn = new THREE.Mesh(mensaTrennGeom, thekeMat);
mensaTrenn.rotation.x = Math.PI / 2;               //Ansatz aus ChatGPT
mensaTrenn.position.set(0.35, 0.181, -1.299);
sc.add(mensaTrenn);


//Außenbereich direkt
const unterFrontGeomA = new THREE.BoxGeometry(0.1, 0.55, 0.25);
const unterFront = new THREE.Mesh(unterFrontGeomA, unterMat);
unterFront.position.set(-0.7, 0.258, 1.626);
const unterFrontGeomB = new THREE.BoxGeometry(1.55, 0.1, 0.25);
const unterFrontDach = new THREE.Mesh(unterFrontGeomB, unterMat);
unterFrontDach.position.set(0.125, 0.483, 1.626);
sc.add(unterFront);
sc.add(unterFrontDach);

const unterSeitGeom = new THREE.BoxGeometry(0.4, 0.55, 0.1);
const unterSeit = new THREE.Mesh(unterSeitGeom, unterMat);
unterSeit.position.set(1.701, 0.258, 0.85);
const unterSeiteGeomB = new THREE.BoxGeometry(0.4, 0.1, 0.9);
const unterSeitDach = new THREE.Mesh(unterSeiteGeomB, unterMat);
unterSeitDach.position.set(1.701, 0.483, 0.35);
sc.add(unterSeit);
sc.add(unterSeitDach);

const nebenGeom = new THREE.BoxGeometry(0.5, 0.5, 1.7);
const neben = new THREE.Mesh(nebenGeom, unterMat);
neben.position.set(1.751, 0.24, -1.5);
sc.add(neben);
const neben2Geom = new THREE.BoxGeometry(0.9, 0.5, 0.8);
const neben2 = new THREE.Mesh(neben2Geom, unterMat);
neben2.position.set(1.1, 0.24, -1.95);
sc.add(neben2);
const nebenTuerGeom = new THREE.PlaneGeometry(0.25, 0.4);
const nebenTuer = new THREE.Mesh(nebenTuerGeom, schwarzMattMat);
nebenTuer.position.set(1.75, 0.18, -0.649);
sc.add(nebenTuer);

//Außenbereich
const sitzkreisGeom = new THREE.TorusGeometry(0.48, 0.1, 3, 32);
const sitzkreis = new THREE.Mesh(sitzkreisGeom, aussenMat);
sitzkreis.rotation.x = -Math.PI / 2;        //Ansatz aus ChatGPT
sitzkreis.position.set(3, 0.07, -1.4);  
sc.add(sitzkreis);
const sitzkreisBeetGeom = new THREE.CircleGeometry(0.4);
const sitzkreisBeet = new THREE.Mesh(sitzkreisBeetGeom, erdeMat);
sitzkreisBeet.rotation.x = Math.PI / 2;        //Ansatz aus ChatGPT
sitzkreisBeet.position.set(3, 0.1, -1.4);
sc.add(sitzkreisBeet);
const sitztreppeUntenGeom = new THREE.BoxGeometry(0.9, 0.1, 2.7);
const sitztreppeUnten = new THREE.Mesh(sitztreppeUntenGeom, treppeMat);
sitztreppeUnten.position.set(5.35, 0.035, -0.3);
sc.add(sitztreppeUnten);
const sitztreppeObenGeom = new THREE.BoxGeometry(0.45, 0.1, 1.9);
const sitztreppeOben = new THREE.Mesh(sitztreppeObenGeom, treppeMat);
sitztreppeOben.position.set(5.58, 0.24, -0.3);
sc.add(sitztreppeOben);
const sitztreppeMitteGeom = new THREE.BoxGeometry(0.675, 0.1, 2.3);
const sitztreppeMitte = new THREE.Mesh(sitztreppeMitteGeom, treppeMat);
sitztreppeMitte.position.set(5.464, 0.14, -0.3);
sc.add(sitztreppeMitte);
const sitztreppeWandGeom = new THREE.BoxGeometry(0.1, 0.7, 3);
const sitztreppeWand = new THREE.Mesh(sitztreppeWandGeom, unterFrontMat);
sitztreppeWand.position.set(5.85, 0.33, -0.1);
sc.add(sitztreppeWand);
const infoWandGeom = new THREE.BoxGeometry(1.4, 0.5, 0.1);
const infoWand = new THREE.Mesh(infoWandGeom, unterFrontMat);
infoWand.position.set(3.6, 0.23, 2.4);
sc.add(infoWand);
const infoGeom = new THREE.BoxGeometry(0.6, 0.6, 0.9);
const info = new THREE.Mesh(infoGeom, infoMatArr);
info.position.set(4.6, 0.4, 2);
sc.add(info);
const infoUnterGeom = new THREE.BoxGeometry(0.6, 0.12, 0.9);
const infoUnter = new THREE.Mesh(infoUnterGeom, aussenMat);
infoUnter.position.set(4.6, 0.04, 2);
sc.add(infoUnter);
const infoVorObenGeom = new THREE.PlaneGeometry(1.2, 0.5);
const infoVorOben = new THREE.Mesh(infoVorObenGeom, metallMat);
infoVorOben.rotation.x = Math.PI / 2;       //Ansatz aus ChatGPT
infoVorOben.position.set(3.7, 0.1, 2.1)
sc.add(infoVorOben);
const infoVorUntenGeom = new THREE.PlaneGeometry(1.4, 0.7);
const infoVorUnten = new THREE.Mesh(infoVorUntenGeom, metallMat);
infoVorUnten.rotation.x = Math.PI / 2;      //Ansatz aus ChatGPT
infoVorUnten.position.set(3.6, 0.05, 2);
sc.add(infoVorUnten);
const infoVorStuetzeAGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.13);
const infoVorStuetzeA = new THREE.Mesh(infoVorStuetzeAGeom, metallMat);
infoVorStuetzeA.position.set(3.15, 0.045, 1.9);
sc.add(infoVorStuetzeA);
const infoVorStuetzeBGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.065);
const infoVorStuetzeB = new THREE.Mesh(infoVorStuetzeBGeom, metallMat);
infoVorStuetzeB.position.set(2.95, 0.02, 1.7);
sc.add(infoVorStuetzeB);
const infoRandGeom = new THREE.EdgesGeometry(infoGeom);           //Ansatz für andere Einfärbung des Randes aus ChatGPT
const infoRand = new THREE.LineSegments(infoRandGeom, metallMat);
infoRand.position.set(4.6, 0.4, 2);
sc.add(infoRand);
const raucherLGeom = new THREE.PlaneGeometry(0.35, 0.45);
const raucherL = new THREE.Mesh(raucherLGeom, fensterMat);
raucherL.rotation.y = Math.PI / 2;          //Ansatz aus ChatGPT
raucherL.position.set(-3.1, 0.21, 1.4);
sc.add(raucherL);
const raucherR = raucherL.clone();
raucherR.position.x = -2.5;
sc.add(raucherR);
const raucherBGeom = new THREE.PlaneGeometry(0.6, 0.45);
const raucherB = new THREE.Mesh(raucherBGeom, fensterMat);
raucherB.position.set(-2.8, 0.21, 1.225);
sc.add(raucherB);
const raucherLRandGeom = new THREE.EdgesGeometry(raucherLGeom);           //Ansatz für andere Einfärbung des Randes aus ChatGPT
const raucherLRand = new THREE.LineSegments(raucherLRandGeom, metallMat);
raucherLRand.rotation.y = Math.PI / 2;          //Ansatz aus ChatGPT
raucherLRand.position.set(-3.1, 0.21, 1.4);
sc.add(raucherLRand);
const raucherRRand = raucherLRand.clone();
raucherRRand.position.x = -2.5;
sc.add(raucherRRand);
const raucherDachGeom = new THREE.BoxGeometry(0.6, 0.05, 0.35);
const raucherDach = new THREE.Mesh(raucherDachGeom, holzMat);
raucherDach.position.set(-2.8, 0.45, 1.4);
sc.add(raucherDach);

//Loader
//Tisch
const loadgltf = new GLTFLoader();
let tischModel;                 //Ansatz zum Wiederverwenden des Modells aus ChatGPT erarbeitet
loadgltf.load(                  //Loadernutzung entsprechend API-Beispiel
    "simple_office_table/scene.gltf",
    function( gltf ){
        gltf.scene.castShadow = true;
        tischModel = gltf.scene;
        tischModel.rotation.y = -Math.PI / 2;       //Rotationsansatz aus ChatGPT
        console.log("Tisch geladen");

        const tisch1 = tischModel.clone();
        tisch1.scale.set(0.18, 0.2, 0.6); 
        tisch1.position.set(-0.85, -0.02, 0.4);
        sc.add(tisch1);
        const tisch2 = tischModel.clone();
        tisch2.scale.set(0.18, 0.2, 0.4); 
        tisch2.position.set(-0.45, -0.02, 0);
        sc.add(tisch2);
        const tisch3 = tischModel.clone();
        tisch3.scale.set(0.18, 0.2, 0.4); 
        tisch3.position.set(-0.45, -0.02, -0.4);
        sc.add(tisch3);
        const tisch4 = tischModel.clone();
        tisch4.scale.set(0.18, 0.2, 0.4); 
        tisch4.position.set(-0.45, -0.02, -0.8);
        sc.add(tisch4);
        const tisch5 = tischModel.clone();
        tisch5.scale.set(0.18, 0.2, 0.8); 
        tisch5.position.set(-0.65, -0.02, -1.2);
        sc.add(tisch5);
        const tisch6 = tischModel.clone();
        tisch6.scale.set(0.18, 0.2, 0.18); 
        tisch6.position.set(-1.26, -0.02, -0.8);
        sc.add(tisch6);
        const tisch7 = tischModel.clone();
        tisch7.scale.set(0.18, 0.2, 0.18); 
        tisch7.position.set(-1.26, -0.02, -0.4);
        sc.add(tisch7);
        const tisch8 = tischModel.clone();
        tisch8.scale.set(0.18, 0.2, 0.18); 
        tisch8.position.set(-1.26, -0.02, 0);
        sc.add(tisch8);
        for(let i = 0; i < 2; i++){
            const tischClone = tischModel.clone();
            tischClone.scale.set(0.4, 0.2, 0.1);
            tischClone.position.set(-1 + ( i * 0.7), -0.02, -1.8);
            sc.add(tischClone);
        }
    },
    function( xhr ){
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function( error ){
        console.log("Error bei GLTFLoader");
    }
);
//Busch
let buschModel;             //Ansatz zum Wiederverwenden des Modells aus ChatGPT erarbeitet
loadgltf.load(              //Loadernutzung entsprechend API-Beispiel
    "simple_tree/scene.gltf",
    function( gltf ){
        buschModel = gltf.scene;
        gltf.scene.scale.set(0.3, 0.2, 0.3); 
        gltf.scene.position.set(0.95, 0, -1.4);
        sc.add(gltf.scene);
        for(let i = 0; i < 4; i++){
            const buschClone = buschModel.clone();
            buschClone.scale.set(0.1, 0.05, 0.1);
            buschClone.position.set(-1.8 + (i * 0.6), -0.02, -2.7);
            sc.add(buschClone);
        }
        for(let j = 0; j < 3; j++){
            const buschCloneVor = buschModel.clone();
            buschCloneVor.scale.set(0.05, 0.02, 0.03);
            buschCloneVor.position.set(-1.7 + (j * 0.2), -0.02, 1.65);
            sc.add(buschCloneVor);
        }
    },
    function( xhr ){
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function( error ){
        console.log("Error bei GLTFLoader");
    }
);
//Bank
let bankModel;
loadgltf.load(              //Loadernutzung entsprechend API-Beispiel
    "bench/scene.gltf",
    function( gltf ){
        bankModel = gltf.scene;
        bankModel.rotation.y = Math.PI / 2;                    //Ansatz aus ChatGPT
        gltf.scene.scale.set(0.25, 0.2, 0.15); 
        gltf.scene.position.set(-2.8, 0.065, 1.35);
        sc.add(gltf.scene);
        for(let i = 0; i < 2; i++){
            const buschClone = bankModel.clone();
            buschClone.scale.set(0.3, 0.2, 0.3);
            buschClone.position.set(-0.7 + (i * 1.3), 0.065, 2.73);
            sc.add(buschClone);
        }
    },
    function( xhr ){
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function( error ){
        console.log("Error bei GLTFLoader");
    }
);

//Baum (mit OBJLoader), Nutzung MTLLoader mit Hilfe von ChatGPT, OBJLoader mit API
const loadmtl = new MTLLoader();
loadmtl.load("maple-tree/source/Maple Tree/Source/QuickMapleOptimized.mtl", 
    function (materials) {
        materials.preload();
        const loadobj = new OBJLoader();
        loadobj.setMaterials(materials);
        loadobj.load(
            "maple-tree/source/Maple Tree/Source/QuickMapleOptimized.obj",
            function (object) {
                object.scale.set(0.015, 0.015, 0.015); 
                object.position.set(-3, -0.02, 0.8);
                sc.add(object);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log("Error bei OBJLoader");
            }
        );
    }
);


//Licht
const myLight = new THREE.AmbientLight (0xffffff, 1);
myLight.position.set( 10, 10, 10 );
sc.add (myLight);
const pLight1 = new THREE.PointLight(0xffffe0, 0.3);
pLight1.position.set(0, 0.59, 1.2);
sc.add(pLight1);
const pLight2 = pLight1.clone();
pLight2.position.set(-0.6, 0.59, 0.2);
sc.add(pLight2)
const pLight3 = pLight2.clone();
pLight3.position.z = -0.7;
sc.add(pLight3);
const rLight = new THREE.RectAreaLight(0xffffe0, 1, 0.1, 1.5);
rLight.rotation.x = Math.PI / 2;                   //Ansatz aus ChatGPT
rLight.position.set(1.3, 0.59, -0.3);
sc.add(rLight);

//Animation
function animate() {
    requestAnimationFrame(animate);         //Ansatz aus ChatGPT
	rend.render( sc, cam );
}
