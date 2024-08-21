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

    // TicTacPro logic
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

  private checkGameEnd(): void {
    if (this.ticTacToeService.checkBigBoardWinning()) {
      this.endGame(`${this.isXTurn ? 'X' : 'O'} won!`);
      this.gameEnded = true;
    } else if (this.ticTacToeService.isBigBoardFull()) {
      this.endGame("It's a tie!");
      this.gameEnded = true;
    }
  }

  private drawInBigBoard(boardNum: number, isTie: boolean): void {
    let img: HTMLImageElement;
    if (isTie) {
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
    const canvas = document.createElement('canvas');
    this.styleCanvas(canvas);
    document.body.appendChild(canvas);
    this.gameMsg = message;
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
        console.error(`Canvas not found on Board-${boardNum}.`);
      }
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }
}
