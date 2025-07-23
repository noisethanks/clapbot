import type { ModerationProvider, ModerationResult } from '../types/ModerationProvider.js';

export interface BenchmarkedResult extends ModerationResult {
    durationMs?: number;
    provider?: string;
}

export function benchmarkWrapper(
    provider: ModerationProvider,
    providerName: string,
): ModerationProvider {
    return {
        async moderate(text: string): Promise<BenchmarkedResult> {
            const start = performance.now();
            const result = await provider.moderate(text);
            const end = performance.now();
            console.log(`[BENCHMARK] ${providerName} moderated in ${+(end - start).toFixed(2)}ms`);
            return {
                ...result,
                durationMs: +(end - start).toFixed(2),
                provider: providerName,
            };
        },
    };
}
