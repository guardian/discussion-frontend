const DEFAULT_DURATION = 500;

export default function({
	anchor,
	duration = DEFAULT_DURATION
} = {}) {
	const startLocation = window.pageYOffset;
	// Because things are AJAX-ed in, the anchor is a moving target
	let distance = getDistance(anchor, startLocation);
	let position;
	let didIUpdateTheDistanceAtLeastOnce = false;

	startAnimation(duration, function(percentage) {
		position = startLocation + distance * easing(percentage);
		window.scrollTo(0, Math.floor(position));

		if (percentage > 0.8 && !didIUpdateTheDistanceAtLeastOnce) {
			distance = getDistance(anchor, startLocation);
			didIUpdateTheDistanceAtLeastOnce = true;
		}
	});
}

function getDistance (anchor, startLocation) {
	return getLocation(anchor) - startLocation;
}

function startAnimation (duration, fn) {
	if (window.requestAnimationFrame) {
		let start;

		const step = function(timestamp) {
			if (!start) {
				start = timestamp;
				window.requestAnimationFrame(step);
			} else {
				const timeLapsed = timestamp - start;
				const percentage = Math.min(timeLapsed / duration, 1);
				fn(percentage);

				if (percentage < 1) {
					window.requestAnimationFrame(step);
				}
			}
		};

		window.requestAnimationFrame(step);
	} else {
		// When requestAnimationFrame is not available, scroll without easing
		// I could use setInterval, but who cares about old browsers?
		fn(1);
	}
}

function getLocation (element) {
	let location = 0;
	if (element.offsetParent) {
		do {
			location += element.offsetTop;
			element = element.offsetParent;
		} while (element);
	}
	return location;
}

function easing (percentage) {
	// LOL, linear easing
	return percentage;
}
