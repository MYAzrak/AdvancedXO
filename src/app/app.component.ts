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
  public gameResultMsg: string = '';

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

    // Flip turns
    this.isXTurn = !this.isXTurn;
  }

  private checkGameEnd(): void {
    if (this.ticTacToeService.checkBigBoardWinning()) {
      this.endGame(`${this.isXTurn ? 'X' : 'O'} won!`);
      this.showPlayAgainBtn();
    } else if (this.ticTacToeService.isBigBoardFull()) {
      this.endGame("It's a tie!");
      this.showPlayAgainBtn();
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
    this.gameResultMsg = message;
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

  private showPlayAgainBtn(): void {
    try {
      const playAgainBtn = document.getElementById('play-again');
      if (playAgainBtn) {
        playAgainBtn.hidden = false;
      } else {
        throw new Error('Play Again button not found');
      }
    } catch (err) {
      console.error('Error: Play Again button is null or not found.', err);
    }
  }

  public playAgain(): void {
    location.reload();
  }

  private blockBoard(boardNum: number): void {
    const smallBoard = document.getElementById(`board-${boardNum}`);
    if (smallBoard) {
      smallBoard.classList.add('blocked-board');

      // Disable buttons
      const buttons = smallBoard.getElementsByTagName('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }

  private unblockBoard(boardNum: number): void {
    const smallBoard = document.getElementById(`board-${boardNum}`);
    if (smallBoard) {
      smallBoard.classList.remove('blocked-board');

      // Enable buttons
      const buttons = smallBoard.getElementsByTagName('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
      }
    } else {
      console.error(`Board-${boardNum} not found.`);
    }
  }
}
