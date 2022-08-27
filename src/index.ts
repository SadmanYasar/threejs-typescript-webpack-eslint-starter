import './styles/style.css';

import {
    AxesHelper,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    Vector2,
    WebGLRenderer,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';

const mouse = new Vector2();
const target = new Vector2();
const windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
const contendor = document.body;

// scene
const scene = new Scene();

// camera controls
const onMouseMove = (event: { clientX: number; clientY: number; }) => {
    mouse.x = (event.clientX - windowHalf.x);
    mouse.y = (event.clientY - windowHalf.x);
};
document.addEventListener('mousemove', onMouseMove, false);

//axeshelper
const axesHelper = new AxesHelper(1000);
scene.add(axesHelper);

// responsiveness
const onWindowResize = () => {
    camera.aspect = contendor.clientWidth / contendor.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(contendor.clientWidth, contendor.clientHeight);
};
window.addEventListener('resize', onWindowResize, false);

// stats
const stats = Stats();
document.body.appendChild(stats.dom);

// camera
const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.8, 1000);

// renderer
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});

const cube = new Mesh(geometry, material);
scene.add(cube);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

// creates a canvas on container div
contendor.appendChild(renderer.domElement);

/*
====
GUI
====
*/
const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.open();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', 0, 100);
cameraFolder.add(camera.position, 'y', 0, 100);
cameraFolder.add(camera.position, 'z', 0, 100);
cameraFolder.open();

const animate = () => {
    target.x = (1 - mouse.x) * 0.001;
    target.y = (1 - mouse.y) * 0.001;

    controls.update();
    renderer.render(scene, camera);

    stats.update();

    window.requestAnimationFrame(animate);
};

animate();