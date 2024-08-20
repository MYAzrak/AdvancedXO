import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private board: string[][][];

  constructor() {
    this.board = [
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    ];
  }

  public checkWinning(
    boardNum: number,
    row: number,
    col: number,
    isXTurn: boolean
  ): boolean {
    this.board[boardNum][row][col] = isXTurn ? 'X' : 'O';
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[boardNum][i][0] &&
        this.board[boardNum][i][0] === this.board[boardNum][i][1] &&
        this.board[boardNum][i][1] === this.board[boardNum][i][2]
      ) {
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
        return true;
      }
    }

    // Check main diagonal (top-left to bottom-right)
    if (
      this.board[boardNum][0][0] &&
      this.board[boardNum][0][0] === this.board[boardNum][1][1] &&
      this.board[boardNum][1][1] === this.board[boardNum][2][2]
    ) {
      return true;
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (
      this.board[boardNum][0][2] &&
      this.board[boardNum][0][2] === this.board[boardNum][1][1] &&
      this.board[boardNum][1][1] === this.board[boardNum][2][0]
    ) {
      return true;
    }

    // No winner yet
    return false;
  }

  public isBoardFull(boardNum: number): boolean {
    return this.board[boardNum].every((row) =>
      row.every((cell) => cell !== '')
    );
  }
}
