var scene = new THREE.Scene;
var camera;
var mixer;
var clock;
var time;

/*
	Check everything is ok
*/
var ready = false;
var renderer;
var controls;
var hemisphereLight, ambientLight, pointLight, shadowLight;
var seaShader, leaf0Shader, leaf1Shader, leaf2Shader, leaf2BShader;
var mouse = new THREE.Vector2(), INTERSECTED;
var cameraMoves = {x:0,y:0,z:-0.1,move:true,speed:0.2};


var wheel_direction = 0;
var wheel_score = 0;

var Window = {
	width: window.innerWidth,
	height: window.innerHeight,
	ratio: window.innerWidth/ window.innerHeight,
}

var MousePos = {
	x: 0,
	y: 0
}


/*
	control_mode:
	- map
	- orbit
	- ...

*/
var control_mode = 'map'
