import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('X', { static: true }) xImage!: ElementRef<HTMLImageElement>;
  @ViewChild('O', { static: true }) oImage!: ElementRef<HTMLImageElement>;
  private isXTurn: boolean = true;

  ngAfterViewInit(): void {
    this.addEventListeners();
  }

  private addEventListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', (event) => {
        this.drawShape(event.target as HTMLButtonElement);
      });
    });
  }

  public drawShape(button: HTMLButtonElement): void {
    if (button.hasChildNodes()) return;

    const img = this.isXTurn
      ? this.xImage.nativeElement
      : this.oImage.nativeElement;
    const imgElement = img.cloneNode(true) as HTMLImageElement;
    imgElement.hidden = false;
    button.appendChild(imgElement);

    button.disabled = true;
    this.isXTurn = !this.isXTurn;
  }
}
