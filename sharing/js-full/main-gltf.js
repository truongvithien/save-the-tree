function loadObject(url,bin){
	return new Promise((resolve) => {
		new THREE.GLTFLoader().load(
			url,
			(gltf)=> {
				resolve(gltf);

			},
			(xhr) => {},
			(err) => {}
		)
	});
}

// function loadObject(url,bin){
// 	return new Promise((resolve) => {
// 		new THREE.GLTFLoader().load(
// 			url,
// 			(gltf)=> {
// 				resolve(gltf);
// 			},
// 			(xhr) => {},
// 			(err) => {}
// 		)
// 	});
// }

