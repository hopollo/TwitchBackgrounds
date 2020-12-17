const url = new URL(window.location.href);
const name = url.searchParams.get("name");
const animation = url.searchParams.get("animation");
const background = url.searchParams.get("background");

const height = document.body.clientHeight;
const width = document.body.clientWidth;

const canvas = document.querySelector("canvas");
canvas.width = width;
canvas.height = height;

const backgroundColor = "#262626";
const imgSize = 100;
const animationSpeed = 1000;

const ctx = canvas.getContext("2d");
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, width, height);

const img = new Image();
getTwitchLogo(name).then(pic => { img.src = pic });

img.onload = () => {
  switch (animation) {
    case "1":
    case "tiles":
      repeatSlideAnimation();
      break;
    case "2":
    case "bounce":
      bounceAnimation();
      break;
    case "3":
    case "louisvuittonsolo":
      break;
    case "4":
    case "louisvuittonwithviewer":
      break;
    case "peekaboo":
    default:
      defaultAnimation();
  }
};

function repeatSlideAnimation() {
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      ctx.drawImage(img, x * imgSize, y * imgSize, imgSize, imgSize);
    }
  }
}

function bounceAnimation() {
  let x = Math.floor(Math.random() * Math.floor(width - imgSize));
  let y = Math.floor(Math.random() * Math.floor(height - imgSize));
  const offsetX = width - imgSize;
  const offsetY = height - imgSize;
  let dx = 2;
  let dy = 2;

  setInterval(function () {
    const new_x = x + dx;
    if (new_x < 0 || new_x > offsetX) {
      dx = -dx;
    }

    const new_y = y + dy;
    if (new_y < 0 || new_y > offsetY) {
      dy = -dy;
    }

    x += dx;
    y += dy;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, x, y, imgSize, imgSize);
  }, 10);
}

function defaultAnimation() {
  setInterval(() => {
    const x = Math.floor(Math.random() * Math.floor(width - imgSize));
    const y = Math.floor(Math.random() * Math.floor(height - imgSize));

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, x, y, imgSize, imgSize);
  }, animationSpeed);
}

async function getTwitchLogo(name) {
  const picture = await fetch(`https://decapi.me/twitch/avatar/${name}`).then((res) => res.text());
  return picture;
}