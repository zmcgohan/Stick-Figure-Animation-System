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

// function to be called on an individual stick man -- makes up arrow = jump, down = slide, left = reverse animations, right = normal animations
var setMoveTesting = function(stickMan) {
	var lastTimeout = null,
		runAnim = runAnimation,
		flipAnim = flipAnimation,
		enterSlideAnim = enterSlideAnimation,
		exitSlideAnim = exitSlideAnimation,
		inSlide = false,
		inJump = false,
		isStanding = false;
	stickMan.addAnimation(runAnim);
	function clearRunReset() { if(lastTimeout !== null) clearTimeout(lastTimeout); }
	document.addEventListener('keydown', function(event) {
		if(event.keyCode == 38 && !inJump && !inSlide) {
			clearRunReset();
			stickMan.addAnimation(flipAnim);
			lastTimeout = setTimeout(function() {
				if(!isStanding) stickMan.addAnimation(runAnim);
				else stickMan.addAnimation(standAnimation);
				inJump = false;
			}, FLIP_TIME);
			inJump = true;
		} else if(event.keyCode == 37 && !inJump && !inSlide) {
			clearRunReset();
			runAnim = reverseAnimationX(runAnimation);
			stickMan.addAnimation(runAnim);
			flipAnim = reverseAnimationX(flipAnimation);
			enterSlideAnim = reverseAnimationX(enterSlideAnim);
			exitSlideAnim = reverseAnimationX(exitSlideAnim);
		} else if(event.keyCode == 39 && !inJump && !inSlide) {
			clearRunReset();
			runAnim = runAnimation;
			stickMan.addAnimation(runAnim);
			flipAnim = flipAnimation;
			enterSlideAnim = enterSlideAnimation;
			exitSlideAnim = exitSlideAnimation;
		} else if(event.keyCode == 40 && !inSlide && !inJump) {
			clearRunReset();
			stickMan.addAnimation(enterSlideAnim);
			inSlide = true;
		} else if(event.keyCode == 32 && !inSlide && !inJump) {
			clearRunReset();
			if(isStanding) {
				stickMan.addAnimation(runAnim);
				isStanding = false;
			} else {
				stickMan.addAnimation(standAnimation);
				isStanding = true;
			}
		}
	});
	document.addEventListener('keyup', function(event) {
		if(event.keyCode == 40 && inSlide) {
			clearRunReset();
			stickMan.addAnimation(exitSlideAnim);
			lastTimeout = setTimeout(function() {
				stickMan.addAnimation(runAnim);
			}, SLIDE_TRANSITION_TIME);
			inSlide = false;
		}
	});
};

setUp();

/**********************************
 * TESTING ONE RENDERED STICK MAN *
 *********************************/

function singleManLoop() {
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// update & draw stick man
	origStickMan.animate();
	origStickMan.render(ctx, [canvas.width/2,canvas.height/2.4]);

	requestAnimationFrame(singleManLoop);
}


var origStickMan = new StickMan(canvas.height * 0.7);

setMoveTesting(origStickMan);

/************************
 * TESTING MANY AT ONCE *
 ***********************/

var VAR_HEIGHT = 20;
var stickMen = [];
//renderMany();
//animateMany();
function renderMany() {
	for(var i = 0; i < VAR_HEIGHT; ++i) {
		for(var j = 0; j < VAR_HEIGHT; ++j) {
			/*
			var randSize = Math.random();
			stickMen[stickMen.length] = randSize > 0.5 ? new StickMan(randSize * canvas.height / (VAR_HEIGHT*2.3)) : new StickMan(canvas.height / (VAR_HEIGHT*2.3));
			*/
			stickMen[stickMen.length] = new StickMan(canvas.height / (VAR_HEIGHT*1.2));
			stickMen[stickMen.length-1].render(ctx, [i*canvas.width/VAR_HEIGHT+canvas.width/VAR_HEIGHT/2, j*canvas.height/VAR_HEIGHT+canvas.height/VAR_HEIGHT/2]);
			setMoveTesting(stickMen[stickMen.length-1]);
		}
	}
	requestAnimationFrame(manyLoop);
}
function manyLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < VAR_HEIGHT; ++i) {
		for(var j = 0; j < VAR_HEIGHT; ++j) {
			stickMen[i*VAR_HEIGHT + j].animate();
			stickMen[i*VAR_HEIGHT + j].render(ctx, [i*canvas.width/VAR_HEIGHT+canvas.width/VAR_HEIGHT/2, j*canvas.height/VAR_HEIGHT+canvas.height/VAR_HEIGHT/2]);
		}
	}
	requestAnimationFrame(manyLoop);
}

//renderMany();
//manyLoop();
singleManLoop();
