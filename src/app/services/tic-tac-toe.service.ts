import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private xImage: HTMLImageElement = document.createElement('img');
  private oImage: HTMLImageElement = document.createElement('img');
  private isXTurn: boolean = true;

  constructor() {
    this.xImage.src = '../assets/images/X.svg';
    this.oImage.src = '../assets/images/O.svg';
  }

  public drawShape(button: HTMLButtonElement): void {
    if (button.hasChildNodes()) return;

    const img = this.isXTurn ? this.xImage : this.oImage;
    const imgElement = img.cloneNode(true) as HTMLImageElement;
    imgElement.hidden = false;
    button.appendChild(imgElement);

    button.disabled = true;
    this.isXTurn = !this.isXTurn;
  }
}
