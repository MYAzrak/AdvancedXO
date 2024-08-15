import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private readonly xImage: HTMLImageElement = document.createElement('img');
  private readonly oImage: HTMLImageElement = document.createElement('img');
  private isXTurn: boolean = true;
  private board: string[][];

  constructor() {
    this.xImage.src = '../assets/images/X.svg';
    this.oImage.src = '../assets/images/O.svg';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  public drawShape(row: number, col: number, button: HTMLButtonElement): void {
    if (button.hasChildNodes()) return;

    const img = this.isXTurn ? this.xImage : this.oImage;
    const imgElement = img.cloneNode(true) as HTMLImageElement;
    imgElement.hidden = false;
    button.appendChild(imgElement);
    button.disabled = true;

    this.board[row][col] = this.isXTurn ? 'X' : 'O';
    if (this.checkWinning()) {
      this.endGame(`${this.board[row][col]} won!`);
    } else if (this.isBoardFull()) {
      this.endGame("It's a tie!");
    }

    this.isXTurn = !this.isXTurn;
  }

  private checkWinning(): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        return true;
      }
    }

    // Check main diagonal (top-left to bottom-right)
    if (
      this.board[0][0] &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return true;
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (
      this.board[0][2] &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return true;
    }

    // No winner yet
    return false;
  }

  private isBoardFull(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ''));
  }

  private endGame(message: string): void {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1000';
    canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    // Get the canvas context to draw on it
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = 'white';
      context.font = '48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Draw the message in the middle of the screen
      context.fillText(message, canvas.width / 2, canvas.height / 2);
    }
  }
}
