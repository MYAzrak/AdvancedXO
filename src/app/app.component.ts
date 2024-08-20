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
  public gameResult: string = '';
  public isGameFinished: boolean = false;

  constructor(private ticTacToeService: TicTacToeService) {}

  ngOnInit() {
    this.ticTacToeServiceSubscription();
    this.drawBigX(2);
  }

  private drawBigX(boardNum: number) {
    const xImage: HTMLImageElement = document.createElement('img');
    xImage.src = '../assets/images/X.svg';
    xImage.style.position = 'absolute';
    xImage.style.background = '#f1f1f1';
    xImage.style.border = '3px solid black';
    xImage.style.height = '100%';

    const smallBoard = document.getElementById(`board-${boardNum}`);
    smallBoard!.appendChild(xImage);
  }

  private ticTacToeServiceSubscription(): void {
    this.ticTacToeService.message$.subscribe((message) => {
      this.gameResult = message;
    });

    this.ticTacToeService.gameState$.subscribe((state) => {
      this.isGameFinished = state;
    });
  }

  public drawShape(
    boardNum: number,
    row: number,
    col: number,
    event: Event
  ): void {
    const button = event.target as HTMLButtonElement;
    this.ticTacToeService.drawShape(boardNum, row, col, button);
  }

  public playAgain(): void {
    location.reload();
  }
}
