"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderate = moderate;
const PERSPECTIVE_API_KEY = process.env.PERSPECTIVE_API_KEY;
const PERSPECTIVE_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';
const ATTRIBUTES = [
    'TOXICITY',
    'SEVERE_TOXICITY',
    'INSULT',
    'THREAT',
    'IDENTITY_ATTACK',
    'SEXUALLY_EXPLICIT',
];
const THRESHOLDS = {
    TOXICITY: 0.80,
    SEVERE_TOXICITY: 0.70,
    INSULT: 0.75,
    THREAT: 0.60,
    IDENTITY_ATTACK: 0.60,
    SEXUALLY_EXPLICIT: 0.70,
};
function moderate(content) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        console.log("API KEY", PERSPECTIVE_API_KEY);
        try {
            const res = yield fetch(`${PERSPECTIVE_URL}?key=${PERSPECTIVE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comment: { text: content },
                    languages: ['en'],
                    requestedAttributes: ATTRIBUTES.reduce((acc, attr) => {
                        acc[attr] = {};
                        return acc;
                    }, {}),
                }),
            });
            if (!res.ok) {
                console.error('Perspective API request failed', yield res.text());
                return { ok: true }; // Fail-open
            }
            const data = yield res.json();
            const scores = data.attributeScores;
            for (const attr of ATTRIBUTES) {
                const score = (_c = (_b = (_a = scores[attr]) === null || _a === void 0 ? void 0 : _a.summaryScore) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 0;
                if (score >= THRESHOLDS[attr]) {
                    return {
                        ok: false,
                        reason: `${attr.replace('_', ' ').toLowerCase()} score ${score.toFixed(2)} exceeded threshold`,
                    };
                }
            }
            return { ok: true };
        }
        catch (err) {
            console.error('Moderation error:', err);
            return { ok: true }; // Fail-open again
        }
    });
}
