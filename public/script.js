const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slides li");
const slideCount = slide.length;
const slideWidth = slide[0].clientWidth;
const sliedMargin = 80;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const currentNum = document.querySelector("#currentNum");
const lastNum = document.querySelector("#lastNum");

let currentIdx = 0;

const updateWidth = () => {
  const currentSlides = document.querySelectorAll(".slides li");
  const newSlideCount = currentSlides.length;
  const newWidth = `${
    (slideWidth + sliedMargin) * newSlideCount - sliedMargin
  }px`;
  slides.style.width = newWidth;
};

const setInitialPos = () => {
  const initialTranslateValue = -(slideWidth + sliedMargin) * slideCount;
  slides.style.transform = `translateX(${initialTranslateValue}px)`;
  currentNum.innerText = (currentIdx % slideCount) + 1;
  lastNum.innerText = slideCount;
};

const makeClone = () => {
  for (let i = 0; i < slideCount; i++) {
    const clonSlide = slide[i].cloneNode(true);
    clonSlide.classList.add("clone");
    slides.appendChild(clonSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    const cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();
  setTimeout(() => {
    slides.classList.add("animated");
  }, 100);
};

makeClone();

const moveSlide = (num) => {
  slides.style.left = `${-num * (slideWidth + sliedMargin)}px`;
  currentIdx = num;
  if (currentIdx === slideCount || currentIdx === -slideCount) {
    setTimeout(() => {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
      currentNum.innerText = (currentIdx % slideCount) + 1;
    }, 500);
    setTimeout(() => {
      slides.classList.add("animated");
    }, 600);
  }
};

prevBtn.addEventListener("click", () => {
  moveSlide(currentIdx - 1);
  console.log(currentIdx);
  if (currentIdx > 0) {
    currentNum.innerText = (currentIdx % slideCount) + 1;
  } else if (currentIdx === 0) {
    currentNum.innerText = 1;
  } else {
    currentNum.innerText = currentIdx + 10;
  }
});

nextBtn.addEventListener("click", () => {
  moveSlide(currentIdx + 1);
  if (currentIdx < 0) {
    currentNum.innerText = currentIdx + 10;
  } else {
    currentNum.innerText = (currentIdx % slideCount) + 1;
  }
});
//auto slide
const autoSlide = () => {
  timer = setInterval(() => {
    moveSlide(currentIdx + 1);

    currentNum.innerText = (currentIdx % slideCount) + 1;
  }, 3000);
};

autoSlide();

const stopSlide = () => {
  clearInterval(timer);
};
slides.addEventListener("mouseenter", stopSlide);
slides.addEventListener("mouseleave", autoSlide);
prevBtn.addEventListener("mouseenter", stopSlide);
prevBtn.addEventListener("mouseleave", autoSlide);
nextBtn.addEventListener("mouseenter", stopSlide);
nextBtn.addEventListener("mouseleave", autoSlide);

//Book title
const bookTitle = document.querySelectorAll(".book-tit");
const bookTitleHover = document.querySelectorAll("#book-tit-hover");

bookTitle.forEach((item, i) => {
  bookTitleHover[i].innerText = item.innerText;
});

const clickSlide = () => {
  const pickSlide = document.querySelector(".pick-slide");
  let pickSlideWidth = pickSlide.clientWidth;
  const gap = 16;
  const pickSlideItems = document.querySelectorAll(".pick-book").length;
  const progressbar = document.querySelector(".bar-inner");
  const pickNextBtn = document.querySelector(".right");
  const pickPrevBtn = document.querySelector(".left");

  let i = 0;

  const updateSlide = () => {
    pickSlideWidth = pickSlide.clientWidth + gap;
    const slideDistance = pickSlideWidth;
    pickSlide.style.left = `-${slideDistance * i}px`;
    progressbar.style.width = `${(100 / pickSlideItems) * (i + 1)}%`;
  };

  const initSlide = () => {
    pickSlideWidth = pickSlide.clientWidth;
    const slideDistance = pickSlideWidth;
    pickSlide.style.left = `-${slideDistance * i}px`;
    progressbar.style.width = `${(100 / pickSlideItems) * (i + 1)}%`;
  };

  window.addEventListener("resize", updateSlide);

  pickNextBtn.addEventListener("click", () => {
    i = (i + 1) % pickSlideItems;
    if (window.innerWidth === 1920) {
      initSlide();
    } else {
      updateSlide();
    }
  });

  pickPrevBtn.addEventListener("click", () => {
    i = (i - 1 + pickSlideItems) % pickSlideItems;
    if (window.innerWidth === 1920) {
      initSlide();
    } else {
      updateSlide();
    }
  });
};

clickSlide();

const menuBtn = document.querySelector(".menu-button");
const navHiddenMenu = document.querySelector(".toggle-menu");

menuBtn.addEventListener("click", () => {
  navHiddenMenu.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

const bestSlide = () => {
  const selectGrade = document.querySelectorAll("#grade span");
  const gradeInner = document.querySelectorAll(".slide-wrap .item");
  const itemLength = document.querySelectorAll(".special .slide-item").length;
  const bestItemWidth = document.querySelectorAll(".slide-item");
  const bestItemWrap = document.querySelectorAll(".items-wrap");
  const bestBtnPrev = document.querySelector(".bestseller-btn .prev");
  const bestBtnNext = document.querySelector(".bestseller-btn .next");
  const innerBar = document.querySelector(".inner-bar");
  let idx = 0;
  let gIdx = 0;

  const updateSlide = () => {
    let gap;
    if (gIdx > 0) {
      gap = gradeInner[gIdx].clientWidth * 0.38;
    } else {
      gap = gradeInner[gIdx].clientWidth * 0.14;
    }
    let slideDistance = bestItemWidth[gIdx].clientWidth + gap;
    bestItemWrap[gIdx].style.left = `-${slideDistance * idx}px`;
  };

  selectGrade.forEach((grade, i) => {
    grade.addEventListener("click", () => {
      gradeInner.forEach((it, j) => {
        it.classList.remove("active");
        selectGrade[j].classList.remove("active");
      });
      grade.classList.add("active");
      gradeInner[i].classList.add("active");
      gIdx = i;
      idx = 0;
      innerBar.style.width = `${100 / itemLength}%`;
      updateSlide();
    });
  });

  window.addEventListener("resize", updateSlide);

  bestBtnNext.addEventListener("click", () => {
    idx = (idx + 1) % itemLength;
    innerBar.style.width = `${100 / ((itemLength - 3) / idx)}%`;

    updateSlide();
    if (idx === itemLength - 3) {
      idx = 0;
    } else if (idx > itemLength - 3) {
      innerBar.style.width = `${100 / itemLength}%`;
    }
  });

  bestBtnPrev.addEventListener("click", () => {
    innerBar.style.width = `${100 / ((itemLength - 3) / idx)}%`;
    if (idx > 0) {
      idx = (idx - 1 + itemLength) % itemLength;
      updateSlide();
    } else {
      innerBar.style.width = `${100 / itemLength}%`;
    }
  });
};

bestSlide();

//이미지 index값이 0이면 left 비활성화 index 값이 마지막이면 right 비활성화

const youtubeSlide = () => {
  const youtubeLeftBtn = document.querySelector(".content-youtube .btn .left");
  const youtubeRightBtn = document.querySelector(
    ".content-youtube .btn .right"
  );
  const youtubeLeftSvg = document.querySelectorAll(".svgLeftBtn");
  const youtubeRightSvg = document.querySelectorAll(".svgRightBtn");
  const youtubeSlideWrap = document.querySelector(".thumbnail");
  const youtubeImage = document.querySelectorAll(".thumbnail img");
  let i = 0;
  const youtubeSlidePlay = () => {
    const gap = 28;
    let imgWidth = youtubeImage[i].clientWidth + gap;
    youtubeSlideWrap.style.left = `-${imgWidth * i}px`;
    console.log(i);
    if (i === 0) {
      youtubeLeftSvg.forEach((it) => it.setAttribute("stroke", "#999999"));
    } else if (i == youtubeImage.length - 1) {
      youtubeRightSvg.forEach((it) => it.setAttribute("stroke", "#999999"));
    } else {
      youtubeLeftSvg.forEach((it) => it.setAttribute("stroke", "#111111"));
      youtubeRightSvg.forEach((it) => it.setAttribute("stroke", "#111111"));
    }
  };

  youtubeRightBtn.addEventListener("click", () => {
    if (i < youtubeImage.length - 1) {
      i++;
      youtubeSlidePlay();
    }
  });
  youtubeLeftBtn.addEventListener("click", () => {
    if (i > 0) {
      i--;
      youtubeSlidePlay();
    }
  });
};
youtubeSlide();

const gotoTopBtn = document.querySelector(".gotoTop");

gotoTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
