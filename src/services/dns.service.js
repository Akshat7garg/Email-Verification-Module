import dns from "dns/promises";

export async function getMxRecords(domain) {
    try {
        if (!domain) {
            throw new Error("Domain is required");
        }

        const records = await dns.resolveMx(domain);

        const sortedRecords = records.sort((a, b) => a.priority - b.priority);

        const mxHosts = sortedRecords.map(record => record.exchange);

        return {
            success: true,
            mxRecords: mxHosts
        };

    } catch (error) {
        return {
            success: false,
            mxRecords: [],
            error: error.message
        };
    }
}