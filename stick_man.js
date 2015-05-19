// Stick Man sizing constants
var STICK_WIDTH = 6,
	STICK_UPPER_LEG_RATIO = 1.9,
	STICK_LOWER_LEG_RATIO = 1.7,
	STICK_HEAD_RATIO = 6,
	STICK_ARM_RATIO = 1.7,
	STICK_NECK_RATIO = 5.3;

function StickMan(size) {
	this.size = size; // size of torso -- all other sizes relative to this

	this.bodyAngles = {
		torso: Math.PI / 2,
		neck: 0,
		leftArm: Math.PI / 1.3,
		rightArm: -Math.PI / 1.3,
		leftUpperLeg: -Math.PI / 4,
		leftLowerLeg: Math.PI / 4,
		rightUpperLeg: Math.PI / 4,
		rightLowerLeg: -Math.PI / 4
	};

	// randomizes each body part's angle (within a certain range)
	this.randomizeAngles = function() {
		this.bodyAngles['torso'] = Math.PI / 3 + Math.random() * Math.PI / 3;
		this.bodyAngles['neck'] = Math.PI / 4 + Math.random() * -Math.PI / 2;
		this.bodyAngles['leftArm'] = Math.PI / 1.3 - Math.random() * 2 * (Math.PI-Math.PI/1.3);
		this.bodyAngles['rightArm'] = -Math.PI / 1.3 + Math.random() * 2 * (Math.PI-Math.PI/1.3);
		this.bodyAngles['leftUpperLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
		this.bodyAngles['leftLowerLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
		this.bodyAngles['rightUpperLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
		this.bodyAngles['rightLowerLeg'] = -Math.PI / 4 + Math.random() * 2 * Math.PI / 2;
	}

	// renders the StickMan onto context ctx at pos [x, y]
	this.render = function(ctx, pos) {
		var lineWidth = STICK_WIDTH * AR * this.size / 100;
		ctx.beginPath();
		// draw torso
		var topTorsoX = pos[0]+Math.cos(this.bodyAngles['torso'])*this.size/2,
			topTorsoY = pos[1]-Math.sin(this.bodyAngles['torso'])*this.size/2;
		ctx.moveTo(topTorsoX,topTorsoY);
		var bottomTorsoX = pos[0]-Math.cos(this.bodyAngles['torso'])*this.size/2,
			bottomTorsoY = pos[1]+Math.sin(this.bodyAngles['torso'])*this.size/2;
		ctx.lineTo(bottomTorsoX,bottomTorsoY);
		// draw left upper leg
		var bottomLeftUpperLegX = bottomTorsoX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg'])*this.size/STICK_UPPER_LEG_RATIO,
			bottomLeftUpperLegY = bottomTorsoY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg'])*this.size/STICK_UPPER_LEG_RATIO;
		ctx.lineTo(bottomLeftUpperLegX, bottomLeftUpperLegY);
		// draw left lower leg
		ctx.lineTo(bottomLeftUpperLegX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg']+this.bodyAngles['leftLowerLeg'])*this.size/STICK_LOWER_LEG_RATIO,
				bottomLeftUpperLegY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftUpperLeg']+this.bodyAngles['leftLowerLeg'])*this.size/STICK_LOWER_LEG_RATIO);
		// draw right upper leg
		ctx.moveTo(bottomTorsoX, bottomTorsoY);
		var bottomRightUpperLegX = bottomTorsoX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg'])*this.size/STICK_UPPER_LEG_RATIO,
			bottomRightUpperLegY = bottomTorsoY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg'])*this.size/STICK_UPPER_LEG_RATIO;
		ctx.lineTo(bottomRightUpperLegX, bottomRightUpperLegY);
		// draw right lower leg
		ctx.lineTo(bottomRightUpperLegX-Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg']+this.bodyAngles['rightLowerLeg'])*this.size/STICK_LOWER_LEG_RATIO,
				bottomRightUpperLegY+Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightUpperLeg']+this.bodyAngles['rightLowerLeg'])*this.size/STICK_LOWER_LEG_RATIO);
		// draw left arm
		ctx.moveTo(topTorsoX, topTorsoY);
		ctx.lineTo(topTorsoX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['leftArm'])*this.size/STICK_ARM_RATIO, topTorsoY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['leftArm'])*this.size/STICK_ARM_RATIO);
		// draw right arm
		ctx.moveTo(topTorsoX, topTorsoY);
		ctx.lineTo(topTorsoX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['rightArm'])*this.size/STICK_ARM_RATIO, topTorsoY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['rightArm'])*this.size/STICK_ARM_RATIO);
		// draw neck
		ctx.moveTo(topTorsoX, topTorsoY);
		var neckTopX = topTorsoX+Math.cos(this.bodyAngles['torso']+this.bodyAngles['neck'])*this.size/STICK_NECK_RATIO,
			neckTopY = topTorsoY-Math.sin(this.bodyAngles['torso']+this.bodyAngles['neck'])*this.size/STICK_NECK_RATIO;
		ctx.lineTo(neckTopX, neckTopY);

		// stroke body (besides head)
		ctx.closePath();
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.stroke();

		// draw head
		ctx.beginPath();
		ctx.fillStyle = '#222222';
		ctx.arc(neckTopX, neckTopY, this.size / STICK_HEAD_RATIO, 2 * Math.PI, false);
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
	}
}
