export interface ModerationResult {
    ok: boolean;
    reason?: string;
}

export interface ModerationProvider {
    moderate(text: string): Promise<ModerationResult>;
}
