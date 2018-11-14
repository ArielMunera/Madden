export class Particle {

    private FIREWORK_LIFESPAN = 600; // ms
    private PARTICLE_INITIAL_SPEED = 4.5; // 2-8
    private GRAVITY = 9.8;

    public x: number;
    public y: number;
    private red: number;
    private green: number;
    private blue: number;
    public alpha: number;
    private radius: number;
    private angle: number;
    private speed: number;
    private velocityX: number;
    private velocityY: number;
    private startTime: number;
    private duration: number;
    private currentDuration: number;
    private dampening: number; // slowing factor at the end

    private colour: string;

    private initialVelocityX: number;
    private initialVelocityY: number;

    private ctx:any;


    constructor(
        x: number = 0,
        y: number = 0,
        red: number = ~~(Math.random() * 255),
        green: number = ~~(Math.random() * 255),
        blue: number = ~~(Math.random() * 255),
        speed: number,
        isFixedSpeed: boolean,
        ctx: number
    ) {

        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = 0.05;
        this.radius = 1 + Math.random();
        this.angle = Math.random() * 360;
        this.speed = (Math.random() * speed) + 0.1;
        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed;
        this.startTime = (new Date()).getTime();
        this.duration = Math.random() * 300 + this.FIREWORK_LIFESPAN;
        this.currentDuration = 0;
        this.dampening = 30; // slowing factor at the end

        this.colour = this.getColour();

        if (isFixedSpeed) {
            this.speed = speed;
            this.velocityY = Math.sin(this.angle) * this.speed;
            this.velocityX = Math.cos(this.angle) * this.speed;
        }

        this.initialVelocityX = this.velocityX;
        this.initialVelocityY = this.velocityY;

        this.ctx = ctx;

    }

    animate() {

        this.currentDuration = (new Date()).getTime() - this.startTime;

        // initial speed kick
        if (this.currentDuration <= 200) {

            this.x += this.initialVelocityX * this.PARTICLE_INITIAL_SPEED;
            this.y += this.initialVelocityY * this.PARTICLE_INITIAL_SPEED;
            this.alpha += 0.01;

            this.colour = this.getColour(240, 240, 240, 0.9);

        } else {

            // normal expansion
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + (Math.random() * 0.3));

        }

        this.velocityY += this.GRAVITY / 1000;

        // slow down particles at the end
        if (this.currentDuration >= this.duration) {
            this.velocityX -= this.velocityX / this.dampening;
            this.velocityY -= this.velocityY / this.dampening;
        }

        if (this.currentDuration >= this.duration + this.duration / 1.1) {

            // fade out at the end
            this.alpha -= 0.02;
            this.colour = this.getColour();

        } else {

            // fade in during expansion
            if (this.alpha < 1) {
                this.alpha += 0.03;
            }

        }
    }

    render() {

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        //this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.colour;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = this.getColour(this.red + 150, this.green + 150, this.blue + 150, 1);
        this.ctx.fill();

    }

    getColour(red?, green?, blue?, alpha?) {

        return `rgba(${red || this.red}, ${green || this.green}, ${blue || this.blue}, ${alpha || this.alpha})`;

    }

}
