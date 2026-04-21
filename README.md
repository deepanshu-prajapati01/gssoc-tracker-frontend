# GSSoC Tracker Frontend

A Next.js application for tracking contributions and leaderboard for GirlScript Summer of Code (GSSoC).

## Features

- Dashboard: View personal contribution statistics and progress
- Leaderboard: See top contributors and rankings
- Projects: Browse available projects for contribution
- Badges: Earn and display achievement badges
- Dark/Light theme support

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** Zustand
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/deepanshu-prajapati01/gssoc-tracker-frontend.git
cd gssoc-tracker-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (pages)/        # Main pages
│   ├── globals.css     # Global styles
│   └── layout.js       # Root layout
├── components/         # Reusable UI components
├── lib/               # Utilities and configurations
├── providers/         # Context providers
├── store/             # Zustand stores
└── utils/             # Helper functions
```

## Contributing

This project is part of GirlScript Summer of Code (GSSoC). Please follow the [GSSoC Contributor Guidelines](https://gssoc.girlscript.org/) when contributing.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with a clear description

## License

This project is licensed under the MIT License.
