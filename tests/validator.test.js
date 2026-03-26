import { validateEmail } from "../src/utils/validator.js";

describe("Email Validator", () => {
    test("valid email", () => {
        expect(validateEmail("test@gmail.com")).toBe(true);
    });

    test("missing @", () => {
        expect(validateEmail("testgmail.com")).toBe(false);
    });

    test("multiple @", () => {
        expect(validateEmail("test@@gmail.com")).toBe(false);
    });

    test("invalid domain", () => {
        expect(validateEmail("test@.com")).toBe(false);
    });

    test("consecutive dots", () => {
        expect(validateEmail("test..123@gmail.com")).toBe(false);
    });

    test("empty string", () => {
        expect(validateEmail("")).toBe(false);
    });
});