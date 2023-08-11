function createAtmosphere(scene) {
	var Atmosphere = function(){
		this.mesh = new THREE.Object3D();

		var atmosphereGeo = new THREE.SphereGeometry(300, 40, 40);
		var atmosphereMat = new THREE.MeshLambertMaterial({
							color: '#001C27',
							transparent: true,
							opacity: 0.5,
							side: THREE.BackSide,
						});


		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})

		jitter(atmosphereGeo, 1)

		var atmosphere = new THREE.Mesh( atmosphereGeo , atmosphereMat );

		this.mesh.add(atmosphere);

	}

	atmosphere = new Atmosphere();
	scene.add(atmosphere.mesh);

	return atmosphere;
}


function createSphere(scene) {
	var Sphere = function(){
		this.mesh = new THREE.Object3D();

		var sphereGeo = new THREE.SphereGeometry(50, 40, 40);
		var sphereMat = new THREE.MeshLambertMaterial({
							color: '#213E5F',
							transparent: false,
							opacity: 1
						});

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})

		jitter(sphereGeo, 1)




		var sphere = new THREE.Mesh( sphereGeo , sphereMat );
		sphere.receiveShadow = true;
		sphere.castShadow = true;

		this.mesh.add(sphere);

	}

	sphere = new Sphere();
	scene.add(sphere.mesh);

	return sphere;
}

function createSea(scene) {
	var Sea = function(){
		this.mesh = new THREE.Object3D();

		var sphereGeo = new THREE.SphereGeometry(55, 40, 40);
		var sphereMat = new THREE.MeshLambertMaterial({
							color: '#1091FF',
							transparent: true,
							opacity: 0.8
						});

		sphereMat.onBeforeCompile = (shader) => {
		    shader.uniforms.time = { value: 0}
		    shader.vertexShader = `
		         uniform float time;
		         ` + shader.vertexShader
		    const token = `#include <begin_vertex>`
		    const customTransform = `
		        vec3 transformed = vec3(position);
		        transformed.x = position.x 
		             + sin(position.y*1.0 + time*5.0)*1.0;
		    `
		   shader.vertexShader =
		           shader.vertexShader.replace(token,customTransform)
		   seaShader = shader;
		 }

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})

		jitter(sphereGeo,1)




		var sphere = new THREE.Mesh( sphereGeo , sphereMat );

		this.mesh.add(sphere);

	}

	sea = new Sea();
	scene.add(sea.mesh);

	return sea;
}

function createLand(scene) {
	var Land = function(){
		this.mesh = new THREE.Object3D();


		var landGeo = new THREE.SphereGeometry(30, 20, 20);
		var landMat = new THREE.MeshLambertMaterial({
			color: '#FFDA75',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(landGeo, 1)

		var land = new THREE.Mesh( landGeo , landMat );

		land.receiveShadow = true;
		land.castShadow = true;
		land.position.y += 32;
		this.mesh.add(land);
	}

	land = new Land();
	scene.add(land.mesh);

	return land;

}

function createGrass(scene) {
	var Grass = function(){
		this.mesh = new THREE.Object3D();


		var grassGeo = new THREE.SphereGeometry(20, 5, 5);
		var grassMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(grassGeo, 1)

		var grass = new THREE.Mesh( grassGeo , grassMat );

		grass.position.y += 48;
		
		grass.receiveShadow = true;
		grass.castShadow = true;

		this.mesh.add(grass);
	}

	grass = new Grass();
	scene.add(grass.mesh);

	return grass;
}

function createCloud(scene) {
	var Cloud = function(){
		this.mesh = new THREE.Object3D();
		// this.mesh.position.y -= 120;


		var cloudGeo = new THREE.SphereGeometry(14, 12, 12);
		var cloudMat = new THREE.MeshLambertMaterial({
			color: '#fff',
			transparent: true,
			opacity: 0.4,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(cloudGeo, 1)

		var cloud = new THREE.Mesh( cloudGeo , cloudMat );

		cloud.position.y += 170;
		cloud.scale.set(1, .33, 1);
		
		this.mesh.add(cloud);
	}

	var MultiCloud = function(){
		this.mesh = new THREE.Object3D();

		var cloudyLevel = 30;
		for (var i = 0; i < cloudyLevel; i++) {
			var cloud = new Cloud();
			var random = {
				degX : Math.floor(Math.random() * 360),
				degZ : Math.floor(Math.random() * 360),
				scale: (Math.floor(Math.random() * 10) + 5)/10,
				rotation: {
					x: 0,
					y: 0,
					z: 0
				}
			}

			// console.log(random);

			cloud.mesh.rotation.x += random.degX*Math.PI/180;
			cloud.mesh.rotation.z += random.degZ*Math.PI/180;
			cloud.mesh.scale.set( random.scale, random.scale, random.scale );
			// cloud.mesh.position.y += 120;
			this.mesh.add(cloud.mesh);
		}
	}


	multiCloud = new MultiCloud();
	scene.add(multiCloud.mesh);

	return multiCloud.mesh;
}


function createTree0(scene) {
	var Tree0 = function(){
		this.mesh = new THREE.Object3D();


		var treeGeo = new THREE.CylinderGeometry(1, 8, 60, 5, 5);
		var treeMat = new THREE.MeshLambertMaterial({
			color: '#2F4215',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(treeGeo, 1)

		var tree = new THREE.Mesh( treeGeo , treeMat );

		tree.scale.set(.15, .2, .15);

		tree.receiveShadow = true;
		tree.castShadow = true;
		this.mesh.add(tree);
	}

	var Leaf0 = function(){
		this.mesh = new THREE.Object3D();


		var leafGeo = new THREE.SphereGeometry(5, 5, 5);
		var leafMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		leafMat.onBeforeCompile = (shader) => {
			shader.uniforms.time = { value: 0}
			shader.vertexShader = `
				uniform float time;
				` + shader.vertexShader
			const token = `#include <begin_vertex>`
			const customTransform = `
				vec3 transformed = vec3(position);
				transformed.x = position.x 
					+ sin(position.y*1.0 + time*5.0)*1.0;
			`
			shader.vertexShader =
					shader.vertexShader.replace(token,customTransform)
			leaf0Shader = shader;
		}

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(leafGeo, 1)

		var leaf = new THREE.Mesh( leafGeo , leafMat );

		leaf.scale.set(.3, .5, .3);

		leaf.position.y += 5;
		this.mesh.add(leaf);
	}

	var Branch0 = function(){
		this.mesh = new THREE.Object3D();


		var branchGeo = new THREE.CylinderGeometry(3, 3, 25, 3, 3);
		var branchMat = new THREE.MeshLambertMaterial({
			color: '#2F4215',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(branchGeo, 1)

		var branch = new THREE.Mesh( branchGeo , branchMat );

		branch.scale.set(.1, .1, .1);
		branch.position.y += 5;
		branch.position.z += 1;
		branch.rotation.x += 30*Math.PI/180;
		this.mesh.add(branch);

	}

	tree0 = new THREE.Object3D();

	tree0.add(new Tree0().mesh);
	tree0.add(new Leaf0().mesh);
	tree0.add(new Branch0().mesh);

	tree0.position.y = 70;

	scene.add(tree0);

	return tree0;
}

function createTree1(scene) {
	var Tree1 = function(){
		this.mesh = new THREE.Object3D();


		var treeGeo = new THREE.CylinderGeometry(1, 8, 60, 5, 5);
		var treeMat = new THREE.MeshLambertMaterial({
			color: '#4B1717',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(treeGeo, 1)

		var tree1 = new THREE.Mesh( treeGeo , treeMat );

		tree1.receiveShadow = true;
		tree1.castShadow = true;
		this.mesh.add(tree1);
	}

	var Leaf1 = function(){
		this.mesh = new THREE.Object3D();


		var leafGeo = new THREE.SphereGeometry(12, 5, 5);
		var leafMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		leafMat.onBeforeCompile = (shader) => {
			shader.uniforms.time = { value: 0}
			shader.vertexShader = `
				uniform float time;
				` + shader.vertexShader
			const token = `#include <begin_vertex>`
			const customTransform = `
				vec3 transformed = vec3(position);
				transformed.x = position.x 
					+ sin(position.y*1.0 + time*5.0)*1.0;
			`
			shader.vertexShader =
					shader.vertexShader.replace(token,customTransform);
			leaf1Shader = shader;
		}

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(leafGeo, 1)

		var leaf1 = new THREE.Mesh( leafGeo , leafMat );

		leaf1.position.y += 35;
		this.mesh.add(leaf1);
	}

	var Branch1 = function(){
		this.mesh = new THREE.Object3D();


		var branchGeo = new THREE.CylinderGeometry(3, 3, 45, 3, 3);
		var branchMat = new THREE.MeshLambertMaterial({
			color: '#4B1717',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(branchGeo, 1)

		var branch1 = new THREE.Mesh( branchGeo , branchMat );

		branch1.scale.set(.33, .33, .33);
		branch1.position.y += 10;
		branch1.position.z += 2;
		branch1.rotation.x += 30*Math.PI/180;
		this.mesh.add(branch1);

	}


	var tree1 = new THREE.Object3D();

	tree1.add(new Tree1().mesh);
	tree1.add(new Leaf1().mesh);
	tree1.add(new Branch1().mesh);

	tree1.position.y = 65;

	scene.add(tree1);

	return tree1;
}


function createTree2(scene) {
	var Tree2 = function(){
		this.mesh = new THREE.Object3D();


		var treeGeo = new THREE.CylinderGeometry(1, 8, 60, 5, 5);
		var treeMat = new THREE.MeshLambertMaterial({
			color: '#4B1717',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(treeGeo, 1)

		var tree2 = new THREE.Mesh( treeGeo , treeMat );

		tree2.receiveShadow = true;
		tree2.castShadow = true;
		this.mesh.add(tree2);
	}

	var Leaf2 = function(){
		this.mesh = new THREE.Object3D();


		var leafGeo = new THREE.SphereGeometry(12, 5, 5);
		var leafMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		leafMat.onBeforeCompile = (shader) => {
			shader.uniforms.time = { value: 0}
			shader.vertexShader = `
				uniform float time;
				` + shader.vertexShader
			const token = `#include <begin_vertex>`
			const customTransform = `
				vec3 transformed = vec3(position);
				transformed.x = position.x 
					+ sin(position.y*1.0 + time*5.0)*1.0;
			`
			shader.vertexShader =
					shader.vertexShader.replace(token,customTransform);
			leaf2Shader = shader;
		}

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(leafGeo, 1)

		var leaf2 = new THREE.Mesh( leafGeo , leafMat );
		leaf2.scale.set(1.2, 1, 1.2);

		leaf2.position.y += 35;
		this.mesh.add(leaf2);
	}

	var Leaf2b = function(){
		this.mesh = new THREE.Object3D();


		var leafGeo = new THREE.SphereGeometry(12, 5, 5);
		var leafMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		leafMat.onBeforeCompile = (shader) => {
			shader.uniforms.time = { value: 0}
			shader.vertexShader = `
				uniform float time;
				` + shader.vertexShader
			const token = `#include <begin_vertex>`
			const customTransform = `
				vec3 transformed = vec3(position);
				transformed.x = position.x 
					+ sin(position.y*1.0 + time*5.0)*1.0;
			`
			shader.vertexShader =
					shader.vertexShader.replace(token,customTransform);
			leaf2BShader = shader;
		}

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(leafGeo, 1)

		var leaf2b = new THREE.Mesh( leafGeo , leafMat );

		leaf2b.scale.set(.8, .8, .8);
		leaf2b.position.z += 10;


		leaf2b.position.y += 20;
		this.mesh.add(leaf2b);
	}

	var Branch2 = function(){
		this.mesh = new THREE.Object3D();


		var branchGeo = new THREE.CylinderGeometry(3, 3, 45, 3, 3);
		var branchMat = new THREE.MeshLambertMaterial({
			color: '#4B1717',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(branchGeo, 1)

		var branch2 = new THREE.Mesh( branchGeo , branchMat );

		branch2.scale.set(.33, .33, .33);
		branch2.position.y += 10;
		branch2.position.z += 2;
		branch2.rotation.x += 30*Math.PI/180;
		this.mesh.add(branch2);

	}


	var tree2 = new THREE.Object3D();

	tree2.add(new Tree2().mesh);
	tree2.add(new Leaf2().mesh);
	tree2.add(new Leaf2b().mesh);
	tree2.add(new Branch2().mesh);

	tree2.position.y = 65;

	scene.add(tree2);

	return tree2;
}


function createTree3(scene) {
	var Tree3 = function(){
		this.mesh = new THREE.Object3D();


		var treeGeo = new THREE.CylinderGeometry(1, 8, 60, 5, 5);
		var treeMat = new THREE.MeshLambertMaterial({
			color: '#4B1717',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(treeGeo, 1)

		var tree3 = new THREE.Mesh( treeGeo , treeMat );

		tree3.receiveShadow = true;
		tree3.castShadow = true;
		this.mesh.add(tree3);
	}

	var Leaf3 = function(){
		this.mesh = new THREE.Object3D();


		var leafGeo = new THREE.SphereGeometry(12, 5, 5);
		var leafMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		leafMat.onBeforeCompile = (shader) => {
			shader.uniforms.time = { value: 0}
			shader.vertexShader = `
				uniform float time;
				` + shader.vertexShader
			const token = `#include <begin_vertex>`
			const customTransform = `
				vec3 transformed = vec3(position);
				transformed.x = position.x 
					+ sin(position.y*1.0 + time*5.0)*1.0;
			`
			shader.vertexShader =
					shader.vertexShader.replace(token,customTransform);
			leaf3Shader = shader;
		}

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(leafGeo, 1)

		var leaf3 = new THREE.Mesh( leafGeo , leafMat );
		leaf3.scale.set(1.2, 1, 1.2);

		leaf3.position.y += 35;
		this.mesh.add(leaf3);
	}

	var Leaf3b = function(){
		this.mesh = new THREE.Object3D();


		var leafGeo = new THREE.SphereGeometry(12, 5, 5);
		var leafMat = new THREE.MeshLambertMaterial({
			color: '#4E9F13',
			transparent: false,
			opacity: 1,
		})

		leafMat.onBeforeCompile = (shader) => {
			shader.uniforms.time = { value: 0}
			shader.vertexShader = `
				uniform float time;
				` + shader.vertexShader
			const token = `#include <begin_vertex>`
			const customTransform = `
				vec3 transformed = vec3(position);
				transformed.x = position.x 
					+ sin(position.y*1.0 + time*5.0)*1.0;
			`
			shader.vertexShader =
					shader.vertexShader.replace(token,customTransform);
			leaf2BShader = shader;
		}

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(leafGeo, 1)

		var leaf3b = new THREE.Mesh( leafGeo , leafMat );

		leaf3b.scale.set(.8, .8, .8);
		leaf3b.position.z += 10;


		leaf3b.position.y += 20;
		this.mesh.add(leaf3b);
	}

	var Branch3 = function(){
		this.mesh = new THREE.Object3D();


		var branchGeo = new THREE.CylinderGeometry(3, 3, 45, 3, 3);
		var branchMat = new THREE.MeshLambertMaterial({
			color: '#4B1717',
			transparent: false,
			opacity: 1,
		})

		//remap value from the range of [smin,smax] to [emin,emax]
		const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin

		//randomly displace the x,y,z coords by the `per` value
		const jitter = (geo,per) => geo.vertices.forEach(v => {
		    v.x += map(Math.random(),0,1,-per,per)
		    v.y += map(Math.random(),0,1,-per,per)
		    v.z += map(Math.random(),0,1,-per,per)
		})
 
		jitter(branchGeo, 1)

		var branch3 = new THREE.Mesh( branchGeo , branchMat );

		branch3.scale.set(.33, .33, .33);
		branch3.position.y += 10;
		branch3.position.z += 2;
		branch3.rotation.x += 30*Math.PI/180;
		this.mesh.add(branch3);

	}


	var tree3 = new THREE.Object3D();

	tree3.add(new Tree3().mesh);
	tree3.add(new Leaf3().mesh);
	tree3.add(new Leaf3b().mesh);
	tree3.add(new Branch3().mesh);

	tree3.position.y = 65;

	scene.add(tree3);

	return tree3;
}