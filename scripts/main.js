/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function initCanvas() {
    clearCanvas()
    canvas.addEventListener("mousemove", drawCursor)
    canvas.addEventListener("mouseout", clearCanvas)
}

/**
 * @param {MouseEvent} e
 */
function drawCursor(e) {
    clearCanvas()
    const {x, y} = getMousePos(e)
    const size = 2;

    const points = [
        [x, y],
        [x, y + 9 * size],
        [x + 2 * size, y + 7 * size],
        [x + 4 * size, y + 10 * size],
        [x + 6 * size, y + 9 * size],
        [x + 4 * size, y + 6 * size],
        [x + 7 * size, y + 5 * size],
    ];
    

    // Shadow
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 1.5;
    ctx.shadowOffsetY = 2;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    drawPolygon(points)
    ctx.stroke();

    ctx.shadowColor = "transparent";
    drawPolygon(points)
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * @param {(number[]|(number|number)[]|number[])[]} points
 */
function drawPolygon(points) {
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(...points[i]);
    ctx.closePath();
}

/**
 * @param {MouseEvent} evt
 */
function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
