
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

function init(){
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game').appendChild(renderer.domElement);
//document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, -30);
orbit.update();

const loader = new THREE.TextureLoader()
//Real world

const groundGeo = new THREE.PlaneGeometry(500, 500);
const groundtexture = loader.load('ground2.png');
const groundMat = new THREE.MeshBasicMaterial({ 
	map:groundtexture,
	side: THREE.DoubleSide,
	//wireframe: true 
 });
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

//walls
const wallGeo = new THREE.BoxGeometry(500, 10,1);
const walltexture = loader.load('bl.jpeg');
const wallMat = 
/*[
  new THREE.MeshBasicMaterial({ map: loader.load('wa.jpeg') }), //right side
  new THREE.MeshBasicMaterial({ map: loader.load('wa.jpeg')}), //left side
  new THREE.MeshBasicMaterial({ map: loader.load('wa.jpeg')}), //top side
  new THREE.MeshBasicMaterial({ map: loader.load('wa.jpeg')}), //bottom side
  new THREE.MeshBasicMaterial({ map: loader.load('wa.jpeg')}), //front side
  new THREE.MeshBasicMaterial({ map: loader.load('wa.jpeg')}), //back side
  */
  new THREE.MeshBasicMaterial({ 
    map:walltexture,
    side: THREE.DoubleSide,
    //wireframe: true
  });
   
//];
const wallaMesh = new THREE.Mesh(wallGeo, wallMat);
scene.add(wallaMesh);

const wallbMesh = new THREE.Mesh(wallGeo, wallMat);
scene.add(wallbMesh);

const wallcMesh = new THREE.Mesh(wallGeo, wallMat);
scene.add(wallcMesh);

const walldMesh = new THREE.Mesh(wallGeo, wallMat);
scene.add(walldMesh);


//car
const boxGeometry = new THREE.BoxGeometry(15, 3, 8);
const boxMaterial = new THREE.MeshBasicMaterial({color:0xff0ff0});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

const upperGeometry = new THREE.BoxGeometry(15,0.5,4);
const upperMaterial = new THREE.MeshBasicMaterial({color:0x800080});
const upper = new THREE.Mesh(upperGeometry,upperMaterial);
//boxMesh.add(upper);
//upper.position.y=0.712;

const mainbodyGeometry = new THREE.BoxGeometry(9,4,7.6);
const mainbodyMaterial = new THREE.MeshBasicMaterial({color:0x0ff000});
const mainbody = new THREE.Mesh(mainbodyGeometry,mainbodyMaterial);
boxMesh.add(mainbody);
mainbody.position.y=3.5;
mainbody.position.x=3;

const glasstexture = loader.load('glass.jpg');
const frontGeometry = new THREE.PlaneGeometry(6.8,3.5);
const frontMaterial = new THREE.MeshBasicMaterial({color:0x000ff0, side:THREE.DoubleSide});
const front = new THREE.Mesh(frontGeometry,frontMaterial);
boxMesh.add(front);
front.position.y=3.5;
front.position.x=-1.52;
front.rotation.y=Math.PI/2;

const backGeometry = new THREE.PlaneGeometry(6,2);
const backMaterial = new THREE.MeshBasicMaterial({color:0x000ff0, side:THREE.DoubleSide});
const back = new THREE.Mesh(backGeometry,backMaterial);
boxMesh.add(back);
back.position.y=3.5;
back.position.x=7.52;
back.rotation.y=Math.PI/2;

const side1Geometry = new THREE.PlaneGeometry(1.7,3);
const side1Material = new THREE.MeshBasicMaterial({color:0x000ff0, side:THREE.DoubleSide});
const side1 = new THREE.Mesh(side1Geometry,side1Material);
boxMesh.add(side1);
side1.position.y=2;
side1.position.z=1.8;
side1.position.x=0.5;
side1.rotation.z=Math.PI/2;

const side2Geometry = new THREE.PlaneGeometry(1.7,3);
const side2Material = new THREE.MeshBasicMaterial({color:0x000ff0, side:THREE.DoubleSide});
const side2 = new THREE.Mesh(side2Geometry,side2Material);
boxMesh.add(side2);
side2.position.y=2;
side2.position.z=-1.8;
side2.position.x=0.5;
side2.rotation.z=Math.PI/2;

//tyres
const tyretexture = loader.load('tyre2.jpg');
const sphereGeometry1 = new THREE.SphereGeometry(2);
const sphereMaterial1 = new THREE.MeshBasicMaterial({map:tyretexture,side: THREE.DoubleSide});
const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
scene.add(sphereMesh1);

const sphereGeometry2 = new THREE.SphereGeometry(2);
const sphereMaterial2 = new THREE.MeshBasicMaterial({map:tyretexture,side: THREE.DoubleSide});
const sphereMesh2 = new THREE.Mesh(sphereGeometry2,sphereMaterial2);
scene.add(sphereMesh2); 

const sphereGeometry3 = new THREE.SphereGeometry(2);
const sphereMaterial3 = new THREE.MeshBasicMaterial( {map:tyretexture,side: THREE.DoubleSide} );
const sphereMesh3 = new THREE.Mesh(sphereGeometry3,sphereMaterial3);
scene.add(sphereMesh3); 

const sphereGeometry4 = new THREE.SphereGeometry(2);
const sphereMaterial4 = new THREE.MeshBasicMaterial({map:tyretexture,side: THREE.DoubleSide});
const sphereMesh4 = new THREE.Mesh(sphereGeometry4,sphereMaterial4);
scene.add(sphereMesh4); 

//Obstacles

const obsGeometry = new THREE.BoxGeometry(10,15,10);
const obs1Material =[
                     new THREE.MeshBasicMaterial({ map: loader.load('luffy.jpeg') }), //right side
                     new THREE.MeshBasicMaterial({ map: loader.load('luffy.jpeg')}), //left side
                     new THREE.MeshBasicMaterial({ map: loader.load('luffy.jpeg')}), //top side
                     new THREE.MeshBasicMaterial({ map: loader.load('luffy.jpeg')}), //bottom side
                     new THREE.MeshBasicMaterial({ map: loader.load('luffy.jpeg')}), //front side
                     new THREE.MeshBasicMaterial({ map: loader.load('luffy.jpeg')}), //back side
];
const obs1 = new THREE.Mesh(obsGeometry,obs1Material);
scene.add(obs1);

const obs2Material =[
                     new THREE.MeshBasicMaterial({ map: loader.load('chopper.jpeg') }), //right side
                     new THREE.MeshBasicMaterial({ map: loader.load('chopper.jpeg')}), //left side
                     new THREE.MeshBasicMaterial({ map: loader.load('chopper.jpeg')}), //top side
                     new THREE.MeshBasicMaterial({ map: loader.load('chopper.jpeg')}), //bottom side
                     new THREE.MeshBasicMaterial({ map: loader.load('chopper.jpeg')}), //front side
                     new THREE.MeshBasicMaterial({ map: loader.load('chopper.jpeg')}), //back side
];
const obs2 = new THREE.Mesh(obsGeometry,obs2Material);
scene.add(obs2);

const obs3 = new THREE.Mesh(obsGeometry,obs2Material);
scene.add(obs3);

const obs4 = new THREE.Mesh(obsGeometry,obs2Material);
scene.add(obs4);

const obs5 = new THREE.Mesh(obsGeometry,obs1Material);
scene.add(obs5);

const obs6 = new THREE.Mesh(obsGeometry,obs2Material);
scene.add(obs6);

const obs7 = new THREE.Mesh(obsGeometry,obs2Material);
scene.add(obs7);

const obs8 = new THREE.Mesh(obsGeometry,obs1Material);
scene.add(obs8);

const obs9 = new THREE.Mesh(obsGeometry,obs1Material);
scene.add(obs9);

const obs10 = new THREE.Mesh(obsGeometry,obs1Material);
scene.add(obs10);




const posterGeo = new THREE.PlaneGeometry(150, 75);
const postertexture = loader.load('all.png');
const posterMat = new THREE.MeshBasicMaterial({ 
	map:postertexture,
	side: THREE.DoubleSide,
 });
const posterMesh = new THREE.Mesh(posterGeo, posterMat);
scene.add(posterMesh);

posterMesh.position.z=250;
posterMesh.position.y=50;

const poster2Geo = new THREE.PlaneGeometry(150, 75);
const poster2texture = loader.load('saitama.png');
const poster2Mat = new THREE.MeshBasicMaterial({ 
	map:poster2texture,
	side: THREE.DoubleSide,
 });
const poster2Mesh = new THREE.Mesh(poster2Geo, poster2Mat);
scene.add(poster2Mesh);

poster2Mesh.position.z=-250;
poster2Mesh.position.y=50;

const poster3Geo = new THREE.PlaneGeometry(150, 75);
const poster3texture = loader.load('eren.jpg');
const poster3Mat = new THREE.MeshBasicMaterial({ 
	map:poster3texture,
	side: THREE.DoubleSide,
 });
const poster3Mesh = new THREE.Mesh(poster3Geo, poster3Mat);
scene.add(poster3Mesh);

poster3Mesh.position.x=-250;
poster3Mesh.position.y=50;
poster3Mesh.rotation.y=Math.PI/2;

const poster4Geo = new THREE.PlaneGeometry(150, 75);
const poster4texture = loader.load('itachi.jpg');
const poster4Mat = new THREE.MeshBasicMaterial({ 
	map:poster4texture,
	side: THREE.DoubleSide,
 });
const poster4Mesh = new THREE.Mesh(poster4Geo, poster4Mat);
scene.add(poster4Mesh);

poster4Mesh.position.x=250;
poster4Mesh.position.y=50;
poster4Mesh.rotation.y=Math.PI/2;
/*
const rampGeometry = new THREE.PlaneGeometry(20,30);
const rampMaterial = new THREE.MeshBasicMaterial({color:0x00f0f0, side:THREE.DoubleSide});
const ramp = new THREE.Mesh(rampGeometry,rampMaterial);
scene.add(ramp);
*/






//CANNON WORLD BULIDING

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0)
});
const timeStep = 1 / 60;


const groundPhysMat = new CANNON.Material();

const groundBody = new CANNON.Body({
    //shape: new CANNON.Plane(),
    //mass: 10
    shape: new CANNON.Box(new CANNON.Vec3(250,250,0.1)),
    type: CANNON.Body.STATIC,
    material: groundPhysMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI/2, 0, 0);


const wallPhysMat = new CANNON.Material();

const wallaBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(250, 5, 0.5)),
  type: CANNON.Body.STATIC,
  material: wallPhysMat,
  position:new CANNON.Vec3(250, 5, 0),
});
world.addBody(wallaBody);
wallaBody.quaternion.setFromEuler(0, -Math.PI/2, 0);

const wallbBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(250, 5, 0.5)),
  type: CANNON.Body.STATIC,
  material: wallPhysMat,
  position:new CANNON.Vec3(-250, 5, 0),
});
world.addBody(wallbBody);
wallbBody.quaternion.setFromEuler(0, -Math.PI/2, 0);

const wallcBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(250, 5, 0.5)),
  type: CANNON.Body.STATIC,
  material: wallPhysMat,
  position:new CANNON.Vec3(0, 5, 250),
});
world.addBody(wallcBody);

const walldBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(250, 5, 0.5)),
  type: CANNON.Body.STATIC,
  material: wallPhysMat,
  position:new CANNON.Vec3(0, 5, -250),
});
world.addBody(walldBody);

//OBSTACLES

const obsPhysMat = new CANNON.Material();

const obs1Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(50,7.51, 50),
});
world.addBody(obs1Body);

const obs2Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(-50,7.51, 50),
});
world.addBody(obs2Body);

const obs3Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(-100,7.51, 100),
});
world.addBody(obs3Body);

const obs4Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(130,7.51, 100),
});
world.addBody(obs4Body);

const obs5Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(-150,7.51, 70),
});
world.addBody(obs5Body);

const obs6Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(120,7.51, -70),
});
world.addBody(obs6Body);

const obs7Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(-70,7.51, -100),
});
world.addBody(obs7Body);

const obs8Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(180,7.51, -150),
});
world.addBody(obs8Body);

const obs9Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(10,7.51, -100),
});
world.addBody(obs9Body);

const obs10Body = new CANNON.Body({
  
  shape: new CANNON.Box(new CANNON.Vec3(5,7.5,5 )),
  type: CANNON.Body.STATIC,
  material: obsPhysMat,
  position:new CANNON.Vec3(-150,7.51, -170),
});
world.addBody(obs10Body);



/*
const rampBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(10, 15, 0.1)),
  type: CANNON.Body.STATIC,
  position:new CANNON.Vec3(20, 4.9, 0),
});
world.addBody(rampBody);
rampBody.quaternion.setFromEuler(-Math.PI/2.5, 0, 0);
*/
//CAR

const boxPhysMat = new CANNON.Material();

const carBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Box(new CANNON.Vec3(7.5, 1.5, 4)),
    position: new CANNON.Vec3(0,3, 0),
    material: boxPhysMat
});
world.addBody(carBody);

const vehicle = new CANNON.RigidVehicle({
  chassisBody : carBody,
});

const mass = 0.2;
const axisWidth = 5.5;
const wheelShape = new CANNON.Sphere(2);
const wheelMaterial = new CANNON.Material('wheel');
const down = new CANNON.Vec3(0, -1, 0);


const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody1.addShape(wheelShape);
wheelBody1.angularDamping = 0.4;
vehicle.addWheel({
  body: wheelBody1,
  position: new CANNON.Vec3(-6, -1, -axisWidth /1.01),
  axis: new CANNON.Vec3(0, 0, 1),
  direction: down,
});
const wheelBody2 = new CANNON.Body({mass, material: wheelMaterial});
wheelBody2.addShape(wheelShape);
wheelBody2.angularDamping=0.4;
vehicle.addWheel({
  body:wheelBody2,
  position: new CANNON.Vec3(-6,-1,axisWidth/1.01),
  axis: new CANNON.Vec3(0,0,1),
  direction:down,
});

const wheelBody3 = new CANNON.Body({mass, material: wheelMaterial});
wheelBody3.addShape(wheelShape);
wheelBody3.angularDamping=0.4;
vehicle.addWheel({
  body:wheelBody3,
  position: new CANNON.Vec3(5.5,-1,-axisWidth/1.01),
  axis: new CANNON.Vec3(0,0,1),
  direction:down,
});

const wheelBody4 = new CANNON.Body({mass, material: wheelMaterial});
wheelBody4.addShape(wheelShape);
wheelBody4.angularDamping=0.4;
vehicle.addWheel({
  body:wheelBody4,
  position: new CANNON.Vec3(5.5,-1,axisWidth/1.01),
  axis: new CANNON.Vec3(0,0,1),
  direction:down,
});

vehicle.addToWorld(world);


//CONTROLS
var sound= new Audio("TUTU.mp3");
var sound2= new Audio("car.mp3");

document.addEventListener('keydown',(keychange) => {
      const maxSteer = Math.PI/8;
      const maxForce = 20;

      switch (keychange.key){
        case 'w' :
        case'ArrowUp': vehicle.setWheelForce(maxForce, 0);
                       vehicle.setWheelForce(maxForce, 1);
                       //sound2.play();
                       break;

        case 's' : 
        case 'ArrowDown': vehicle.setWheelForce(-maxForce/1.5,0);
                          vehicle.setWheelForce(-maxForce/1.5,1);
                          //sound.oncanplaythrough=function(){
                          sound.play();
                          sound.loop=true;
                          // }
                          break;


        case 'a' : 
        case 'ArrowLeft':vehicle.setSteeringValue(maxSteer, 0);
                          vehicle.setSteeringValue(maxSteer, 1);
                          break;

        case 'd' : 
        case 'ArrowRight':vehicle.setSteeringValue(-maxSteer, 0);
                          vehicle.setSteeringValue(-maxSteer, 1);
                          break;

        case 'x' : vehicle.setWheelForce(-0.001,0);
                   vehicle.setWheelForce(-0.001,0);
                    break;
      }
});

document.addEventListener('keyup',(keychange) => {

  switch (keychange.key){
    case 'w' : 
    case'ArrowUp':vehicle.setWheelForce(0, 0);
               vehicle.setWheelForce(0, 1);
               sound2.pause();
               break;

    case 's' :
      case'ArrowDown': vehicle.setWheelForce(0,0);
               vehicle.setWheelForce(0,1);
               sound.pause();
               //sound.currentTime=1;
               break;


    case 'a' : 
    case'ArrowLeft':vehicle.setSteeringValue(0, 0);
               vehicle.setSteeringValue(0, 1);
               break;

    case 'd' :
      case'ArrowRight': vehicle.setSteeringValue(0, 0);
               vehicle.setSteeringValue(0, 1);
               break;

  case 'c':
                boxMaterial.color = randomcolor();
                mainbodyMaterial.color = randomcolor();
                break;
  }
});

function randomcolor()
{
	const r = Math.random();
	const g = Math.random();
	const b = Math.random();
	return new THREE.Color(r,g,b);
}

let carSpeed = 0;
let previousPosition = new THREE.Vector3();
let currentVelocity = new THREE.Vector3();

function calculateCarSpeed() {
  currentVelocity.subVectors(boxMesh.position, previousPosition);

  carSpeed = (currentVelocity.length() * 3.6).toFixed(2);

  previousPosition.copy(boxMesh.position);
}

function updateSpeedometer() {
  const speedValue = document.getElementById('speed');
  speedValue.textContent = carSpeed + ' km/h';
}

camera.position.z=0;

camera.position.x=50;
//camera.lookAt(scene.position);
camera.position.y=30;

camera.rotation.y=Math.PI/2;
//camera.rotation.z=Math.PI/1.2;//only when using orbital



//cameraOffset = new THREE.Vector3(-53,25,-50);

function animate() {
  
  world.step(timeStep);
  
    calculateCarSpeed();
  
    updateSpeedometer();


   camera.lookAt(boxMesh.position);
  //camera.position.copy(boxMesh.position);
    

  groundMesh.position.copy(groundBody.position);
  groundMesh.quaternion.copy(groundBody.quaternion);
  
   boxMesh.position.copy(carBody.position);
    boxMesh.quaternion.copy(carBody.quaternion);
    
    sphereMesh1.position.copy(wheelBody1.position);
    sphereMesh1.quaternion.copy(wheelBody1.quaternion);

    sphereMesh2.position.copy(wheelBody2.position);
    sphereMesh2.quaternion.copy(wheelBody2.quaternion);

    sphereMesh3.position.copy(wheelBody3.position);
    sphereMesh3.quaternion.copy(wheelBody3.quaternion);

    sphereMesh4.position.copy(wheelBody4.position);
    sphereMesh4.quaternion.copy(wheelBody4.quaternion);

    wallaMesh.position.copy(wallaBody.position);
    wallaMesh.quaternion.copy(wallaBody.quaternion);

    wallbMesh.position.copy(wallbBody.position);
    wallbMesh.quaternion.copy(wallbBody.quaternion);

    wallcMesh.position.copy(wallcBody.position);
    wallcMesh.quaternion.copy(wallcBody.quaternion);

    walldMesh.position.copy(walldBody.position);
    walldMesh.quaternion.copy(walldBody.quaternion);

    obs1.position.copy(obs1Body.position);
    obs1.quaternion.copy(obs1Body.quaternion);

    obs2.position.copy(obs2Body.position);
    obs2.quaternion.copy(obs2Body.quaternion);

    obs3.position.copy(obs3Body.position);
    obs3.quaternion.copy(obs3Body.quaternion);

    obs4.position.copy(obs4Body.position);
    obs4.quaternion.copy(obs4Body.quaternion);

    obs5.position.copy(obs5Body.position);
    obs5.quaternion.copy(obs5Body.quaternion);

    obs6.position.copy(obs6Body.position);
    obs6.quaternion.copy(obs6Body.quaternion);

    obs7.position.copy(obs7Body.position);
    obs7.quaternion.copy(obs7Body.quaternion);

    obs8.position.copy(obs8Body.position);
    obs8.quaternion.copy(obs8Body.quaternion);

    obs9.position.copy(obs9Body.position);
    obs9.quaternion.copy(obs9Body.quaternion);

    obs10.position.copy(obs10Body.position);
    obs10.quaternion.copy(obs10Body.quaternion);

  


/*
    ramp.position.copy(rampBody.position);
    ramp.quaternion.copy(rampBody.quaternion);
    
*/

  

renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

const startPage = document.getElementById('start');
  startPage.style.display = 'none';

  const image = document.getElementById('image');
  image.style.display = 'none';






/*
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});*/
}

const initButton = document.getElementById('initb');
initButton.addEventListener('click', init);

const speedM = document.getElementById('speedometer');
speedM.style.display = 'block';
