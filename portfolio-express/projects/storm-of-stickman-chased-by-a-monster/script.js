function Stickman(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = "black";

    Stickman.instances.push(this);
    this.draw();
}

Stickman.instances = [];
Stickman.monster = new Image();
Stickman.monster.src = "http://cdn.onlinewebfonts.com/svg/img_561315.png";
Stickman.monsterX = -250;

Stickman.prototype.draw = function() {
    //head
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y - 35, 25, 0, Math.PI * 2);
    this.ctx.fill();

    //body
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 8;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + 90);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();

    // arms
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - 50, this.y);
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + 50, this.y + 5);
    this.ctx.stroke();

    // legs
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.moveTo(this.x, this.y + 80);
    this.ctx.lineTo(this.x - 50, this.y + 150);
    this.ctx.moveTo(this.x, this.y + 80);
    this.ctx.lineTo(this.x + 50, this.y + 180);
    this.ctx.stroke();
};

Stickman.run = function() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(Stickman.monster, Stickman.monsterX, 150, 250, 250);
    Stickman.monsterX += 10;
    for (var i = 0; i < 30; i++) {
        Stickman.instances[i].x += Math.random() * 30;
        Stickman.instances[i].draw();
    }
    setTimeout(Stickman.run, 100);
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", Stickman.run);

for (var i = 0; i < 30; i++) {
    new Stickman(ctx, Math.random() * 500, Math.random() * 500).draw();
}
