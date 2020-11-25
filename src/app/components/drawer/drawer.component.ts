import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {

  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();

  isOpen = false;
  openHeight = 0;

  constructor(private gestureCtrl: GestureController, private plt: Platform) { }

  async ngAfterViewInit() {
    //
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height() / 100) * 70;
    //
    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
        // Don't move the drawer further than the max height
        if (ev.deltaY < -this.openHeight) {
          return;
        }

        // Move the drawer box with the touch gesture
        drawer.style.transform = `translateY(${ev.deltaY}px)`;
      },
      onEnd: ev => {

        // Completely open or close the drawer on touch release
        if (ev.deltaY < -50 && !this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = `translateY(${-this.openHeight}px) `;
          this.openState.emit(true);
          this.isOpen = true;
        } else if (ev.deltaY > 50 && this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = '';
          this.openState.emit(false);
          this.isOpen = false;
        }
      }
    });
    gesture.enable(true);
  }

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen);

    if (this.isOpen) {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = '';
      this.isOpen = false;
    } else {
      drawer.style.transition = '.4s ease-in';
      drawer.style.transform = `translateY(${-this.openHeight}px) `;
      this.isOpen = true;
    }
  }

}
