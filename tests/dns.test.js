import { getMxRecords } from "../src/services/dns.service.js";

describe("DNS MX Lookup", () => {
    test("valid domain", async () => {
        const res = await getMxRecords("gmail.com");

        expect(res.success).toBe(true);
        expect(res.mxRecords.length).toBeGreaterThan(0);
    });

    test("invalid domain", async () => {
        const res = await getMxRecords("invalid-domain-xyz-123.com");

        expect(res.success).toBe(false);
    });
});