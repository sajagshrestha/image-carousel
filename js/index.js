const carousel = document.querySelector(".carousel");
const imageContainer = document.querySelector(".carousel-image-container");
const images = document.querySelectorAll(".carousel-image");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const numberOfImages = images.length;
const imageSize = images[0].clientWidth;
let counter = 1;

const slideNextPicture = () => {
	//if we reach last image
	if (counter === numberOfImages) {
		//go to first image
		imageContainer.style.transform = `translateX(${0}px)`;
		counter = 1;
	} else {
		//else move to next image
		imageContainer.style.transform = `translateX(-${
			imageSize * counter
		}px)`;
		counter++;
	}
	console.log(counter);
};

const slidePrevPicture = () => {
	if (counter === 1) {
		imageContainer.style.transform = `translateX(-${
			imageSize * (numberOfImages - 1)
		}px)`;
		counter = numberOfImages;
	} else {
		imageContainer.style.transform = `translateX(-${
			imageSize * (counter - 2)
		}px)`;
		counter--;
	}
	console.log(counter);
};
nextButton.addEventListener("click", slideNextPicture);
prevButton.addEventListener("click", slidePrevPicture);
