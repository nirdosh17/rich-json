import * as vscode from 'vscode';
import * as jsonc from 'jsonc-parser';

const decorationType = vscode.window.createTextEditorDecorationType({
    after: {
        margin: '0 0 0 1em',
        color: new vscode.ThemeColor('editorCodeLens.foreground'),
        fontStyle: 'italic',
        textDecoration: 'none; font-size: 0.8em; opacity: 0.7'
    },
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen
});

const errorDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor('diffEditor.removedTextBackground'),
    isWholeLine: true,
    overviewRulerColor: new vscode.ThemeColor('editorError.foreground'),
    overviewRulerLane: vscode.OverviewRulerLane.Right
});

export function updateDecorations(editor: vscode.TextEditor) {
    if (editor.document.languageId !== 'json') {
        return;
    }

    const text = editor.document.getText();
    const decorations: vscode.DecorationOptions[] = [];
    const errorDecorations: vscode.DecorationOptions[] = [];
    const errors: jsonc.ParseError[] = [];

    // Single pass: Get Tree and Errors
    const tree = jsonc.parseTree(text, errors);

    if (tree) {
        traverse(tree, editor.document, decorations);
    }

    if (errors.length > 0) {
        errors.forEach(error => {
            const startPos = editor.document.positionAt(error.offset);
            const endPos = editor.document.positionAt(error.offset + error.length);
            const range = new vscode.Range(startPos, endPos);
            errorDecorations.push({ range });
        });
    }

    editor.setDecorations(decorationType, decorations);
    editor.setDecorations(errorDecorationType, errorDecorations);
}

function traverse(node: jsonc.Node, document: vscode.TextDocument, decorations: vscode.DecorationOptions[]) {
    if (node.type === 'object') {
        const keyCount = node.children ? node.children.length : 0;
        if (keyCount > 0) {
            // Find the line where the object starts
            const startPos = document.positionAt(node.offset);
            const endPos = document.lineAt(startPos.line).range.end;

            decorations.push({
                range: new vscode.Range(endPos, endPos),
                renderOptions: {
                    after: {
                        contentText: ` ${keyCount} field${keyCount === 1 ? '' : 's'}`
                    }
                }
            });
        }
    } else if (node.type === 'array') {
        const itemCount = node.children ? node.children.length : 0;
        if (itemCount > 0) {
            const startPos = document.positionAt(node.offset);
            const endPos = document.lineAt(startPos.line).range.end;

            decorations.push({
                range: new vscode.Range(endPos, endPos),
                renderOptions: {
                    after: {
                        contentText: ` ${itemCount} item${itemCount === 1 ? '' : 's'}`
                    }
                }
            });
        }
    }

    if (node.children) {
        node.children.forEach(child => traverse(child, document, decorations));
    }
}
