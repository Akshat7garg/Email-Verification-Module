import { RESULT_CODE } from "../config/constants.js";

export function formatResponse({
    email,
    result,
    subresult = null,
    domain = null,
    mxRecords = [],
    executionTime = 0,
    error = null,
    suggestion = null
}) {
    return {
        email,
        result,
        resultcode: RESULT_CODE[result.toUpperCase()] ?? 2,
        subresult,
        domain,
        mxRecords,
        executiontime: executionTime,
        didyoumean: suggestion,
        error,
        timestamp: new Date().toISOString()
    };
}