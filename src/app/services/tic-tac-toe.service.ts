import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private bigBoard: string[][];
  private smallBoards: string[][][];

  constructor() {
    this.bigBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.smallBoards = [
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

  public checkBigBoardWinning(): number[] | null {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.bigBoard[i][0] !== '' &&
        this.bigBoard[i][0] !== '-' &&
        this.bigBoard[i][0] === this.bigBoard[i][1] &&
        this.bigBoard[i][1] === this.bigBoard[i][2]
      ) {
        return [i * 3, i * 3 + 1, i * 3 + 2]; // Row indices
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.bigBoard[0][i] !== '' &&
        this.bigBoard[0][i] !== '-' &&
        this.bigBoard[0][i] === this.bigBoard[1][i] &&
        this.bigBoard[1][i] === this.bigBoard[2][i]
      ) {
        return [i, i + 3, i + 6]; // Column indices
      }
    }

    // Check main diagonal (top-left to bottom-right)
    if (
      this.bigBoard[0][0] !== '' &&
      this.bigBoard[0][0] !== '-' &&
      this.bigBoard[0][0] === this.bigBoard[1][1] &&
      this.bigBoard[1][1] === this.bigBoard[2][2]
    ) {
      return [0, 4, 8]; // Main diagonal indices
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (
      this.bigBoard[0][2] !== '' &&
      this.bigBoard[0][2] !== '-' &&
      this.bigBoard[0][2] === this.bigBoard[1][1] &&
      this.bigBoard[1][1] === this.bigBoard[2][0]
    ) {
      return [2, 4, 6]; // Anti-diagonal indices
    }

    // No winner found
    return null;
  }

  public isBigBoardFull(): boolean {
    return this.bigBoard.every((row) => row.every((cell) => cell !== ''));
  }

  private fillBigBoard(
    boardNum: number,
    isXTurn: boolean,
    isDraw: boolean
  ): void {
    const rowIndex = Math.floor(boardNum / 3);
    const colIndex = boardNum % 3;
    if (isDraw) {
      this.bigBoard[rowIndex][colIndex] = '-';
    } else {
      this.bigBoard[rowIndex][colIndex] = isXTurn ? 'X' : 'O';
    }
  }

  public isBigBoardFilledAt(row: number, col: number): boolean {
    return this.bigBoard[row][col] !== '';
  }

  public checkSmallBoardWinning(
    boardNum: number,
    row: number,
    col: number,
    isXTurn: boolean
  ): boolean {
    this.smallBoards[boardNum][row][col] = isXTurn ? 'X' : 'O';

    for (let i = 0; i < 3; i++) {
      if (
        this.smallBoards[boardNum][i][0] === this.smallBoards[boardNum][i][1] &&
        this.smallBoards[boardNum][i][1] === this.smallBoards[boardNum][i][2] &&
        this.smallBoards[boardNum][i][0] !== ''
      ) {
        this.fillBigBoard(boardNum, isXTurn, false);
        return true;
      }

      if (
        this.smallBoards[boardNum][0][i] === this.smallBoards[boardNum][1][i] &&
        this.smallBoards[boardNum][1][i] === this.smallBoards[boardNum][2][i] &&
        this.smallBoards[boardNum][0][i] !== ''
      ) {
        this.fillBigBoard(boardNum, isXTurn, false);
        return true;
      }
    }

    if (
      this.smallBoards[boardNum][0][0] === this.smallBoards[boardNum][1][1] &&
      this.smallBoards[boardNum][1][1] === this.smallBoards[boardNum][2][2] &&
      this.smallBoards[boardNum][0][0] !== ''
    ) {
      this.fillBigBoard(boardNum, isXTurn, false);
      return true;
    }

    if (
      this.smallBoards[boardNum][0][2] === this.smallBoards[boardNum][1][1] &&
      this.smallBoards[boardNum][1][1] === this.smallBoards[boardNum][2][0] &&
      this.smallBoards[boardNum][0][2] !== ''
    ) {
      this.fillBigBoard(boardNum, isXTurn, false);
      return true;
    }

    return false;
  }

  public isSmallBoardFull(boardNum: number): boolean {
    if (
      this.smallBoards[boardNum].every((row) =>
        row.every((cell) => cell !== '')
      )
    ) {
      this.fillBigBoard(boardNum, false, true);
      return true;
    }
    return false;
  }
}
