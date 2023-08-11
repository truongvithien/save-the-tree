function getCamCurrent(){
    var camCurrent = {
		position: {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z
		},
		rotation: {
			x: camera.rotation.x,
			y: camera.rotation.y,
			z: camera.rotation.z
		}
	}
	return camCurrent;
}

function triggerAnimate(obj){
	console.log('a');
	var animateClass = $(obj).data('animate');
	$(obj).addClass(animateClass)
		.one('animationend', () => {
			$(obj).removeClass(animateClass);
		})
}

function exportGLTF() {

	var options = {
		trs: false,
		onlyVisible: true,
		truncateDrawRange: true,
		binary: false,
		forceIndices: false,
		forcePowerOfTwoTextures: false
	};

	var exporter = new THREE.GLTFExporter();
	var link = $("#link");

	exporter.parse( scene, function ( result ) {
		console.log(result);

		if ( result instanceof ArrayBuffer ) {
			saveArrayBuffer( result, 'scene.glb' );
		} else {
			var output = JSON.stringify( result, null, 2 );
			console.log( output );
			saveString( output, 'scene.gltf' );
		}
	}, options );

	function save( blob, filename ) {
		link.href = URL.createObjectURL( blob );
		link.download = filename;
		link.click();
		// URL.revokeObjectURL( url ); breaks Firefox...
	}
	function saveArrayBuffer( buffer, filename ) {
		save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
	}	

}

