const PERSPECTIVE_API_KEY = process.env.PERSPECTIVE_API_KEY!;
const PERSPECTIVE_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';

const ATTRIBUTES = [
  'TOXICITY',
  'SEVERE_TOXICITY',
  'INSULT',
  'THREAT',
  'IDENTITY_ATTACK',
  'SEXUALLY_EXPLICIT',
] as const;

type Attribute = (typeof ATTRIBUTES)[number];

const THRESHOLDS: Record<Attribute, number> = {
  TOXICITY: 0.8,
  SEVERE_TOXICITY: 0.7,
  INSULT: 0.75,
  THREAT: 0.6,
  IDENTITY_ATTACK: 0.6,
  SEXUALLY_EXPLICIT: 0.7,
};

export async function moderate(content: string): Promise<{ ok: boolean; reason?: string }> {
  try {
    const res = await fetch(`${PERSPECTIVE_URL}?key=${PERSPECTIVE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: { text: content },
        languages: ['en'],
        requestedAttributes: ATTRIBUTES.reduce(
          (acc, attr) => {
            acc[attr] = {};
            return acc;
          },
          {} as Record<Attribute, object>,
        ),
      }),
    });

    if (!res.ok) {
      console.error('Perspective API request failed', await res.text());
      return { ok: true }; // Fail-open
    }

    const data = await res.json();
    const scores = data.attributeScores;

    for (const attr of ATTRIBUTES) {
      const score = scores[attr]?.summaryScore?.value ?? 0;
      if (score >= THRESHOLDS[attr]) {
        return {
          ok: false,
          reason: `${attr.replace('_', ' ').toLowerCase()} score ${score.toFixed(2)} exceeded threshold`,
        };
      }
    }

    return { ok: true };
  } catch (err) {
    console.error('Moderation error:', err);
    return { ok: true }; // Fail-open again
  }
}
