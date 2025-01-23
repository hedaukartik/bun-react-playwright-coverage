<br/>
<br/>
<p align="center" style="box-shadow: 2px">
  <a href="https://react.dev/" rel="noopener" target="_blank" ><img width="200" src="https://github.com/hedaukartik/bun-react-csr-base/assets/35377972/5f7fac52-5225-4bb2-83a9-1c597d51cebc" alt="react"></a>
  <a href="https://bun.sh/" rel="noopener" target="_blank" ><img width="200" src="https://bun.sh/logo-square.png" alt="bun"></a>
  <a href="https://playwright.dev/" rel="noopener" target="_blank" ><img width="200" src="https://playwright.dev/img/playwright-logo.svg" alt="playwright"></a>
</p>

<h1 align="center">Bun CSR React App Playwright Coverage</h1>

<div align="center">

This repository demonstrates building a React app using Bun, with code coverage generated using the bun-plugin-istanbul. The app is served using bun.serve, and tests are executed with Playwright. Post-test execution, a script generates code coverage data.

`bun` `react` `csr` `typescript` `react-router-dom-v6` `playwright` `nyc` `bun-plugin-istanbul` `code-coverage`

</div>

## Features

- *React App with Bun:* Using Bun as the runtime and bundler for fast builds and server starts.

- *Code Coverage with bun-plugin-istanbul:* Instrumentation for code coverage during tests.

- *Testing with Playwright:* End-to-end testing with Playwright.

- *Coverage Report Generation:* Script to generate a complete coverage report.

## You need `bun` installed in your system for this template:

```bash
curl -fsSL https://bun.sh/install | bash # for macOS, Linux, and WSL
```

### To use this template to start a new react client-side rendering project from scratch:

```bash
bun create https://github.com/hedaukartik/bun-react-playwright-coverage name-of-your-project
```

### To install dependencies:

```bash
bun install
```

### To run app:

```bash
bun dev
```

### To run playwright test:

```bash
bun run test:e2e
```

### To generate code coverage after running playwright test:

```bash
bun run test:e2e:generate:coverage
```

### To view the html code coverage report after generating:

```bash
bun run test:e2e:generate:show-report
```

![image](https://github.com/user-attachments/assets/6b592465-1532-4d7c-89ae-35f2c35edcff)


## Contributing
Contributions are welcome! If you have ideas for improvements or want to report issues, feel free to open an issue or a pull request.

