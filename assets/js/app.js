const lenis = new Lenis();

lenis.on('scroll', (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const cards = [
        {id : "#card-1", endTranslateX: -1500, rotate: 45 },
        {id : "#card-2", endTranslateX: -1500, rotate: -30 } ,
        {id : "#card-3", endTranslateX: -1500, rotate: 45 },
        {id : "#card-4", endTranslateX: -1500, rotate: -30 },
    ];

    ScrollTrigger.create({
        trigger: ".wrapper-hero",
        start: "top top",
        end: "+=900vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
            gsap.to(".wrapper-hero", {
                x: `${-350 * self.progress}vw`,
                duration: 0.5,
                ease: "power3.out",
            });
        },
    });



    cards.forEach((card) => {
        ScrollTrigger.create({
            trigger: "card.id",
            start: "top top",
            end: "+=1200vh",
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(card.id, {
                    x: `${card.endTranslateX * self.progress}px`,
                    rotate: `${card.rotate * self.progress}deg`,
                    duration: 0.5,
                    ease: "power3.out",
                });
            },
        });
    });

    const svgElement = document.querySelector('.main svg');

    gsap.set(svgElement, {
        scale: 1,
        y: 0,
        transformOrigin: "center center"
    });

    ScrollTrigger.create({
        trigger: svgElement,
        start: "top top",
        end: "+=1200vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
            const scale = 1 + self.progress * 6; 
            gsap.to(svgElement, {
                y: `${-100 * self.progress}vw`,
                scale: scale,
                duration: 1,
                ease: "power3.out",
            });
        },
    });
});

function game1() {
    return {
      board: Array(3).fill().map(() => Array(3).fill(null)),
      currentPlayer: 'X',
      message: 'Au joueur X de jouer ',
      makeMove1(row, col) {
        if (this.board[row][col] || this.message.includes('Victoire')) return;
        this.board[row][col] = this.currentPlayer;
        if (this.checkWin1(this.currentPlayer)) {
          this.message = `Le joueur ${this.currentPlayer} à gagner!`;
          return;
        }
        if (this.checkDraw1()) {
          this.message = "C'est une égaliter!";
          return;
        }
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.message = `Au joueur ${this.currentPlayer} de jouer`;
      },
      checkWin1(player) {
        const winningCombinations = [
          [[0, 0], [0, 1], [0, 2]],
          [[1, 0], [1, 1], [1, 2]],
          [[2, 0], [2, 1], [2, 2]],
          [[0, 0], [1, 0], [2, 0]],
          [[0, 1], [1, 1], [2, 1]],
          [[0, 2], [1, 2], [2, 2]],
          [[0, 0], [1, 1], [2, 2]],
          [[0, 2], [1, 1], [2, 0]],
        ];
        return winningCombinations.some(combination => {
          return combination.every(([row, col]) => {
            return this.board[row][col] === player;
          });
        });
      },
      checkDraw1() {
        return this.board.every(row => {
          return row.every(cell => {
            return cell !== null;
          });
        });
      },
      resetGame1() {
        this.board = Array(3).fill().map(() => Array(3).fill(null));
        this.currentPlayer = 'X';
        this.message = 'Au joueur X de jouer ';
      }
    }
  }

  function game2() {
    return {
      board: Array(6).fill().map(() => Array(7).fill(null)),
      currentPlayer: 'R',
      message: 'Au joueur Rouge de jouer',
      makeMove2(col) {
        if (this.message.includes('wins')) return;
        for (let row = 5; row >= 0; row--) {
          if (!this.board[row][col]) {
            this.board[row][col] = this.currentPlayer;
            if (this.checkWin2(this.currentPlayer, row, col)) {
              this.message = `Le joueur ${this.currentPlayer} à gagner!`;
              return;
            }
            if (this.checkDraw2()) {
              this.message = "C'est une égaliter!";
              return;
            }
            this.currentPlayer = this.currentPlayer === 'R' ? 'Y' : 'R';
            this.message = `C'est au tour du joueur${this.currentPlayer} de jouer`;
            return;
          }
        }
      },
      checkWin2(player, row, col) {
        const directions = [
          [0, 1],
          [1, 0],
          [1, 1],
          [1, -1]
        ];
        for (const [dx, dy] of directions) {
          let count = 1;
          for (let i = 1; i < 4; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;
            if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && this.board[newRow][newCol] === player) {
              count++;
            } else {
              break;
            }
          }
          for (let i = 1; i < 4; i++) {
            const newRow = row - i * dx;
            const newCol = col - i * dy;
            if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && this.board[newRow][newCol] === player) {
              count++;
            } else {
              break;
            }
          }
          if (count >= 4) {
            return true;
          }
        }
        return false;
      },
      checkDraw2() {
        return this.board.every(row => {
          return row.every(cell => {
            return cell !== null;
          });
        });
      },
      resetGame2() {
        this.board = Array(6).fill().map(() => Array(7).fill(null));
        this.currentPlayer = 'R';
        this.message = 'Au joueur Rouge de jouer';
      }
    }
  }

  function game3() {
    const smileys = ['😃', '😇', '😈', '🤪', '😋', '😜'];
    const cards = Array.from({ length: 12 }, (_, i) => ({ value: smileys[i % 6], flipped: false }));
    cards.sort(() => Math.random() - 0.5);
    return {
      board: Array.from({ length: 3 }, (_, i) => cards.slice(i * 4, (i + 1) * 4)),
      flippedCards: [],
      message: '',
      flipCard3(row, col) {
        if (this.flippedCards.length === 2 || this.board[row][col].flipped) return;
        this.board[row][col].flipped = true;
        this.flippedCards.push(this.board[row][col]);
        if (this.flippedCards.length === 2) {
          if (this.flippedCards[0].value === this.flippedCards[1].value) {
            this.message = 'Match!';
            this.flippedCards = [];
            if (this.checkWin3()) {
              this.message = 'Vous avez gagné!';
            }
          } else {
            setTimeout(() => {
              this.flippedCards.forEach(card => card.flipped = false);
              this.flippedCards = [];
              this.message = '';
            }, 1000);
          }
        }
      },
      checkWin3() {
        return this.board.every(row => {
          return row.every(cell => {
            return cell.flipped;
          });
        });
      },
      resetGame3() {
        const cards = Array.from({ length: 12 }, (_, i) => ({ value: smileys[i % 6], flipped: false }));
        cards.sort(() => Math.random() - 0.5);
        this.board = Array.from({ length: 3 }, (_, i) => cards.slice(i * 4, (i + 1) * 4));
        this.flippedCards = [];
        this.message = '';
      }
    }
  }

  function taskManager() {
    return {
        tasks: [],
        newTask: '',
        filter: 'all',
        addTask() {
            if (this.newTask !== '') {
                this.tasks.push({ id: Date.now(), text: this.newTask, completed: false });
                this.newTask = '';
            }
        },
        removeTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        },
        toggleTask(id) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
            }
        },
        get filteredTasks() {
            if (this.filter === 'all') {
                return this.tasks;
            } else if (this.filter === 'active') {
                return this.tasks.filter(task => !task.completed);
            } else if (this.filter === 'completed') {
                return this.tasks.filter(task => task.completed);
            }
        },
        get activeTasks() {
            return this.tasks.filter(task => !task.completed);
        },
        get completedTasks() {
            return this.tasks.filter(task => task.completed);
        }
    }
}