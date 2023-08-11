var 
	atmosphere, 
	sphere, 
	land, 
	sea, 
	grass, 
	tree0, 
	tree1, 
	tree2, 
	cloud, 
	sun, 
	moon;

$(function(){
	createScene('#world', scene, Window);

	// atmosphere = createAtmosphere(scene);
	sphere = createSphere(scene);
	land = createLand(scene);
	sea = createSea(scene);
	grass = createGrass(scene);
	tree0 = createTree0(scene);

	tree1 = createTree1(scene);
	tree1.position.y = 999;

	tree2 = createTree2(scene);
	tree2.position.y = 999;

	// tree2 = createTree0(scene);
	cloud = createCloud(scene);

	// camera.lookAt(sphere);
	camera.position.y += 50;
	camera.position.x -= 50;
	camera.rotation.y -= 10*Math.PI/180;

	ready = true; 

    function onMouseMove(e) {
	    camera.position.x += Math.max(Math.min((e.clientX - mouse.x) * 0.01, cameraMoves.speed), - cameraMoves.speed);
		camera.position.z += Math.max(Math.min((mouse.y - e.clientY) * 0.01, cameraMoves.speed), - cameraMoves.speed);

   		mouse.x = e.clientX;
    	mouse.y = e.clientY;
	};

	$('#content').mousewheel(function(event) {
		wheel_direction = event.deltaY;

		wheel_score += wheel_direction;

		if (wheel_score > 0) {
			wheel_score = 0;
		}

		// if (wheel_score < -10) {
		// 	wheel_score = 10;
		// }
	});

	createLights(scene);

	// sun = createSun(
	// 	scene, 
	// 	{
	// 		x: 0,
	// 		y: 400,
	// 		z: 0,
	// 	},
	// 	'#333'
	// );
	// moon = createMoon(
	// 	scene, 
	// 	{
	// 		x: 0,
	// 		y: -200,
	// 		z: 0,
	// 	},
	// 	'#78723B'
	// );

	clock = new THREE.Clock();
	animate();
	document.addEventListener('mousemove', onMouseMove, false);

	new WOW().init();
});



function animate() {
	requestAnimationFrame( animate );
	if ( ready ) {
		update();
		render();
		updateScript(wheel_direction, wheel_score);
	} else {
		console.log('loading...');
	}
}

function update(){
	var delta = clock.getDelta();
	time = Date.now() * 0.0005;
	// mixer.update( delta / 2.0 );

	updateRotation()
}

function render(time){
	// console.log(time);
	if(seaShader) 
   		seaShader.uniforms.time.value = time/1000;
	if(leaf0Shader)  
   		leaf0Shader.uniforms.time.value = time/1000;
	if(leaf1Shader) 
   		leaf1Shader.uniforms.time.value = time/1000;
	if(leaf2Shader) 
   		leaf2Shader.uniforms.time.value = time/1000;
	if(leaf2BShader) 
   		leaf2BShader.uniforms.time.value = time/1000;

	renderer.render(scene, camera);
	renderer.setAnimationLoop(render)
}

function updateRotation(){

	var randomWindX = (Math.floor(Math.random() * 10) + 5)/100;
	var randomWindZ = (Math.floor(Math.random() * 10) + 5)/100;

	// console.log(cloud.rotation);
	cloud.rotation.x += randomWindX*Math.PI/180;
	// cloud.rotation.z += randomWindZ*Math.PI/180;

	if (sun) {
		sun.rotation.x += .5*Math.PI/180;	
	}
}


function updateScript(wheel_direction, wheel_score) {

	var step = {
		scale: .005,
		rotation: .3*Math.PI/180,
	}

	var rotScr = wheel_score * 1.5;

	// console.log(rotScr)

	var scrollTop = $('body').scrollTop();
	console.log(scrollTop);

	function hide(obj) {
		if (obj.position.y <= 500) obj.position.y = 999;
	}
	function show(obj, initHeight) {
		if (obj.position.y > 500) obj.position.y = initHeight;
	}

	if (scrollTop >= 0 && scrollTop < 1450) {
		ambientLight.color.setHex(0xffffff);
		var pers0 = 1.5 * scrollTop/ 800 + 1;
		tree0.scale.set(pers0, pers0, pers0);
		show(tree0, 70);
		hide(tree1);
		hide(tree2);
	}

	if (scrollTop >= 1450 && scrollTop < 2750) {
		ambientLight.color.setHex(0xffff00);
		var pers1 = scrollTop/ 2300;
		tree1.scale.set(pers1, pers1, pers1)
		show(tree1, 65);
		hide(tree0);
		hide(tree2);
	}

	if (scrollTop >= 2750 && scrollTop < 3750) {
		ambientLight.color.setHex(0x00ff00);
		var pers2 = scrollTop/ 2300;
		tree2.scale.set(pers2, pers2, pers2) 
		show(tree2, 65);
		hide(tree0);
		hide(tree1);
	}


	// tree0.mesh.position.y = - pers0 * 40;

	// console.log(tree0.position.y);

	// console.log();

	land.mesh.rotation.y = rotScr*Math.PI/180;
	grass.mesh.rotation.y = rotScr*Math.PI/180;
	tree0.rotation.y = rotScr*Math.PI/180;
	tree1.rotation.y = rotScr*Math.PI/180;
	tree2.rotation.y = rotScr*Math.PI/180;



}