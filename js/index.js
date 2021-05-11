const carousel = document.querySelector(".carousel");
const imageContainer = document.querySelector(".carousel-image-container");
const images = imageContainer.children;

const numberOfImages = images.length;
const imageSize = images[0].clientWidth;

let posX = 0;
let counter = 1;

//add indicator to dom
const indicators = document.createElement("div");
indicators.classList.add("indicators");
carousel.appendChild(indicators);

for (let i = 0; i < numberOfImages; i++) {
	let dot = document.createElement("div");
	dot.classList.add("dot");
	indicators.appendChild(dot);
}

const dots = indicators.children;

//add buttons to dom
const previousButton = document.createElement("button");
previousButton.innerHTML = "&#8249";
previousButton.classList.add("previous-button");
carousel.appendChild(previousButton);

const nextButton = document.createElement("button");
nextButton.innerHTML = "&#8250";
nextButton.classList.add("next-button");
carousel.appendChild(nextButton);

//functions
//change indicator dots color when active
function activateCurrentPictureDot(current) {
	for (let i = 0; i < dots.length; i++) {
		if (current === i + 1) {
			dots[i].classList.add("active");
			console.log(i + 1);
		} else {
			dots[i].classList.remove("active");
		}
	}
}

//slide animation
function slide(current, destination) {
	if (current < destination) {
		const animate = () => {
			if (current >= destination) {
				return (imageContainer.style.transform = `translateX(-${destination}px)`);
			}
			current += 60;
			imageContainer.style.transform = `translateX(-${current}px)`;

			window.requestAnimationFrame(() => animate());
		};
		window.requestAnimationFrame(animate);
	}
	if (current > destination) {
		const animate = () => {
			if (current <= destination) {
				return (imageContainer.style.transform = `translateX(-${destination}px)`);
			}
			current -= 60;
			imageContainer.style.transform = `translateX(-${current}px)`;
			window.requestAnimationFrame(() => animate());
		};
		window.requestAnimationFrame(animate);
	}
}
//onClick handlers
function onNextButtonClick() {
	if (counter === numberOfImages) {
		slide(posX, 0);
		posX = 0;
		counter = 1;
		activateCurrentPictureDot(counter);
	} else {
		let destinationPosX = imageSize * counter;
		slide(posX, destinationPosX);
		posX = destinationPosX;
		counter++;
		activateCurrentPictureDot(counter);
	}
}

function onPreviousButtonClick() {
	if (counter === 1) {
		let destinationPosX = imageSize * (numberOfImages - 1);
		slide(posX, destinationPosX);
		posX = destinationPosX;
		counter = numberOfImages;
		activateCurrentPictureDot(counter);
	} else {
		let destinationPosX = imageSize * (counter - 2);
		slide(posX, destinationPosX);
		posX = destinationPosX;
		counter--;
		activateCurrentPictureDot(counter);
	}
}

//slide when clicking on dots
for (let i = 0; i < dots.length; i++) {
	dots[i].addEventListener("click", () => {
		let destinationPosx = imageSize * i;
		counter = i + 1;
		activateCurrentPictureDot(counter);
		slide(posX, destinationPosx);
		posX = destinationPosx;
	});
}

//activate first image
activateCurrentPictureDot(counter);

//add onClick handlers to buttons
nextButton.addEventListener("click", onNextButtonClick);
previousButton.addEventListener("click", onPreviousButtonClick);
