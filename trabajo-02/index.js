class MemoryGame extends Phaser.Scene {
  constructor() {
    super({ key: 'MemoryGame' });
    this.cards = [];
    this.flippedCards = [];
    this.cardScale = 1.5; // Ajusta este valor para cambiar el nivel de zoom
  }

  preload() {
    // Cargar imágenes aquí
    this.load.image('card1', '1.png');
    this.load.image('card2', '2.webp');
    this.load.image('card3', '3.png');
    this.load.image('card4', '4.png');
    this.load.image('card5', '5.jpg');
    this.load.image('card6', '6.jpeg');
    this.load.image('card7', '7.webp');
    this.load.image('card8', '8.png');
  }

  create() {
    this.generateCards();
    this.cards = Phaser.Math.RND.shuffle(this.cards);
    this.renderCards();
  }

  generateCards() {
    const cardData = [
      'card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8',
    ];

    this.cards = cardData.concat(cardData);

    this.cards = this.cards.map(cardName => ({
      name: cardName,
      sprite: this.add.image(0, 0, cardName).setInteractive(),
      flipped: false,
      originalScale: 1, // Nuevo campo para almacenar la escala original
    }));

    this.input.on('gameobjectup', (pointer, cardSprite) => {
      const card = this.cards.find(c => c.sprite === cardSprite);
      this.flipCard(card);
    });
  }

  renderCards() {
    const columns = 4;
    const rows = this.cards.length / columns;
    const cardWidth = this.sys.canvas.width / columns;
    const cardHeight = this.sys.canvas.height / rows;

    this.cards.forEach((card, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;

      const x = col * cardWidth + cardWidth / 2;
      const y = row * cardHeight + cardHeight / 2;

      card.sprite.setPosition(x, y);
      card.sprite.setDisplaySize(cardWidth, cardHeight);
      card.originalScale = card.sprite.scale; // Almacenar la escala original
    });
  }

  flipCard(card) {
    if (!card.flipped && this.flippedCards.length < 2) {
      card.sprite.setScale(this.cardScale);
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.name === card2.name) {
      this.removeMatchedCards();
      console.log('Match!');
    } else {
      this.time.delayedCall(1000, () => {
        this.resetFlippedCards();
      });
    }
  }

  removeMatchedCards() {
    this.flippedCards.forEach(card => {
      card.sprite.destroy();
    });

    this.cards = this.cards.filter(card => !this.flippedCards.includes(card));
    this.flippedCards = [];

    if (this.cards.length === 0) {
      console.log('¡Has ganado!');
      // Aquí puedes agregar más acciones para cuando el juego se complete
    }
  }

  resetFlippedCards() {
    this.flippedCards.forEach(card => {
      card.flipped = false;
      card.sprite.setScale(card.originalScale); // Restaurar la escala original
    });

    this.flippedCards = [];
  }
}

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  scene: MemoryGame,
};

const game = new Phaser.Game(config);


