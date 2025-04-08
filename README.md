# GitHub Profile Analyzer

A modern React application to analyze GitHub users, visualize their activities, and explore repositories. Built with React, TypeScript, and Vite with a sleek UI powered by shadcn/ui components.

![GitHub Profile Analyzer Screenshot](https://github.com/user-attachments/assets/e2d7dfd1-e99f-4bc8-8913-640ecf911604)
g)

## Features

- 🔍 Search for any GitHub user by username
- 📊 View comprehensive user profile statistics
- 📈 Visualize commit activity with interactive charts
- 🌟 Track star/watching activity
- 🛠️ Monitor repo creation events
- 💻 Responsive design for all devices

## Live Demo

Check out the live demo [here](https://githubanalyser.vercel.app/)

## Tech Stack

- React 18
- TypeScript
- Vite
- shadcn/ui components
- Tailwind CSS
- Lucide React icons
- React hooks
- GitHub REST API

## Installation and Setup

### Prerequisites

- Node.js 18+ and npm
- GitHub Personal Access Token (for API access)

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/SwastikIIIT/githubanalyser.git
cd githubanalyser
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

> ⚠️ Never commit your `.env` file to version control!

4. **Start the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

## Deployment

### Deploying to Vercel

1. Fork this repository
2. Create an account on [Vercel](https://vercel.com) if you don't have one
3. Create a new project and import your GitHub repository
4. Add your GitHub token as an environment variable:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub personal access token
5. Deploy!

### Deploying to Netlify

1. Fork this repository
2. Create an account on [Netlify](https://netlify.com) if you don't have one
3. Create a new site and import your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add your GitHub token as an environment variable:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub personal access token
6. Deploy!

## Usage

1. Enter a GitHub username in the search box
2. Click "Analyze" or press Enter
3. Explore the user's profile information, repositories, and activity analytics
4. Navigate between tabs to view different aspects of the profile
5. Use pagination to browse through repositories

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

---

Created by [Swastik Sharma](https://github.com/SwastikIIIT)
