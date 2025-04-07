const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");

canvas.width = 300;
canvas.height = 300;

const prizes = ["Prêmio 1", "Prêmio 2", "Prêmio 3", "Prêmio 4", "Prêmio 5", "Prêmio 6"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4D03F", "#9B59B6", "#E74C3C"];
const slices = prizes.length;
const sliceAngle = (2 * Math.PI) / slices;
let rotation = 0;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < slices; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.lineTo(150, 150);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate((i + 0.5) * sliceAngle);
        ctx.fillText(prizes[i], 100, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spins = Math.floor(Math.random() * 10) + 10;
    let finalAngle = spins * 360 + Math.floor(Math.random() * 360);

    let start = null;
    function animateWheel(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;

        rotation = (progress / 2000) * finalAngle;

        if (progress < 2000) {
            requestAnimationFrame(animateWheel);
        } else {
            rotation = finalAngle % 360;
            spinning = false;
            let winningIndex = Math.floor((360 - rotation) / (360 / slices)) % slices;
            alert(`Você ganhou: ${prizes[winningIndex]}!`);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-150, -150);
        drawWheel();
        ctx.restore();
    }

    requestAnimationFrame(animateWheel);
}

drawWheel();
spinButton.addEventListener("click", spinWheel);