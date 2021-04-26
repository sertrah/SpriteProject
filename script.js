let playerState = "idle";
const dropdownEl = document.getElementById("animations");
dropdownEl.addEventListener("change", (e) => {
    playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
// here we load the img right in the memory
playerImage.src = "shadow_dog.png";
// the size of the square that will iterate each of the drawings is configured
const spriteDogWidth = 575;
const spriteDogHeight = 523;
// The incremental variable will give us the Position of the sprite
let gameFrame = 0;
// Frame Animation control
const staggerFrames = 6;
// List of the all Animations with their respective position in X and Y for the Dog img
const spriteAnimations = [];
// Quantity list for each animation state
const animationState = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 7,
    }
];

animationState.forEach((state, index) => {
    let frames = {
        loc: []
    };
    // Here we get the exact position in pixels against each columns
    const positionY = index * spriteDogHeight;
    for (let j = 0; j < state.frames; j++) {
        // Here we obtain the exact position in pixels in each of the movements  
        let positionX = j * spriteDogWidth;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
})

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const spriteTotalFrames = spriteAnimations[playerState].loc.length;
    // {gameFrame} increases linearly to infinity ∞
    // Dividing it between {staggerFrames} will return to us a vale between 0 and 1
    // With this value, if we find its remainder with {spriteTotalFrames}, it will return an integer every {spriteTotalFrames} times 
    // that means when Math.floor((0 / 4 || 1 / 4 ||2 / 4 ||3 / 4 ) === 0 ) % 4 => 0, Math.floor((1 / 4) === 1 ) % 6 => 1 .... Math.floor(5 ) % 6 => 5, Math.floor(6) % 6 => 0
    let position = Math.floor(gameFrame / staggerFrames) % spriteTotalFrames;
    let frameX = spriteDogWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteDogWidth,
        spriteDogHeight, 0, 0, spriteDogWidth, spriteDogHeight);

    gameFrame++;
    requestAnimationFrame(animate)
};

animate();
