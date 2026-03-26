export function startTimer() {
    return Date.now();
}

export function endTimer(startTime) {
    return (Date.now() - startTime) / 1000;
}