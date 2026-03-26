import { getDidYouMean } from "../src/services/typo.service.js";

describe("Typo Detection", () => {
    test("detect gmial typo", () => {
        expect(getDidYouMean("user@gmial.com"))
            .toBe("user@gmail.com");
    });

    test("detect outlok typo", () => {
        expect(getDidYouMean("user@outlok.com"))
            .toBe("user@outlook.com");
    });

    test("no typo", () => {
        expect(getDidYouMean("user@gmail.com"))
            .toBe(null);
    });

    test("invalid input", () => {
        expect(getDidYouMean(null)).toBe(null);
    });
});