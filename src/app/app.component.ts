import { Component, HostListener } from '@angular/core';
import { Particle } from './particle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Madden';
    // fun options!
    private PARTICLES_PER_FIREWORK: number = 150; // 100 - 400 or try 1000
    private FIREWORK_CHANCE: number = 0.06; // percentage, set to 0 and click instead
    private BASE_PARTICLE_SPEED: number = 0.6; // between 0-4, controls the size of the overall fireworks
    private FIREWORK_LIFESPAN: number = 600; // ms
    private PARTICLE_INITIAL_SPEED: number = 4.5; // 2-8
  
    // not so fun options =\
    private GRAVITY: number = 9.8;
  
    private canvas: any;
    private ctx: any;
  
    private clicked: boolean = false;
  
    public innerWidth: number;
  
    public test: number;
  
    ngOnInit() {
      this.innerWidth = window.innerWidth;
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.test = 0;
      //console.log("On Init");
    }
  
    ngDoCheck(){
    }
  
    ngAfterViewInit() {
      //console.log("After View Init");
      this.onResize('');
    }
  
    ngAfterViewChecked(){
    }
  
    private particles: Particle[] = [];
    private disableAutoFireworks: boolean = false;
    private resetDisable: number = 0;
  
    constructor() {
    }
  
    public launch(): void {
      this.disableAutoFireworks = false;
      this.clicked = true;
      //this.loop();
    }
  
    public changePosition(time: number) {
      const target = document.getElementById("faut-cliquer");
      setTimeout(function () {
        let hauteurMax = window.innerHeight;
        let largeurMax = window.innerWidth;
        let randomX = (largeurMax * 0) + Math.random() * (largeurMax - (largeurMax * 0.1));
        let randomY = (hauteurMax * 0) + Math.random() * (hauteurMax - (hauteurMax * 0.1));
        target.style.bottom = randomY + "px";
        target.style.left = randomX + "px";
        //TweenMax.to("#deplacement", 2, {x: randomX + 'px'});
        //TweenMax.to("#deplacement", 2, {y: randomY + 'px'});
      }, time);
    }
  
    /***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
  
    private loop = (): void => {
  
      if (!this.disableAutoFireworks && Math.random() < this.FIREWORK_CHANCE) {
        this.createFirework();
      }
  
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.particles.forEach((particle, i) => {
        particle.animate();
        particle.render();
        if (particle.y > this.canvas.height
          || particle.x < 0
          || particle.x > this.canvas.width
          || particle.alpha <= 0
        ) {
          this.particles.splice(i, 1);
        }
      });
  
      requestAnimationFrame(this.loop);
  
    }
  
    private createFirework = (
      x = Math.random() * this.canvas.width,
      y = Math.random() * this.canvas.height
    ): void => {
  
      let speed = (Math.random() * 2) + this.BASE_PARTICLE_SPEED;
      let maxSpeed = speed;
  
      let red = ~~(Math.random() * 255);
      let green = ~~(Math.random() * 255);
      let blue = ~~(Math.random() * 255);
  
      red = (red < 150 ? red + 150 : red);
      green = (green < 150 ? green + 150 : green);
      blue = (blue < 150 ? blue + 150 : blue);
  
      for (let i = 0; i < this.PARTICLES_PER_FIREWORK; i++) {
        let particle = new Particle(x, y, red, green, blue, speed, true, this.ctx);
        this.particles.push(particle);
  
        maxSpeed = (speed > maxSpeed ? speed : maxSpeed);
      }
  
      for (let i = 0; i < 40; i++) {
        let particle = new Particle(x, y, red, green, blue, maxSpeed, true, this.ctx);
        this.particles.push(particle);
      }
  
    }
  
    updateCanvasSize = (): void => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  
    public stop(): void {
      this.clicked = false;
      this.disableAutoFireworks = true;
      setTimeout(()=>{
        this.onResize('');
      }, 5);
    }
  
    /********************** PARTIE MOBILE **********************/
  
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.innerWidth = window.innerWidth;
      //console.log("On Resize")
      if (this.innerWidth <= 900) {
        const target = document.getElementById("faut-cliquer");
        setInterval(function () {
          let hauteurMax = window.innerHeight;
          let largeurMax = window.innerWidth;
          let randomX = (largeurMax * 0) + Math.random() * (largeurMax - (largeurMax * 0.1));
          let randomY = (hauteurMax * 0) + Math.random() * (hauteurMax - (hauteurMax * 0.1));
          target.style.bottom = randomY + "px";
          target.style.left = randomX + "px";
        }, 800);
      } else {
      }
    }
}
