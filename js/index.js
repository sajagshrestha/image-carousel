const carousel = document.querySelector(".carousel");
const imageContainer = document.querySelector(".carousel-image-container");
const images = document.querySelectorAll(".carousel-image");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const numberOfImages = images.length;
const imageSize = images[0].clientWidth;

let posX = 0;
let counter = 1;

function slideForward(current, destination) {
	const animate = () => {
		if (current >= destination) {
			imageContainer.style.transform = `translateX(-${destination}px)`;
			return (posX = destination);
		}
		current += 60;
		imageContainer.style.transform = `translateX(-${current}px)`;

		window.requestAnimationFrame(() => animate());
	};
	window.requestAnimationFrame(animate);
}

function slideBackward(current, destination) {
	const animate = () => {
		if (current <= destination) {
			imageContainer.style.transform = `translateX(-${destination}px)`;
			return (posX = destination);
		}
		current -= 60;
		imageContainer.style.transform = `translateX(-${current}px)`;
		window.requestAnimationFrame(() => animate());
	};
	window.requestAnimationFrame(animate);
}

const slideNextPicture = () => {
	if (counter === numberOfImages) {
		slideBackward(posX, 0);
		posX = 0;
		counter = 1;
	} else {
		let destinationPosX = imageSize * counter;
		slideForward(posX, destinationPosX);
		posX = destinationPosX;
		counter++;
	}
};

const slidePreviousPicture = () => {
	if (counter === 1) {
		let destinationPosX = imageSize * (numberOfImages - 1);
		slideForward(posX, destinationPosX);
		posX = destinationPosX;
		counter = numberOfImages;
	} else {
		let destinationPosX = imageSize * (counter - 2);
		slideBackward(posX, destinationPosX);
		posX = destinationPosX;
		counter--;
	}
};
// const slideNextPicture = () => {
// 	//if we reach last image
// 	if (counter === numberOfImages) {
// 		//go to first image
// 		imageContainer.style.transform = `translateX(${0}px)`;
// 		counter = 1;
// 	} else {
// 		//else move to next image
// 		imageContainer.style.transform = `translateX(-${
// 			imageSize * counter
// 		}px)`;
// 		counter++;
// 	}
// 	console.log(counter);
// };

// const slidePrevPicture = () => {
// 	if (counter === 1) {
// 		imageContainer.style.transform = `translateX(-${
// 			imageSize * (numberOfImages - 1)
// 		}px)`;
// 		counter = numberOfImages;
// 	} else {
// 		imageContainer.style.transform = `translateX(-${
// 			imageSize * (counter - 2)
// 		}px)`;
// 		counter--;
// 	}
// 	console.log(counter);
// };

nextButton.addEventListener("click", slideNextPicture);
prevButton.addEventListener("click", slidePreviousPicture);
