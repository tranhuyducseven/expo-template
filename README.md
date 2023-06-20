# EXPO Template

> Helping when start new frontend project

This is Expo template, which support auto format with eslint and intergrate `husky` for code checking before commit. This will help in smooth out project building.

## Project detail

### Commands

- Run: `pnpm install` for install all packages
- Run: `pnpm build` for build your project
- Run: `pnpm start` for start your built project
- Run: `pnpm lint` for checking error and fix it

### Project structure

```
├── apis                # All apis come here
├── components          # All components that can share between screen
│   └── _template       # Template for component
├── configs             # All configs and constant goes here
├── hooks               # Custom hooks for project
├── layouts             # Layouts of screen and components
├── asserts              # Public folder, contain static files
├── screens             # Screen component goes here
├── services            # All services goes here
├── states              # State managerment for app
├── types               # App global type (Typescript)
└── utils               # App's utils
```

### Styling follows this repo: [react-native-atomic-style](https://github.com/tctien342/react-native-atomic-style)

### Some code rule

- Component that belong only to screen, should be placed on that screen's folder
- App's state should using Zutsand [docs](https://github.com/pmndrs/zustand)
- Function that can be used many time should place in utils or hooks if relate to state
- HOC placed in `layouts` have prefix `*HOC` like `AuthenticationHOC`
- Layout placed in `layouts` and have prefix `*Layout` like `MainLayout` or `DefaultLayout`
- All config export from configs folder should have export prefix `*Config` like `BaseConfig` or `ApiConfig`

## Tech included

- `Expo + Typescript` Base source
- `Husky` Git helper
- `SCSS modules` Style system
- `Eslint and Prettier` Rule of code

## Build app

```bash
eas build -p android --profile preview
```
