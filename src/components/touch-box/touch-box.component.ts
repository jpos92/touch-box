import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'touch-box',
  templateUrl: './touch-box.component.html',
  styleUrls: ['./touch-box.component.scss'],
  standalone: true,
})
export class TouchBoxComponent implements OnInit {
  private isTouching = false;
  private startY: number = 0;
  private currentPosition: number = 0;
  private boxHeight: number = 100;

  private velocityY: number = 0;
  private animationFrame: number = 0;

  ngOnInit(): void {
    this.currentPosition = window.innerHeight - this.boxHeight;
    this.updateBoxStyle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Adjust the position if the window size changes
    this.currentPosition =
      (this.currentPosition * window.innerHeight) / event.target.innerHeight;
  }

  onTouchStart(event: TouchEvent) {
    this.isTouching = true;
    this.startY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isTouching) {
      return;
    }

    const deltaY = event.touches[0].clientY - this.startY;
    this.currentPosition += deltaY;
    this.startY = event.touches[0].clientY;

    this.velocityY = deltaY;
  }

  onTouchEnd() {
    this.isTouching = false;
    this.decelerate();
  }

  decelerate() {
    const decelerationRate = 0.8; // Adjust this value to control the deceleration rate

    const animate = () => {
      // Apply deceleration to velocity
      this.velocityY *= decelerationRate;

      // Update position based on velocity
      this.currentPosition += this.velocityY;

      // Update the style of the box
      this.updateBoxStyle();

      // Continue animation if velocity is still significant
      if (Math.abs(this.velocityY) > 0.1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start the animation
    animate();
  }

  updateBoxStyle() {
    this.currentPosition = Math.max(
      0,
      Math.min(this.currentPosition, window.innerHeight - 100)
    ); // Limit position within screen bounds
  }

  getBoxStyle() {
    return {
      transform: `translateY(${this.currentPosition}px)`,
    };
  }
}
