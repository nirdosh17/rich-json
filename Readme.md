# Rich JSON

A VS Code extension that formats and analyzes JSON files, showing errors and useful statistics.

## Available Commands

- `Rich JSON: Format`: Format the JSON in the active editor.
- `Rich JSON: Analyze`: Analyze the JSON in the active editor and display errors and statistics like file size, item counts, etc.

## Development
- Clone the repository
    ```bash
    git clone https://github.com/nirdosh17/rich-json.git
    ```
- Install dependencies:
    ```bash
    npm install
    ```
- Open the project in VS Code:
    ```bash
    code .
    ```
- Press `F5` to open a new VS Code window with the extension loaded.

## Installation
This extension is not yet published to the VS Code Marketplace. You can install it by following the steps below:
1. Clone the repository
    ```bash
    git clone https://github.com/nirdosh17/rich-json.git
    ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Package the extension
    ```bash
    npm run package
    ```
    This will create a `.vsix` file in the root of the project. e.g. `rich-json-0.0.1.vsix`
4. Install the extension from the `.vsix` file.
    `CMD + Shift + P`(Mac) or `Ctrl+Shift+P`(Windows/Linux) -> `Extensions: Install from VSIX...` -> Select the `.vsix` file.

## Usage

- Open any `.json` file.
- Use `Cmd+Shift+P`(Mac) or `Ctrl+Shift+P`(Windows/Linux) to open the Command Palette.
- Type `Rich JSON: Format` to format the document.
- Type `Rich JSON: Analyze` to see statistics and errors.

## Contributing
Something missing? Found a bug? - Create a pull request or an issue. [Github](https://github.com/nirdosh17/rich-json)
