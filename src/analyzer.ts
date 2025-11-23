export interface AnalysisResult {
    isValid: boolean;
    sizeBytes: number;
    keyCount: number;
    arrayItemCount: number;
    error?: {
        message: string;
        line?: number;
    };
}

export function analyzeJson(text: string): AnalysisResult {
    const sizeBytes = new TextEncoder().encode(text).length;
    let keyCount = 0;
    let arrayItemCount = 0;

    try {
        const json = JSON.parse(text);

        function traverse(obj: any) {
            if (Array.isArray(obj)) {
                arrayItemCount += obj.length;
                obj.forEach(item => traverse(item));
            } else if (typeof obj === 'object' && obj !== null) {
                const keys = Object.keys(obj);
                keyCount += keys.length;
                keys.forEach(key => traverse(obj[key]));
            }
        }

        traverse(json);

        return {
            isValid: true,
            sizeBytes,
            keyCount,
            arrayItemCount
        };
    } catch (e: any) {
        let line: number | undefined;
        const match = e.message.match(/at position (\d+)/);
        if (match) {
            const position = parseInt(match[1], 10);
            const lines = text.substring(0, position).split('\n');
            line = lines.length;
        }

        return {
            isValid: false,
            sizeBytes,
            keyCount: 0,
            arrayItemCount: 0,
            error: {
                message: e.message,
                line
            }
        };
    }
}
