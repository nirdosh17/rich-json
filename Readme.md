# Rich JSON

A simple VS Code plugin that formats JSON and shows extra details like JSON size, item/field counts, errors, etc.

Commands are available under prefix `Rich JSON` in the Command Palette. e.g. `Rich JSON: Format` and `Rich JSON: Analyze`.

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
    - Open the Command Palette: `CMD/Ctrl + Shift + P`
    - `Extensions: Install from VSIX...`
    - Select the `.vsix` file.

## Usage
<p align="center">
  <img src="https://github.com/user-attachments/assets/6a68e5a8-ecc7-427b-aace-07d7d037cc8e" alt="plugin-demo" />
</p>


## Contributing
Something missing? Found a bug? Create a pull request or an issue. [GitHub](https://github.com/nirdosh17/rich-json)
