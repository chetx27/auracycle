# 🌟 AuraCycle

A modern full-stack web application built with React, TypeScript, and Express. Features a sleek UI with 3D graphics capabilities and a robust backend infrastructure.

## ✨ Features

- 🎨 Modern UI with shadcn/ui components
- 🎭 Tailwind CSS for styling
- 🌐 Full-stack architecture with Express backend
- 🎯 TypeScript for type safety
- 🚀 Vite for lightning-fast development
- 🎪 Three.js integration for 3D graphics
- 📱 Responsive design
- 🔥 Hot module replacement in development
- ☁️ Netlify deployment ready

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router DOM
- TanStack Query
- Three.js & React Three Fiber
- Framer Motion

### Backend
- Express 5
- Node.js
- Serverless functions support
- CORS enabled

### Development Tools
- SWC for fast compilation
- Prettier for code formatting
- Vitest for testing
- pnpm for package management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- pnpm (v10.14.0 or higher)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/chetx27/auracycle.git
cd auracycle
```

### 2. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory (this file won't be committed):

```env
# Builder.io API Key (optional - remove if not using Builder.io)
VITE_PUBLIC_BUILDER_KEY=your_builder_io_key_here

# Custom environment variables
PING_MESSAGE="ping pong"
```

**Note:** If you're not using Builder.io, you can skip adding the `VITE_PUBLIC_BUILDER_KEY`.

### 5. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 🏗️ Build & Deployment

### Build for Production

```bash
pnpm build
```

This command will:
1. Build the client-side application
2. Build the server-side application

### Run Production Build Locally

```bash
pnpm start
```

### Deploy to Netlify

The project is pre-configured for Netlify deployment with:
- `netlify.toml` configuration file
- Serverless functions support
- Automatic build settings

Simply connect your GitHub repository to Netlify, and it will automatically deploy.

## 📁 Project Structure

```
auracycle/
├── client/              # Frontend React application
├── server/              # Backend Express server
├── shared/              # Shared utilities and types
├── public/              # Static assets
├── netlify/             # Netlify serverless functions
├── .builder/            # Builder.io configuration
├── dist/                # Production build output
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production (client + server) |
| `pnpm build:client` | Build only the client application |
| `pnpm build:server` | Build only the server application |
| `pnpm start` | Run production build |
| `pnpm test` | Run tests |
| `pnpm format.fix` | Format code with Prettier |
| `pnpm typecheck` | Run TypeScript type checking |

## 🎨 UI Components

This project uses shadcn/ui components with Radix UI primitives. Components include:
- Accordion, Alert Dialog, Avatar
- Buttons, Cards, Checkboxes
- Dialogs, Dropdowns, Forms
- Navigation, Popover, Progress
- Tables, Tabs, Tooltips
- And many more...

## 🔧 Configuration

### Tailwind CSS
Configured with custom theme, animations, and typography plugin. See `tailwind.config.ts`.

### TypeScript
Strict type checking enabled with path aliases configured. See `tsconfig.json`.

### Vite
Optimized build configuration with SWC for faster compilation. See `vite.config.ts`.

## 🧪 Testing

Run tests using Vitest:

```bash
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**chetx27**
- GitHub: [@chetx27](https://github.com/chetx27)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- 3D graphics powered by [Three.js](https://threejs.org/)

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/chetx27/auracycle/issues) on GitHub.

---

⭐ **Star this repository if you find it helpful!**
