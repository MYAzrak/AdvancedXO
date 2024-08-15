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
  constructor(private ticTacToeService: TicTacToeService) {}

  public drawShape(row: number, col: number, event: Event): void {
    const button = event.target as HTMLButtonElement;
    this.ticTacToeService.drawShape(row, col, button);
  }
}
