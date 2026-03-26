const COMMON_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com"
];

function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++)
        matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++)
        matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[a.length][b.length];
}

export function getDidYouMean(email) {
    if (!email || typeof email !== "string")
        return null;

    const parts = email.split("@");
    if (parts.length !== 2)
        return null;

    const [local, domain] = parts;

    let bestMatch = null;
    let minDistance = Infinity;

    for (let validDomain of COMMON_DOMAINS) {
        const distance = levenshtein(domain.toLowerCase(), validDomain);

        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = validDomain;
        }
    }

    if (minDistance > 0 && minDistance <= 2) {
        return `${local}@${bestMatch}`;
    }

    return null;
}