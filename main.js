'use strict';

var AR = 2; // aspect ratio

var canvas, ctx;

function setUp() {
	// set up canvas and add to body
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth * AR;
	canvas.height = window.innerHeight * AR;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';
	document.body.appendChild(canvas);
	// set 2D context
	ctx = canvas.getContext('2d');
}

// loop to test rendering -- to be replaced with a more sophisticated system if stick men used in a larger project
function renderLoop() {
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// update & draw stick man
	origStickMan.animate();
	origStickMan.render(ctx, [canvas.width/3,canvas.height/2.4]);
	origStickMan2.animate();
	origStickMan2.render(ctx, [canvas.width/1.5,canvas.height/2.4]);
	requestAnimationFrame(renderLoop);
}

// reverse anim horizontally
function reverseAnimationX(anim) {
	var i;
	anim = JSON.parse(JSON.stringify(anim));
	for(var key in anim) {
		switch(key) {
			case 'neck':
			case 'leftArm':
			case 'rightArm':
			case 'leftUpperLeg':
			case 'leftLowerLeg':
			case 'rightUpperLeg':
			case 'rightLowerLeg':
				for(i = 0; i < anim[key].length; ++i) {
					anim[key][i].endAngle = -anim[key][i].endAngle;
				}
				break;
			case 'torso':
				for(i = 0; i < anim[key].length; ++i) {
					anim[key][i].endAngle = Math.PI - anim[key][i].endAngle;
				}
				break;
		}	
	}
	return anim;
}

var RUN_TIME = 190;
var runAnimation = {
	'neck': [ 
		{ time: 0, endAngle: -Math.PI / 18 }
	],
	'torso': [
		{ time: 0, endAngle: Math.PI / 2.55 },
		{ time: RUN_TIME, endAngle: Math.PI / 2.65 },
		{ time: RUN_TIME, endAngle: Math.PI / 2.55 }
	],
	'rightUpperLeg': [
		{ time: 0, endAngle: Math.PI / 2.7 },
		{ time: RUN_TIME, endAngle: Math.PI / 14 },
		{ time: RUN_TIME, endAngle: -Math.PI / 10 }
	],
	'rightLowerLeg': [
		{ time: 0, endAngle: -Math.PI / 7 },
		{ time: RUN_TIME, endAngle: -Math.PI / 30 },
		{ time: RUN_TIME, endAngle: -Math.PI / 8 }
	],
	'leftUpperLeg': [
		{ time: 0, endAngle: -Math.PI / 10 },
		{ time: RUN_TIME, endAngle: Math.PI / 4 },
		{ time: RUN_TIME, endAngle: Math.PI / 2.7 }
	],
	'leftLowerLeg': [
		{ time: 0, endAngle: -Math.PI / 8 },
		{ time: RUN_TIME, endAngle: -Math.PI / 2 },
		{ time: RUN_TIME, endAngle: -Math.PI / 7 }
	],
	'leftArm': [
		{ time: 0, endAngle: 4*Math.PI / 5 },
		{ time: RUN_TIME*2, endAngle: 6*Math.PI / 5 }
	],
	'rightArm': [
		{ time: 0, endAngle: -4*Math.PI / 5 },
		{ time: RUN_TIME*2, endAngle: -6*Math.PI / 5 }
	]
};

var FLIP_TIME = 900;
var flipAnimation = {
	numRuns: 1,
	'neck': [
		//{ time: 0, endAngle: 0 },
		{ time: FLIP_TIME * 0.6, endAngle: -Math.PI / 3 },
		{ time: FLIP_TIME * 0.4, endAngle: 0 },
	],
	'torso': [
		//{ time: 0, endAngle: Math.PI / 2.3 },
		{ time: FLIP_TIME, endAngle: Math.PI / 2.55 - 2 * Math.PI }
	],
	'leftArm': [
		//{ time: 0, endAngle: Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.2, endAngle: Math.PI * 0.9 },
		{ time: FLIP_TIME * 0.3, endAngle: Math.PI * 1.1 },
		{ time: FLIP_TIME * 0.3, endAngle: Math.PI * 0.9 },
		{ time: FLIP_TIME * 0.2, endAngle: Math.PI / 1.3 }
	],
	'rightArm': [
		//{ time: 0, endAngle: -Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.2 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.3 }
	],
	'leftUpperLeg': [
		//{ time: 0, endAngle: Math.PI / 30 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 1.7 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 30 }
	],
	'leftLowerLeg': [
		//{ time: 0, endAngle: -Math.PI / 30 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.7 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 30 }
	],
	'rightUpperLeg': [
		//{ time: 0, endAngle: Math.PI / 8 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 8 }
	],
	'rightLowerLeg': [
		//{ time: 0, endAngle: -Math.PI / 12 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 12 }
	]
};

var standAnimation = {
	'neck': [ { time: 0, endAngle: 0 } ],
	'rightArm': [ { time: 0, endAngle: -4*Math.PI / 5 } ],
	'leftArm': [ { time: 0, endAngle: 4*Math.PI / 5 } ],
	'leftUpperLeg': [ { time: 0, endAngle: -Math.PI / 10 } ],
	'rightUpperLeg': [ { time: 0, endAngle: Math.PI / 10 } ],
	'leftLowerLeg': [ { time: 0, endAngle: 0 } ],
	'rightLowerLeg': [ { time: 0, endAngle: 0 } ],
};

setUp();

var origStickMan = new StickMan(canvas.height/5);
var origStickMan2 = new StickMan(canvas.height/5);

//origStickMan.addAnimation(standAnimation);
//origStickMan.addAnimation(runAnimation);
//origStickMan.addAnimation(reverseAnimationX(runAnimation));
origStickMan.addAnimation(runAnimation);
origStickMan2.addAnimation(reverseAnimationX(runAnimation));
setInterval(function() {
	origStickMan.addAnimation(flipAnimation);
	origStickMan2.addAnimation(reverseAnimationX(flipAnimation));
	setTimeout(function() {
		origStickMan.addAnimation(runAnimation);
		origStickMan2.addAnimation(reverseAnimationX(runAnimation));
	}, FLIP_TIME);
}, RUN_TIME * 10);

renderLoop();

/*********************
 * TESTING FUNCTIONS *
 ********************/

/*
var VAR_HEIGHT = 10;
var stickMen = [];
//renderMany();
//animateMany();
function renderMany() {
	for(var i = 0; i < VAR_HEIGHT; ++i) {
		for(var j = 0; j < VAR_HEIGHT; ++j) {
			var randSize = Math.random();
			stickMen[stickMen.length] = randSize > 0.5 ? new StickMan(randSize * canvas.height / (VAR_HEIGHT*2.3)) : new StickMan(canvas.height / (VAR_HEIGHT*2.3));
			stickMen[stickMen.length-1].render(ctx, [i*canvas.width/VAR_HEIGHT+canvas.width/VAR_HEIGHT/2, j*canvas.height/VAR_HEIGHT+canvas.height/VAR_HEIGHT/2]);
			var randAnimations = [ runAnimation, reverseAnimationX(runAnimation) ];
			stickMen[stickMen.length-1].addAnimation(randAnimations[Math.floor(Math.random() * randAnimations.length)]);
		}
	}
}
function animateMany() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < VAR_HEIGHT; ++i) {
		for(var j = 0; j < VAR_HEIGHT; ++j) {
			stickMen[i*VAR_HEIGHT + j].animate();
			stickMen[i*VAR_HEIGHT + j].render(ctx, [i*canvas.width/VAR_HEIGHT+canvas.width/VAR_HEIGHT/2, j*canvas.height/VAR_HEIGHT+canvas.height/VAR_HEIGHT/2]);
		}
	}
	requestAnimationFrame(animateMany);
}
*/
