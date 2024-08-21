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

  public checkBigBoardWinning(): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        this.bigBoard[i][0] !== '' &&
        this.bigBoard[i][0] !== '-' &&
        this.bigBoard[i][0] === this.bigBoard[i][1] &&
        this.bigBoard[i][1] === this.bigBoard[i][2]
      ) {
        return true;
      }

      if (
        this.bigBoard[0][i] !== '' &&
        this.bigBoard[0][i] !== '-' &&
        this.bigBoard[0][i] === this.bigBoard[1][i] &&
        this.bigBoard[1][i] === this.bigBoard[2][i]
      ) {
        return true;
      }
    }

    if (
      this.bigBoard[0][0] !== '' &&
      this.bigBoard[0][0] !== '-' &&
      this.bigBoard[0][0] === this.bigBoard[1][1] &&
      this.bigBoard[1][1] === this.bigBoard[2][2]
    ) {
      return true;
    }

    if (
      this.bigBoard[0][2] !== '' &&
      this.bigBoard[0][2] !== '-' &&
      this.bigBoard[0][2] === this.bigBoard[1][1] &&
      this.bigBoard[1][1] === this.bigBoard[2][0]
    ) {
      return true;
    }

    return false;
  }

  public isBigBoardFull(): boolean {
    return this.bigBoard.every((row) => row.every((cell) => cell !== ''));
  }

  private fillBigBoard(
    boardNum: number,
    isXTurn: boolean,
    isTie: boolean
  ): void {
    const rowIndex = Math.floor(boardNum / 3);
    const colIndex = boardNum % 3;
    if (isTie) {
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
