# AdvancedXO

An advanced Tic Tac Toe Angular project hosted on firebase.

## Game Explanation

Welcome to Ultimate Tic-Tac-Toe! This advanced game is played by two players on a large Tic-Tac-Toe board made up of nine smaller boards. Players take turns marking X's and O's, aiming to win the small boards to ultimately claim three in a row on the large board. The twist? Where you play on the small board determines where your opponent must play next. Win the game by being the first to get three in a row on the large board. If a small board is already won, the player can move anywhere. If no one achieves three in a row on the large board, the game ends in a tie.
![image](https://github.com/user-attachments/assets/43c2eb64-5758-4698-b6bb-a8782d29db57)

## Prerequisites

- Node.js and npm (Node Package Manager)
- Angular CLI

## Installation

1. Clone the repository:

   ```sh
   git clone <repo-link>
   ```

2. Navigate to the project directory:

   ```sh
   cd XOMasters
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

## Running the Application

To start the development server, run:

```text
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Hosting and Deployment

- The application is hosted on Firebase and can be accessed at: <https://xomasters.web.app/>.
- The project is integrated with Firebase for CI/CD, ensuring that any changes pushed to the main branch are automatically deployed to the live site.
- The CI/CD pipeline is set up using GitHub Actions. This automates the build, test, and deployment process, making sure that the application is always up-to-date.

## To-Do List

- Adding online multiplayer option.
