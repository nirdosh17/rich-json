import * as vscode from 'vscode';
import { AnalysisResult } from './analyzer';

export function createReportWebview(panel: vscode.WebviewPanel, stats: AnalysisResult) {
    panel.webview.html = getWebviewContent(stats);
}

function getWebviewContent(stats: AnalysisResult): string {
    const sizeDisplay = formatSize(stats.sizeBytes);

    let content = '';
    if (stats.isValid) {
        content = `
            <div class="stats-container">
                <div class="stat-card">
                    <h3>Total Size</h3>
                    <p>${sizeDisplay}</p>
                </div>
                <div class="stat-card">
                    <h3>Total Keys</h3>
                    <p>${stats.keyCount}</p>
                </div>
                <div class="stat-card">
                    <h3>Array Items</h3>
                    <p>${stats.arrayItemCount}</p>
                </div>
            </div>
        `;
    } else {
        content = `
            <div class="error-container">
                <h2>Invalid JSON</h2>
                <p class="error-message">${stats.error?.message}</p>
                ${stats.error?.line ? `<p>Error around line: <strong>${stats.error.line}</strong></p>` : ''}
            </div>
        `;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Analysis</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            color: var(--vscode-editor-foreground);
            background-color: var(--vscode-editor-background);
        }
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .stat-card {
            background-color: var(--vscode-editor-lineHighlightBackground);
            padding: 15px;
            border-radius: 6px;
            text-align: center;
        }
        .stat-card h3 {
            margin-top: 0;
            font-size: 0.9em;
            opacity: 0.8;
        }
        .stat-card p {
            font-size: 1.5em;
            font-weight: bold;
            margin: 10px 0 0;
        }
        .error-container {
            background-color: var(--vscode-inputValidation-errorBackground);
            border: 1px solid var(--vscode-inputValidation-errorBorder);
            padding: 20px;
            border-radius: 6px;
        }
        .error-message {
            color: var(--vscode-errorForeground);
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>JSON Analysis Report</h1>
    ${content}
</body>
</html>`;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) {
        return bytes + ' Bytes';
    }
    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
