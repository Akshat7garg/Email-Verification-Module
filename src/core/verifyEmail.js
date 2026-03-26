import { validateEmail } from "../utils/validator.js";
import { getMxRecords } from "../services/dns.service.js";
import { verifySMTP } from "../services/smtp.service.js";
import { getDidYouMean } from "../services/typo.service.js";
import { formatResponse } from "../utils/formatter.js";
import { startTimer, endTimer } from "../utils/timer.js";
import { RESULT, MESSAGES } from "../config/constants.js";

export async function verifyEmail(email) {
    const startTime = startTimer();

    try {
        if (!validateEmail(email)) {
            return formatResponse({
                email,
                result: RESULT.INVALID,
                subresult: MESSAGES.INVALID_FORMAT,
                executionTime: endTimer(startTime)
            });
        }

        const domain = email.split("@")[1];

        const suggestion = getDidYouMean(email);

        if (suggestion) {
            return formatResponse({
                email,
                result: RESULT.INVALID,
                subresult: "typo_detected",
                domain,
                executionTime: endTimer(startTime),
                suggestion
            });
        }

        const dnsResult = await getMxRecords(domain);

        if (!dnsResult.success || dnsResult.mxRecords.length === 0) {
            return formatResponse({
                email,
                result: RESULT.UNKNOWN,
                subresult: MESSAGES.NO_MX,
                domain,
                executionTime: endTimer(startTime)
            });
        }

        const smtpResult = await verifySMTP(email, dnsResult.mxRecords);

        return formatResponse({
            email,
            result: smtpResult.result || RESULT.UNKNOWN,
            subresult: smtpResult.message,
            domain,
            mxRecords: dnsResult.mxRecords,
            executionTime: endTimer(startTime)
        });

    } catch (error) {
        return formatResponse({
            email,
            result: RESULT.UNKNOWN,
            subresult: MESSAGES.SMTP_ERROR,
            executionTime: endTimer(startTime),
            error: error.message
        });
    }
}