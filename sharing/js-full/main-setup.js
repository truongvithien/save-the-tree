function createScene(container, scene, Window){
	scene.fog = new THREE.Fog('#000', 200, 550);

	// Camera

	var aspectRatio = Window.ratio;
	var fieldOfView = 60;
	var nearPlane = 1;
	var farPlane = 1000;

	camera 	 = new THREE.PerspectiveCamera( 
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);

	// Set default camera position

	camera.position.set(100, 100, 0);

	// Render

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});
	// renderer.setPixelRatio( window.devicePixelRatio );
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;

	renderer.setSize(Window.width, Window.height);

	var container = $(container);
	container.append(renderer.domElement);

	// Control

	switch (control_mode) {
		case 'orbit':
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			break;
		case 'map':
			controls = new THREE.MapControls( camera, renderer.domElement );
			controls.enableDamping = true; 
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			break;
	}

	// Re-setup if resize window

	window.addEventListener('resize', function(){
		var HEIGHT = window.innerHeight;
		var WIDTH = window.innerWidth;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	}, false);

}

function createAxes(scene){
	var axesHelper = new THREE.AxesHelper( 1000 );
	scene.add( axesHelper );
}

function createLights(scene, color = '#ffffff'){
	// color light
	hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.1); 
	ambientLight = new THREE.AmbientLight(color, 0.4);

	shadowLight = new THREE.DirectionalLight(color, .8);

	shadowLight.position.set(150, 150, 150);

	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	
	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);  
	scene.add(ambientLight);
	scene.add(shadowLight);
}


function createSun(scene, position, color = 0xffffff){
	var Sun = function(){
		this.mesh = new THREE.Object3D();

		var bulbGeometry = new THREE.SphereBufferGeometry( 1, 1, 1 );
		var bulbLight = new THREE.PointLight( color, 1, 0, 1 );
		bulbLight.shadow.bias = 0;
		bulbLight.shadow.mapSize.width = Window.width; // default is 512
		bulbLight.shadow.mapSize.height = Window.height; // default is 512

		var bulbMat = new THREE.MeshStandardMaterial( {
			emissive: 0xffffee,
			emissiveIntensity: 1,
			color: 0x000000
		} );

		bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		// bulbLight.position.y += 200;
		bulbLight.position.set( position.x, position.y, position.z );
		bulbLight.castShadow = true;

		this.mesh.add(bulbLight);
	}

	sun = new Sun();
	scene.add(sun.mesh);

	return sun.mesh;
}


function createMoon(scene, position, color = 0xffffff){
	var Moon = function(){
		this.mesh = new THREE.Object3D();

		var bulbGeometry = new THREE.SphereBufferGeometry( 1, 1, 1 );
		var bulbLight = new THREE.PointLight( color, 1, 0, 1 );
		bulbLight.shadow.bias = 0;
		bulbLight.shadow.mapSize.width = 0; // default is 512
		bulbLight.shadow.mapSize.height = 0; // default is 512

		var bulbMat = new THREE.MeshStandardMaterial( {
			emissive: 0xffffee,
			emissiveIntensity: 1,
			color: 0x000000
		} );

		bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		// bulbLight.position.y += 200;
		bulbLight.position.set( position.x, position.y, position.z );
		bulbLight.castShadow = true;

		this.mesh.add(bulbLight);
	}

	moon = new Moon();
	scene.add(moon.mesh);

	return moon.mesh;
}

