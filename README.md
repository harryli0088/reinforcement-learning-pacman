# Pac-Man Reinforcement Learning

https://harryli0088.github.io/reinforcement-learning-pacman/

![Screenshot](public/screenshot.png)

[<img src="fullReportButton.png" height="30"/>](public/138_HW3_Pac-Man_Harry_Li.pdf)

Built using Svelte (https://svelte.dev/) and TypeScript (https://www.typescriptlang.org/)

## Set up

1. Install NodeJS (I'm running v16.13.0) https://nodejs.org/en/download/.

2. Clone this repository and run `npm install`.

3. To run the Svelte web app, run `npm run dev`. This will start a development web server on http://localhost:5000/

4. To run the training, run `npm run train`. This script uses nodemon to watch your files and re-run if you make any file changes..


## Pac-Man

I converted Dale Harvey's implementation of Pac-Man (https://github.com/daleharvey/pacman) into TypeScript.

[TypeScript Implementation](/src/lib/pacman.ts)

## Reinforcement Learning
- [tree-search state-action encoding](/src/lib/train/treeSearch.ts)
- [n-step semi-gradient Sarsa for policy control](/src/lib/train/nStepSemiGradientSarsa.ts)
- [linear function approximation and gradient descent](/src/lib/train/linearQFunction.ts)
- [training script](/src/lib/train/train.ts)

## Why not Svelte Kit?

I initially tried using Svelte Kit to create this website, but they have a really annoying `"type": "module"` configuration in their `package.json` file that made it tedious to switch between Node.JS training and browser web development. After wasting a lot of time, I decided to just use regular Svelte.

## Deploying to Github Pages
1. Install gh-pages package
```
npm i -D gh-pages
```
2. Update ```package.json``` with these values
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d public"
  },
  "homepage": "."
}
```
3. Update imports in index.html to have a period in front of every path
```html
...
	<link rel='icon' type='image/png' href='./favicon.png'>
	<link rel='stylesheet' href='./global.css'>
	<link rel='stylesheet' href='./build/bundle.css'>

	<script defer src='./build/bundle.js'></script>
...
```
4. Run ```npm deploy``` whenever you want to deploy

## License

MIT License