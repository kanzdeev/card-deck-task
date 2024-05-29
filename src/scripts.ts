// klasa karty
class Card {
    value: string;
    suit: string;
    element: HTMLDivElement;

    // konstruktor karty
    constructor(value: string, suit: string) {
        this.value = value;
        this.suit = suit;
        this.element = this.createElement();
    }

    // metoda tworząca elem z  karta
    private createElement(): HTMLDivElement {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-value', this.value);
        card.setAttribute('data-suit', this.suit);
        card.addEventListener('click', this.toggleFlip.bind(this));
        return card;
    }

    // metoda z animacja
    private toggleFlip(): void {
        this.element.classList.toggle('flipped');
    }

    // metoda z odkrywaniem karty
    reveal(): void {
        this.element.classList.add('flipped');
    }

    // metoda z zakryciem karty
    hide(): void {
        this.element.classList.remove('flipped');
    }
}

// klasa z deckiem
class Deck {
    suits: string[] = ['hearts', 'spades', 'diamonds', 'clubs'];
    values: string[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
        'A',
    ];
    element: HTMLDivElement;
    cards: Card[] = [];

    // konstruktor decku
    constructor(element: HTMLDivElement) {
        this.element = element;
        this.initializeDeck();
    }

    // metoda inicjalizujaca deck
    private initializeDeck(): void {
        this.suits.forEach((suit) => {
            this.values.forEach((value) => {
                const card = new Card(value, suit);
                this.cards.push(card);
                this.element.appendChild(card.element);
            });
        });
    }

    // metoda odkrywajaca wszystkie karty
    revealAll(): void {
        this.cards.forEach((card) => {
            card.reveal();
        });
    }

    // metoda ukrywajaca wszystkie karty
    hideAll(): void {
        this.cards.forEach((card) => {
            card.hide();
        });
    }

    // metoda losujaca jedną karte
    drawCard(): void {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const randomCard = this.cards[randomIndex];
        randomCard.reveal();
    }
}

// punkt wejscia
document.addEventListener('DOMContentLoaded', () => {
    const deckElement = document.querySelector('.deck') as HTMLDivElement;
    const revealAllButton = document.querySelector(
        '#revealAll'
    ) as HTMLButtonElement;
    const hideAllButton = document.querySelector(
        '#hideAll'
    ) as HTMLButtonElement;
    const drawCardButton = document.querySelector(
        '#drawCard'
    ) as HTMLButtonElement;

    // jestli elem decku nie istnieje wtedy go tworzy
    if (deckElement) {
        const deck = new Deck(deckElement);

        // obsluga przycisku ktory odkrywa wszystkie karty
        if (revealAllButton) {
            revealAllButton.addEventListener('click', () => {
                deck.revealAll();
            });
        }

        // obsluga przycisku ktory ukrywa wszystkie karty
        if (hideAllButton) {
            hideAllButton.addEventListener('click', () => {
                deck.hideAll();
            });
        }

        // obsluga przycisku ktora losuje jedna karte
        if (drawCardButton) {
            drawCardButton.addEventListener('click', () => {
                deck.drawCard();
            });
        }
    }
});
