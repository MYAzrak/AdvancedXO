import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicTacToeService } from './services/tic-tac-toe.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly xImage: HTMLImageElement = document.createElement('img');
  private readonly oImage: HTMLImageElement = document.createElement('img');
  private readonly minusImage: HTMLImageElement = document.createElement('img');
  private isXTurn: boolean = true;
  public gameMsg: string = 'X Turn';
  private gameEnded: boolean = false;
  public unblockedBoardNum: number = 0;

  constructor(private ticTacToeService: TicTacToeService) {
    this.xImage.src = '../assets/images/X.svg';
    this.oImage.src = '../assets/images/O.svg';
    this.minusImage.src = '../assets/images/minus.svg';
  }

  private markAsWinningBoard(boardNum: number): void {
    const winningBoard = document.getElementById(`board-${boardNum}`);
    if (winningBoard) {
      const img = winningBoard.getElementsByClassName(
        'big-image'
      ) as HTMLCollectionOf<HTMLImageElement>;
      if (img.length > 0) {
        img[0].style.backgroundColor = '#99ff99';
        img[0].style.border = '3px solid #006400';
      } else {
        console.error(`Image in board-${boardNum} not found.`);
      }
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }

  private checkGameEnd(): void {
    const winningBoardsNumbers = this.ticTacToeService.checkBigBoardWinning();
    if (winningBoardsNumbers) {
      for (let boardNum of winningBoardsNumbers) {
        setTimeout(() => {
          this.markAsWinningBoard(boardNum);
        }, 1);
      }
      this.endGame(`${this.isXTurn ? 'X' : 'O'} won!`);
      this.gameEnded = true;
    } else if (this.ticTacToeService.isBigBoardFull()) {
      this.endGame('Draw!');
      this.gameEnded = true;
    }
  }

  public drawInSmallBoard(
    boardNum: number,
    row: number,
    col: number,
    event: Event
  ): void {
    const button = event.target as HTMLButtonElement;

    // Add the X/O image & disable that button
    const img = this.isXTurn ? this.xImage : this.oImage;
    const imgClone = img.cloneNode(true) as HTMLImageElement;
    button.appendChild(imgClone);
    button.disabled = true;

    if (
      this.ticTacToeService.checkSmallBoardWinning(
        boardNum,
        row,
        col,
        this.isXTurn
      )
    ) {
      this.drawInBigBoard(boardNum, false);
      this.checkGameEnd();
    } else if (this.ticTacToeService.isSmallBoardFull(boardNum)) {
      this.drawInBigBoard(boardNum, true);
      this.checkGameEnd();
    }

    // XOMasters logic
    if (this.ticTacToeService.isBigBoardFilledAt(row, col)) {
      for (let i = 0; i < 9; i++) {
        this.unblockBoard(i);
      }
    } else {
      this.unblockedBoardNum = row * 3 + col;
      for (let i = 0; i < 9; i++) {
        if (i === this.unblockedBoardNum)
          this.unblockBoard(this.unblockedBoardNum);
        else this.blockBoard(i);
      }
    }

    // Flip turns
    this.isXTurn = !this.isXTurn;
    if (!this.gameEnded) this.gameMsg = `${this.isXTurn ? 'X' : 'O'} Turn`;
  }

  private drawInBigBoard(boardNum: number, isDraw: boolean): void {
    let img: HTMLImageElement;
    if (isDraw) {
      img = this.minusImage;
    } else {
      img = this.isXTurn ? this.xImage : this.oImage;
    }

    const imgClone = img.cloneNode(true) as HTMLImageElement;
    this.styleImg(imgClone);

    const smallBoard = document.getElementById(`board-${boardNum}`);
    if (smallBoard) {
      smallBoard.appendChild(imgClone);
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }

  private endGame(message: string): void {
    const boards = document.getElementsByClassName(
      'blocked-board'
    ) as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < boards.length; i++) {
      boards[i].classList.remove('blocked-board');
    }
    const canvas = document.createElement('canvas');
    this.styleCanvas(canvas);
    document.body.appendChild(canvas);
    this.styleMsg(message);
    this.stylePlayAgainButton();
  }

  private styleMsg(message: string): void {
    this.gameMsg = message;
    const msgElement = document.getElementById('game-result');
    if (msgElement) {
      msgElement.style.color = '#006400';
    } else {
      console.error('Message element not found.');
    }
  }

  private stylePlayAgainButton(): void {
    const button = document.getElementById('play-again');
    if (button) {
      button.style.backgroundColor = '#b8ffb8';
      button.style.borderColor = '#006400';

      // Change hover
      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#99ff99';
      });

      // Reset to original green when the mouse leaves the button
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#b8ffb8';
      });
    } else {
      console.error('Button with id "play-again" not found.');
    }
  }

  private styleCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
  }

  private styleImg(img: HTMLImageElement): void {
    img.style.position = 'absolute';
    img.style.background = '#f1f1f1';
    img.style.border = '3px solid black';
    img.style.boxSizing = 'border-box';
    img.style.height = '100%';
    img.classList.add('big-image');
  }

  public playAgain(): void {
    location.reload();
  }

  private blockBoard(boardNum: number): void {
    const smallBoard = document.getElementById(`board-${boardNum}`);
    if (smallBoard) {
      smallBoard.classList.add('blocked-board');

      // Draw a temporary canvas on that board
      const canvas = document.createElement('canvas');
      canvas.width = smallBoard.clientWidth;
      canvas.height = smallBoard.clientHeight;

      // Position the canvas over the small board
      canvas.style.position = 'absolute';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '1';
      smallBoard.appendChild(canvas);
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }

  private unblockBoard(boardNum: number): void {
    const smallBoard = document.getElementById(`board-${boardNum}`);
    if (smallBoard) {
      smallBoard.classList.remove('blocked-board');
      // Find and remove the canvas element
      const canvases = smallBoard.querySelectorAll('canvas');
      if (canvases.length > 0) {
        canvases.forEach((canvas) => smallBoard.removeChild(canvas));
      } else {
      }
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }
}
