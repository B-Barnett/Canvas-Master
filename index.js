const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];

// This is a good base for a particle system, many things can be created from this.

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

class Particle {
    constructor() {
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        // Random number between 1.5 and -1.5 to move each direction in the axis.;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = '#03fc7b';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}
function init() {
    for(let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}
init();

// Loops through the particle array, then displays each one at a time.
function handleParticles() {
    for (var i=0; i<particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    //  Built in function to loop through the function called. This is reccomended when dealing with animations in canvas.
    requestAnimationFrame(animate);
}
animate();