import * as vscode from 'vscode';
import { analyzeJson } from './analyzer';
import { createReportWebview } from './webview';
import { JsonCodeLensProvider } from './codelensProvider';
import { updateDecorations } from './decorations';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "rich-json" is now active!');

    // Register CodeLens Provider
    const codeLensProvider = new JsonCodeLensProvider();
    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider('json', codeLensProvider)
    );

    // Register Decoration Triggers
    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        triggerUpdateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    var timeout: NodeJS.Timer | undefined = undefined;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        timeout = setTimeout(() => {
            if (activeEditor) {
                updateDecorations(activeEditor);
            }
        }, 100);
    }

    // Register Format Command
    let formatDisposable = vscode.commands.registerCommand('rich-json.format', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            try {
                const json = JSON.parse(text);
                const formatted = JSON.stringify(json, null, 4);

                editor.edit(editBuilder => {
                    const fullRange = new vscode.Range(
                        document.positionAt(0),
                        document.positionAt(text.length)
                    );
                    editBuilder.replace(fullRange, formatted);
                });
            } catch (e: any) {
                vscode.window.showErrorMessage('Invalid JSON: ' + e.message);
            }
        }
    });

    // Register Analyze Command
    let analyzeDisposable = vscode.commands.registerCommand('rich-json.analyze', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = editor.document.getText();
            const stats = analyzeJson(text);

            const panel = vscode.window.createWebviewPanel(
                'jsonAnalysis',
                'JSON Analysis',
                vscode.ViewColumn.Beside,
                {}
            );

            createReportWebview(panel, stats);
        }
    });

    // Register DocumentFormattingEditProvider
    let docFormatDisposable = vscode.languages.registerDocumentFormattingEditProvider('json', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const text = document.getText();
            try {
                const json = JSON.parse(text);
                const formatted = JSON.stringify(json, null, 4);
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(text.length)
                );
                return [vscode.TextEdit.replace(fullRange, formatted)];
            } catch (e) {
                return [];
            }
        }
    });

    context.subscriptions.push(formatDisposable);
    context.subscriptions.push(analyzeDisposable);
    context.subscriptions.push(docFormatDisposable);
}

export function deactivate() { }
