# Scryfall Personal

A simple offline deck builder for Magic: The Gathering that uses the Scryfall API to search for cards.

## Description

This project provides a clean and intuitive UI for creating MTG decks and searching cards from Scryfall. Built with Vite, React, and TypeScript, it offers a responsive and fast user experience.

This is a personal learning project based on [Koakovski's Scryfall Personal](https://github.com/Koakovski/Scryfall_Personal/) repository, the goal is to learn with each other while implementing the same set of features.

Implementation choices and approaches in this project are personal preferences and may evolve over time as I learn and adapt to new techniques and patterns.

## Features

- Search cards from Scryfall API
- Build and save decks locally
- Offline functionality
- Modern, responsive UI

## Installation

```bash
# Clone the repository
git clone https://github.com/JohnC0de/scryfall-personal.git
cd scryfall-personal

# Install dependencies
bun i

# Start development server
bun dev
```

## Usage

1. Search for cards using the search bar
2. Add cards to your deck
3. Save your deck locally

## Tech Stack

- Vite - Build tool
- React 19 - UI library
- TypeScript - Type safety
- Tailwind CSS - Utility-first styling
- Shadcn - Accessible UI components
- Tanstack Query - Data fetching/caching
- Tanstack Router - Type-safe routing with file-based routes
- Zustand - State management
- Zod - Schema validation
- Axios - API client

These libraries were chosen for their ability to support rapid development in a small-scope project while maintaining code quality and developer experience. Alternative libraries could be substituted based on project needs, but these provide a solid foundation for agile development with compact, maintainable code.

The primary goal is to maintain excellent developer experience (DX) while enabling fast-paced development using well-established tools that allow for quick iterations and agile changes.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Developed alongside [Koakovski's Scryfall Personal](https://github.com/Koakovski/Scryfall_Personal/)
- Card data provided by [Scryfall API](https://scryfall.com/docs/api)
