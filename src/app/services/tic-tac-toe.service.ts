import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private readonly xImage: HTMLImageElement = document.createElement('img');
  private readonly oImage: HTMLImageElement = document.createElement('img');
  private isXTurn: boolean = true;
  private board: string[][][];
  private gameResult = new Subject<string>();
  public message$: Observable<string> = this.gameResult.asObservable();
  private isGameDone = new BehaviorSubject<boolean>(false);
  public gameState$: Observable<boolean> = this.isGameDone.asObservable();

  constructor() {
    this.xImage.src = '../assets/images/X.svg';
    this.oImage.src = '../assets/images/O.svg';
    this.board = [
      // Board 0
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 1
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 2
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 3
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 4
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 5
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 6
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 7
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      // Board 8
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    ];
  }

  public drawShape(
    boardNum: number,
    row: number,
    col: number,
    button: HTMLButtonElement
  ): void {
    if (button.hasChildNodes()) return;

    const img = this.isXTurn ? this.xImage : this.oImage;
    const imgElement = img.cloneNode(true) as HTMLImageElement;
    imgElement.hidden = false;
    button.appendChild(imgElement);
    button.disabled = true;

    this.board[boardNum][row][col] = this.isXTurn ? 'X' : 'O';
    if (this.checkWinning(boardNum)) {
      this.endGame(`${this.board[boardNum][row][col]} won!`);
    } else if (this.isBoardFull(boardNum)) {
      this.endGame("It's a tie!");
    }

    this.isXTurn = !this.isXTurn;
  }

  private checkWinning(boardNum: number): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[boardNum][i][0] &&
        this.board[boardNum][i][0] === this.board[boardNum][i][1] &&
        this.board[boardNum][i][1] === this.board[boardNum][i][2]
      ) {
        this.isGameDone.next(true);
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[boardNum][0][i] &&
        this.board[boardNum][0][i] === this.board[boardNum][1][i] &&
        this.board[boardNum][1][i] === this.board[boardNum][2][i]
      ) {
        this.isGameDone.next(true);
        return true;
      }
    }

    // Check main diagonal (top-left to bottom-right)
    if (
      this.board[boardNum][0][0] &&
      this.board[boardNum][0][0] === this.board[boardNum][1][1] &&
      this.board[boardNum][1][1] === this.board[boardNum][2][2]
    ) {
      this.isGameDone.next(true);
      return true;
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (
      this.board[boardNum][0][2] &&
      this.board[boardNum][0][2] === this.board[boardNum][1][1] &&
      this.board[boardNum][1][1] === this.board[boardNum][2][0]
    ) {
      this.isGameDone.next(true);
      return true;
    }

    // No winner yet
    return false;
  }

  private isBoardFull(boardNum: number): boolean {
    return this.board[boardNum].every((row) =>
      row.every((cell) => cell !== '')
    );
  }

  private endGame(message: string): void {
    const canvas = document.createElement('canvas');
    this.styleCanvas(canvas);
    document.body.appendChild(canvas);
    this.gameResult.next(message);
  }

  private styleCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
  }
}
