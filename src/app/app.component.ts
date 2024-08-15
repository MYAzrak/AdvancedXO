import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicTacToeService } from './services/tic-tac-toe.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('X', { static: true }) xImage!: ElementRef<HTMLImageElement>;
  @ViewChild('O', { static: true }) oImage!: ElementRef<HTMLImageElement>;

  constructor(private ticTacToeService: TicTacToeService) {}

  ngAfterViewInit(): void {
    this.addEventListeners();
  }

  private addEventListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', (event) => {
        this.ticTacToeService.drawShape(event.target as HTMLButtonElement);
      });
    });
  }
}
