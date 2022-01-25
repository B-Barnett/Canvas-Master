const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;

// This is a good base for a particle system, many things can be created from this.

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    // If initialized it will start with a circle wherever defined on canvas.
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i=0; i < 5; i++) {
        particleArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // As the mouse moves across the canvas, push 1 new particles into the array(display on the canvas 1 more particles.)
    for (let i=0; i < 2; i++) {
        particleArray.push(new Particle());
    }
})

class Particle {
    constructor() {
        // Sets the position of the particles directly on the mouse.
        this.x = mouse.x;
        this.y = mouse.y;
        // Sets the position of the particles randomly.
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 1;
        // Random number between 1.5 and -1.5 to move each direction in the axis.;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Makes the particles shrink as they move.
        if (this.size > 0.2) this.size -= 0.01;
    }
    draw() {
        // hsl (Hue, Saturation, Lightness(1, 100%, 50%)), Hue revolves 360 degrees changing the color. 50% to see the full color, neither light or dark.
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Loops through the particle array, then displays each one at a time.
function handleParticles() {
    for (var i=0; i<particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        for (let j = i; j < particleArray.length; j++) {
            // Pythagorean theorem is used to calculate the distance between the particles.
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dy + dy * dx);
            if (distance < 5) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = particleArray[i].size/8;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }
        // Removes particles from the array smaller than .3, the index has to be decremented to make sure no element in the array does'nt get skipped.
        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // Clears the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Gives a trailing effect.
    // ctx.fillStyle = 'rgba(0,0,0,0.1)';
    // ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticles();
    //  Built in function to loop through the function called. This is reccomended when dealing with animations in canvas.
    requestAnimationFrame(animate);
    hue+=0.5;
}
animate();