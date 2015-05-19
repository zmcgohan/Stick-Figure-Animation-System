// Stick Man sizing constants
var LINE_WIDTH_RATIO = 0.028,
	HEAD_RADIUS_RATIO = .07,
	NECK_RATIO = .08,
	TORSO_RATIO = .40,
	UPPER_ARM_RATIO = .13,
	LOWER_ARM_RATIO = .12,
	UPPER_LEG_RATIO = .215,
	LOWER_LEG_RATIO = .235;

/*
var WIDTH = 6,
	UPPER_LEG_RATIO = 0.526,
	LOWER_LEG_RATIO = 0.588,
	HEAD_RATIO = 0.166,
	UPPER_ARM_RATIO = 0.352,
	LOWER_ARM_RATIO = 0.323,
	NECK_RATIO = 0.189;
*/

function StickMan(height) {
	this.height = height; // size of torso -- all other sizes relative to this

	this.body = {
		torso: {},
		neck: {},
		leftUpperArm: {},
		leftLowerArm: {},
		rightUpperArm: {},
		rightLowerArm: {},
		leftUpperLeg: {},
		leftLowerLeg: {},
		rightUpperLeg: {},
		rightLowerLeg: {},
	}

	this.bodyAngles = {
		torso: Math.PI / 2,
		neck: 0,
		leftUpperArm: Math.PI / 1.3,
		leftLowerArm: Math.PI - Math.PI / 1.3,
		rightUpperArm: -Math.PI / 1.3,
		rightLowerArm: -Math.PI + Math.PI / 1.3,
		leftUpperLeg: -Math.PI / 4,
		leftLowerLeg: Math.PI / 4,
		rightUpperLeg: Math.PI / 4,
		rightLowerLeg: -Math.PI / 4
	};

	// randomizes each body part's angle (within a certain range)
	this.randomizeAngles = function() {
		this.bodyAngles['torso'] = Math.PI / 3 + Math.random() * Math.PI / 3;
		this.bodyAngles['neck'] = Math.PI / 4 + Math.random() * -Math.PI / 2;
		this.bodyAngles['leftUpperArm'] = Math.PI / 1.3 - Math.random() * 2 * (Math.PI-Math.PI/1.3);
		this.bodyAngles['rightUpperArm'] = -Math.PI / 1.3 + Math.random() * 2 * (Math.PI-Math.PI/1.3);
		this.bodyAngles['leftUpperLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
		this.bodyAngles['leftLowerLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
		this.bodyAngles['rightUpperLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
		this.bodyAngles['rightLowerLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
	}

	// updates startX/Y of this.body.torso as well as endX/Y of every body part
	this.updateBodyPositions = function() {
		// torso coordinates
		this.body.torso.startX = Math.cos(this.bodyAngles['torso'])*this.height*TORSO_RATIO/2;
		this.body.torso.startY = -Math.sin(this.bodyAngles['torso'])*this.height*TORSO_RATIO/2;
		this.body.torso.endX = -Math.cos(this.bodyAngles['torso'])*this.height*TORSO_RATIO/2;
		this.body.torso.endY = Math.sin(this.bodyAngles['torso'])*this.height*TORSO_RATIO/2;
		// neck coordinates
		this.body.neck.endX = this.body.torso.startX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['neck'])*this.height*NECK_RATIO;
		this.body.neck.endY = this.body.torso.startY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['neck'])*this.height*NECK_RATIO;
		// upper arm coordinates
		this.body.leftUpperArm.endX = this.body.torso.startX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftUpperArm'])*this.height*UPPER_ARM_RATIO;
		this.body.leftUpperArm.endY = this.body.torso.startY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftUpperArm'])*this.height*UPPER_ARM_RATIO;
		this.body.rightUpperArm.endX = this.body.torso.startX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightUpperArm'])*this.height*UPPER_ARM_RATIO;
		this.body.rightUpperArm.endY = this.body.torso.startY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightUpperArm'])*this.height*UPPER_ARM_RATIO;
		// lower arm coordinates
		this.body.leftLowerArm.endX = this.body.leftUpperArm.endX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftUpperArm']+this.bodyAngles['leftLowerArm'])*this.height*LOWER_ARM_RATIO;
		this.body.leftLowerArm.endY = this.body.leftUpperArm.endY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftUpperArm']+this.bodyAngles['leftLowerArm'])*this.height*LOWER_ARM_RATIO;
		this.body.rightLowerArm.endX = this.body.rightUpperArm.endX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightUpperArm']+this.bodyAngles['rightLowerArm'])*this.height*LOWER_ARM_RATIO;
		this.body.rightLowerArm.endY = this.body.rightUpperArm.endY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightUpperArm']+this.bodyAngles['rightLowerArm'])*this.height*LOWER_ARM_RATIO;
		// upper leg coordinates
		this.body.leftUpperLeg.endX = this.body.torso.endX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg'])*this.height*UPPER_LEG_RATIO;
		this.body.leftUpperLeg.endY = this.body.torso.endY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg'])*this.height*UPPER_LEG_RATIO;
		this.body.rightUpperLeg.endX = this.body.torso.endX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg'])*this.height*UPPER_LEG_RATIO;
		this.body.rightUpperLeg.endY = this.body.torso.endY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg'])*this.height*UPPER_LEG_RATIO;
		// lower leg coordinates
		this.body.leftLowerLeg.endX = this.body.leftUpperLeg.endX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg']+this.bodyAngles['leftLowerLeg'])*this.height*LOWER_LEG_RATIO;
		this.body.leftLowerLeg.endY = this.body.leftUpperLeg.endY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg']+this.bodyAngles['leftLowerLeg'])*this.height*LOWER_LEG_RATIO;
		this.body.rightLowerLeg.endX = this.body.rightUpperLeg.endX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg']+this.bodyAngles['rightLowerLeg'])*this.height*LOWER_LEG_RATIO;
		this.body.rightLowerLeg.endY = this.body.rightUpperLeg.endY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg']+this.bodyAngles['rightLowerLeg'])*this.height*LOWER_LEG_RATIO;
	}

	this.getWidth = function() {
		var minX = this.body.torso.startX,
			maxX = this.body.torso.startX;
		for(var key in this.body) {
			if(typeof this.body[key].endX !== 'undefined') {
				if(this.body[key].endX < minX) minX = this.body[key].endX;
				else if(this.body[key].endX > maxX) maxX = this.body[key].endX;
			}
		}
		return Math.abs(minX - maxX);
	}

	this.getHeight = function() {
		var minY = this.body.torso.startY,
			maxY = this.body.torso.startY;
		for(var key in this.body) {
			if(typeof this.body[key].endY !== 'undefined') {
				if(this.body[key].endY < minY) minY = this.body[key].endY;
				else if(this.body[key].endY > maxY) maxY = this.body[key].endY;
			}
		}
		return Math.abs(minY - maxY);
	}

	// renders the StickMan onto context ctx at pos [x, y]
	this.render = function(ctx, pos) {
		var lineWidth = this.height * LINE_WIDTH_RATIO * AR,
			xDiff = this.getWidth() - (this.body.torso.startX + this.body.torso.endX) / 2 + pos[0],
			yDiff = this.getHeight() - (this.body.torso.startY + this.body.torso.endY) / 2 + pos[1];
		ctx.beginPath();
		// draw torso
		ctx.moveTo(this.body.torso.startX + pos[0],this.body.torso.startY + pos[1]);
		ctx.lineTo(this.body.torso.endX + pos[0],this.body.torso.endY + pos[1]);
		// draw left upper leg
		ctx.lineTo(this.body.leftUpperLeg.endX + pos[0], this.body.leftUpperLeg.endY + pos[1]);
		// draw left lower leg
		ctx.lineTo(this.body.leftLowerLeg.endX + pos[0], this.body.leftLowerLeg.endY + pos[1]);
		// draw right upper leg
		ctx.moveTo(this.body.torso.endX + pos[0], this.body.torso.endY + pos[1]);
		ctx.lineTo(this.body.rightUpperLeg.endX + pos[0], this.body.rightUpperLeg.endY + pos[1]);
		// draw right lower leg
		ctx.lineTo(this.body.rightLowerLeg.endX + pos[0], this.body.rightLowerLeg.endY + pos[1]);
		// draw upper left arm
		ctx.moveTo(this.body.torso.startX + pos[0], this.body.torso.startY + pos[1]);
		ctx.lineTo(this.body.leftUpperArm.endX + pos[0], this.body.leftUpperArm.endY + pos[1]);
		// draw lower left arm
		ctx.lineTo(this.body.leftLowerArm.endX + pos[0], this.body.leftLowerArm.endY + pos[1]);
		// draw upper right arm
		ctx.moveTo(this.body.torso.startX + pos[0], this.body.torso.startY + pos[1]);
		ctx.lineTo(this.body.rightUpperArm.endX + pos[0], this.body.rightUpperArm.endY + pos[1]);
		// draw lower right arm
		ctx.lineTo(this.body.rightLowerArm.endX + pos[0], this.body.rightLowerArm.endY + pos[1]);
		// draw neck
		ctx.moveTo(this.body.torso.startX + pos[0], this.body.torso.startY + pos[1]);
		ctx.lineTo(this.body.neck.endX + pos[0], this.body.neck.endY + pos[1]);

		// stroke body (besides head)
		ctx.closePath();
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.stroke();

		// draw head
		ctx.beginPath();
		ctx.fillStyle = '#222222';
		ctx.arc(this.body.neck.endX + pos[0], this.body.neck.endY + pos[1], this.height * HEAD_RADIUS_RATIO, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}

	this.animations = {};
	this.lastAnimationTime = Date.now();

	/* Animations are to be passed in with the body part names as the property names of arrays of animation times and destination angles.
	 * Ex.: var exAnim = {
	 * 			numRuns: 5, // 5 runs total -- leaving out numRuns means animation repeats forever
	 * 			'torso': [ { time: 0, endAngle: Math.PI / 2 },
	 * 					   { time: 500, endAngle: 3*Math.PI / 2 },
	 * 					   { time: 500, endAngle: 5*Math.PI / 2 } ]
	 * 			};
	 */

	this.addAnimation = function(anim) {
		for(var key in anim) {
			if(key == 'numRuns')
				continue;
			this.animations[key] = {
				numRuns: typeof anim.numRuns != 'undefined' ? anim.numRuns : Infinity,
				sequence: anim[key],
				sequencePos: 0,
				elapsedTime: 0,
				lastAngle: this.bodyAngles[key]
			}
		}
	}

	this.animate = function() {
		var elapsedTime = Date.now() - this.lastAnimationTime;
		if(elapsedTime > 500) elapsedTime = 200;
		this.lastAnimationTime = Date.now();
		// go through each body part's animation (if there is one)
		for(var key in this.animations) {
			// update individual run times
			this.animations[key].elapsedTime += elapsedTime;
			// if at the end of an animation step, set elapsedTime to the difference and sequencePos to the next element so there's no jerkiness
			if(this.animations[key].elapsedTime > this.animations[key].sequence[this.animations[key].sequencePos].time) {
				this.bodyAngles[key] = this.animations[key].lastAngle = this.animations[key].sequence[this.animations[key].sequencePos].endAngle;
				// if at the end of animation and it doesn't have repeats left, delete it from this.animations
				if(this.animations[key].sequencePos == this.animations[key].sequence.length - 1) {
					if(!(--this.animations[key].numRuns)) {
						delete this.animations[key];
						return;
					}
				}
				this.animations[key].elapsedTime = this.animations[key].elapsedTime - this.animations[key].sequence[this.animations[key].sequencePos].time;
				this.animations[key].sequencePos = this.animations[key].sequencePos === this.animations[key].sequence.length-1 ? 0 : this.animations[key].sequencePos + 1;
			} else {
			// if not timed past animation step, animate the right amount
				this.bodyAngles[key] += (this.animations[key].sequence[this.animations[key].sequencePos].endAngle - this.animations[key].lastAngle) * (elapsedTime / this.animations[key].sequence[this.animations[key].sequencePos].time);
			}
		}
		this.updateBodyPositions();
	}
}

var STAND_TRANSITION_TIME = 500;
var standAnimation = {
	'neck': [ { time: STAND_TRANSITION_TIME, endAngle: 0 } ],
	'torso': [ { time: STAND_TRANSITION_TIME, endAngle: Math.PI / 2 } ],
	'rightUpperArm': [ { time: STAND_TRANSITION_TIME, endAngle: -4*Math.PI / 5 } ],
	'rightLowerArm': [ { time: STAND_TRANSITION_TIME, endAngle: 0 } ],
	'leftUpperArm': [ { time: STAND_TRANSITION_TIME, endAngle: 4*Math.PI / 5 } ],
	'leftLowerArm': [ { time: STAND_TRANSITION_TIME, endAngle: 0 } ],
	'leftUpperLeg': [ { time: STAND_TRANSITION_TIME, endAngle: -Math.PI / 10 } ],
	'rightUpperLeg': [ { time: STAND_TRANSITION_TIME, endAngle: Math.PI / 10 } ],
	'leftLowerLeg': [ { time: STAND_TRANSITION_TIME, endAngle: 0 } ],
	'rightLowerLeg': [ { time: STAND_TRANSITION_TIME, endAngle: 0 } ],
};

var RUN_TIME = 380;
var runAnimation = {
	'neck': [ 
		{ time: 0, endAngle: -Math.PI / 18 }
	],
	'torso': [
		{ time: 0, endAngle: Math.PI / 2.55 },
		{ time: RUN_TIME*0.5, endAngle: Math.PI / 2.65 },
		{ time: RUN_TIME*0.5, endAngle: Math.PI / 2.55 }
	],
	'rightUpperLeg': [
		{ time: 0, endAngle: Math.PI / 2.7 },
		{ time: RUN_TIME*0.5, endAngle: Math.PI / 14 },
		{ time: RUN_TIME*0.5, endAngle: -Math.PI / 10 }
	],
	'rightLowerLeg': [
		{ time: 0, endAngle: -Math.PI / 7 },
		{ time: RUN_TIME*0.5, endAngle: -Math.PI / 30 },
		{ time: RUN_TIME*0.5, endAngle: -Math.PI / 8 }
	],
	'leftUpperLeg': [
		{ time: 0, endAngle: -Math.PI / 10 },
		{ time: RUN_TIME*0.5, endAngle: Math.PI / 4 },
		{ time: RUN_TIME*0.5, endAngle: Math.PI / 2.7 }
	],
	'leftLowerLeg': [
		{ time: 0, endAngle: -Math.PI / 8 },
		{ time: RUN_TIME*0.5, endAngle: -Math.PI / 2 },
		{ time: RUN_TIME*0.5, endAngle: -Math.PI / 7 }
	],
	'leftUpperArm': [
		{ time: 0, endAngle: 4*Math.PI / 5 },
		{ time: RUN_TIME, endAngle: 6*Math.PI / 5 }
	],
	'leftLowerArm': [
		{ time: 0, endAngle: Math.PI / 3 },
		{ time: RUN_TIME, endAngle: Math.PI / 2.1 }
	],
	'rightUpperArm': [
		{ time: 0, endAngle: -4*Math.PI / 5 },
		{ time: RUN_TIME, endAngle: -6*Math.PI / 5 }
	],
	'rightLowerArm': [
		{ time: 0, endAngle: Math.PI / 2.1 },
		{ time: RUN_TIME, endAngle: Math.PI / 3 }
	]
};

var FLIP_TIME = RUN_TIME * (225/85);
var flipAnimation = {
	numRuns: 1,
	'neck': [
		{ time: 0, endAngle: 0 },
		{ time: FLIP_TIME * 0.6, endAngle: -Math.PI / 3 },
		{ time: FLIP_TIME * 0.4, endAngle: 0 },
	],
	'torso': [
		{ time: 0, endAngle: Math.PI / 2.55 },
		{ time: FLIP_TIME, endAngle: Math.PI / 2.55 - 2 * Math.PI }
	],
	'leftUpperArm': [
		{ time: 0, endAngle: Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.2, endAngle: Math.PI * 0.9 },
		{ time: FLIP_TIME * 0.3, endAngle: Math.PI * 1.1 },
		{ time: FLIP_TIME * 0.3, endAngle: Math.PI * 0.9 },
		{ time: FLIP_TIME * 0.2, endAngle: Math.PI / 1.3 }
	],
	'leftLowerArm': [
		{ time: 0, endAngle: Math.PI / 3 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 2.1 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 3 }
	],
	'rightUpperArm': [
		{ time: 0, endAngle: -4*Math.PI / 5 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.2 },
		{ time: FLIP_TIME * 0.5, endAngle: -4*Math.PI / 5 }
	],
	'rightLowerArm': [
		{ time: 0, endAngle: Math.PI / 3 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 1.9 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 3	}
	],
	'leftUpperLeg': [
		{ time: 0, endAngle: Math.PI / 30 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 1.7 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 30 }
	],
	'leftLowerLeg': [
		{ time: 0, endAngle: -Math.PI / 30 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.7 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 30 }
	],
	'rightUpperLeg': [
		{ time: 0, endAngle: Math.PI / 8 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.5, endAngle: Math.PI / 8 }
	],
	'rightLowerLeg': [
		{ time: 0, endAngle: -Math.PI / 12 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 1.3 },
		{ time: FLIP_TIME * 0.5, endAngle: -Math.PI / 12 }
	]
};

var SLIDE_TRANSITION_TIME = RUN_TIME * 1.2;
var enterSlideAnimation = {
	numRuns: 1,
	'neck': [
		//{ time: 0, endAngle: 0 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 3.3 },
	],
	'torso': [
		//{ time: 0, endAngle: Math.PI / 2.55 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 1.1 },
	],
	'leftUpperArm': [
		//{ time: 0, endAngle: Math.PI / 1.3 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 1.23 },
	],
	'leftLowerArm': [
		//{ time: 0, endAngle: Math.PI / 3 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 3.54 },
	],
	'rightUpperArm': [
		//{ time: 0, endAngle: -Math.PI / 1.3 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 1.3 - Math.PI / 3 },
	],
	'rightLowerArm': [
		//{ time: 0, endAngle: Math.PI / 2.3 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 3.54 },
	],
	'leftUpperLeg': [
		//{ time: 0, endAngle: Math.PI / 8 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 5 },
	],
	'leftLowerLeg': [
		//{ time: 0, endAngle: -Math.PI / 8 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 4.7 },
	],
	'rightUpperLeg': [
		//{ time: 0, endAngle: Math.PI / 4 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 3.6 },
	],
	'rightLowerLeg': [
		//{ time: 0, endAngle: -Math.PI / 4 },
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 2.8 },
	],
};

// create exit slide animation
var exitSlideAnimation = {
	numRuns: 1,
	'neck': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: 0 },
	],
	'torso': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 2.55 },
	],
	'leftUpperArm': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 1.3 },
	],
	'leftLowerArm': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 3 },
	],
	'rightUpperArm': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 1.3 },
	],
	'rightLowerArm': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 2.3 },
	],
	'leftUpperLeg': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 8 },
	],
	'leftLowerLeg': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 8 },
	],
	'rightUpperLeg': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: Math.PI / 4 },
	],
	'rightLowerLeg': [
		{ time: SLIDE_TRANSITION_TIME, endAngle: -Math.PI / 4 },
	],
};
/*
// reverses the into slide animation
for(var key in enterSlideAnimation) {
	if(enterSlideAnimation[key].constructor !== Array) continue;
	exitSlideAnimation[key] = [
		//{ time: 0, endAngle: enterSlideAnimation[key][enterSlideAnimation[key].length-1].endAngle },
		{ time: SLIDE_TRANSITION_TIME, endAngle: enterSlideAnimation[key][0].endAngle }
	];
}
*/

// reverse anim horizontally
function reverseAnimationX(anim) {
	var i;
	anim = JSON.parse(JSON.stringify(anim));
	for(var key in anim) {
		switch(key) {
			case 'neck':
			case 'leftUpperArm':
			case 'leftLowerArm':
			case 'rightUpperArm':
			case 'rightLowerArm':
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

