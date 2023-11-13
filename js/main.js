(() => {
  gsap.registerPlugin(ScrollTrigger);

  const fadeInAnimation = gsap.from(".animate-on-scroll", {
    opacity: 0,
    y: 50,
    duration: 5,
    paused: true,
  });

  ScrollTrigger.create({
    trigger: ".animate-on-scroll",
    start: "top 80%",
    onEnter: () => fadeInAnimation.play(),
  });

  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const InfoBoxes = [{
    title: "Noise-cancelling microphones",
    text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.",
    image: "../images/hotspot.svg"
  }];

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;
  const frameCount = 168;
  const images = [];

  const buds = {
    frame: 0,
  };

  let imageCon = document.querySelector('#imageCon'),
    drag = document.querySelector('.image-drag'),
    left = document.querySelector('.image-left'),
    dragging = false,
    min = 0,
    max = imageCon.offsetWidth;

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `images/earbuds_${i.toString().padStart(3, "0")}.jpg`;
    images.push(img);
  }

  gsap.to(buds, {
    frame: 167,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      markers: true,
      start: "top top",
    },
    onUpdate: render,
  });

  images[0].addEventListener("onload", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {
    InfoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`hotspot-${index + 1}`);
      console.log(selected);
    });
  }
  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  function onDown() {
    dragging = true;
    console.log("on down Called");
  }

  function onUp() {
    dragging = false;
    console.log("on up Called");
  }

  function onMove(event) {
    if (dragging === true) {
      let x = event.clientX - imageCon.getBoundingClientRect().left;
      if (x < min) {
        x = min;
      } else if (x > max) {
        x = max - 4;
      }

      drag.style.left = x + "px";
      left.style.width = x + "px";
    }
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".animate-me", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: "#details",
      start: "top 80%",
      end: "bottom 80%",
      scrub: true,
    },
  });

  drag.addEventListener('mousedown', onDown);
  document.body.addEventListener('mouseup', onUp);
  document.body.addEventListener('mousemove', onMove);
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });
})();
