# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# UAssistant

As part of my education at Brigham Young University-Idaho, I took upon myself this project, which is meant to be a web application for use in drug testing. While attending school, I took on a few different jobs, one of which took place at the Jefferson County Probation Department in Rigby, Idaho. As part of my job, I would perform a UA test to several individuals for various controlled and illicit substances, ranging from prescription medications that are prone to abuse (such as morphine or amphetamines), to dangerous, illegal substances like cocaine or methamphetamine.

Upon leaving the department for an internship in backend software development, I had an idea for a project that could double as my senior project and a helpful application for others who worked at the department. That's where this project comes in. This project is designed to help make the paperwork process of the drug testing program easier by automating it.

## Color Palette

The palette can be found [here](https://coolors.co/78c0e0-449dd1-192bc2-150578-0e0e52).