# web

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Deployment
Please make sure docker and docker-compose are installed on your machine
```
- docker-compose up --build
- open http://localhost:8080 on your browser
```

# GuessGame: a 20 word game
This game is played between two players. The first player thinks of a word, the second player has to guess the word. The second player can ask up to 20 ‘Yes’ or ‘No’ questions, in order to guess that word. The player asking questions can only ask one question at a time, and at any time they can guess the word.
					
The game ends when either the second player guesses the word correctly, or after 20 questions have been asked and the correct word hasn’t been guessed.

This game takes the chat approach using /command for initiating command like slack.

You can chat as much as you want because it full chat application

##How to play
```
1. Create a player from the signup section
2. Login with the username you just created
3. There will be cards of players if other players are registered
4. Click on the challenge button to initiate a session with another player
5. Player 1 start a game by typing the command "/game WORD" where WORD is any word to be guessed by player 2 e.g /guess Lion
6. Player 2 can ask a question by typing the command /question e.g /question Are you married?
7. Player 1 can answer the question by typing the command /answer
8. Player 2 can guess the word at any time during the game with the command "/guess WORD" where word is his guess e.g /guess Lion
9. The game comes to an end when a guess is made and a winner is declared.
10. Player2 has a maximum of 20 questions
```
The Player who started the game becomes player1 and the other player2

<i>Created with love by benx</i>

