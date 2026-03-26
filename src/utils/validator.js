export function validateEmail(email) {
    if (!email || typeof email !== "string") {
        return false;
    }

    email = email.trim();

    if (email.length > 254)
        return false;

    const parts = email.split("@");

    if (parts.length !== 2)
        return false;

    const [local, domain] = parts;

    if (!local || !domain)
        return false;

    if (local.length > 64)
        return false;

    if (!domain.includes("."))
        return false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email))
        return false;

    if (email.includes(".."))
        return false;

    if (/^-|-$/.test(domain))
        return false;

    return true;
}