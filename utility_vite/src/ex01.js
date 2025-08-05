import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

// ----- 주제: AxesHelper, GridHelper

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.x = 1;
	camera.position.y = 3;
	camera.position.z = 0;
	scene.add(camera);

	//light
	const AmbientLight = new THREE.AmbientLight();
	scene.add(AmbientLight);
	const directionalLight = new THREE.DirectionalLight('white', 0.5);
	scene.add(THREE.AmbientLight);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);


	//AxesHelper
	const axesHelper = new THREE.AxesHelper(2);//인자값으로 축의 길이 조절 가능
	scene.add(axesHelper);

	//GridHelper
	const gridHelper = new THREE.GridHelper(4);//인자값으로 판의 크기 축소 가능
	scene.add(gridHelper);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 2;
	scene.add(mesh);


	//mesh 보게 하기
	camera.lookAt(mesh.position);
	
	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		mesh.rotation.y = time;

		renderer.render(scene, camera);
		window.requestAnimationFrame(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
