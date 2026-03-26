import net from "net";

export function verifySMTP(email, mxRecords) {
    return new Promise((resolve) => {
        if (!mxRecords || mxRecords.length === 0) {
            return resolve({
                success: false,
                result: "unknown",
                message: "No MX records found"
            });
        }

        const mailServer = mxRecords[0];

        const socket = net.createConnection(25, mailServer);

        let step = 0;
        let isResolved = false;

        socket.setTimeout(10000);

        socket.on("connect", () => {
            console.log("Connected to SMTP server");
        });

        socket.on("data", (data) => {
            const response = data.toString();

            if (step === 0 && response.startsWith("220")) {
                socket.write("HELO localhost\r\n");
                step++;
            }
            else if (step === 1 && response.startsWith("250")) {
                socket.write("MAIL FROM:<test@example.com>\r\n");
                step++;
            }
            else if (step === 2 && response.startsWith("250")) {
                socket.write(`RCPT TO:<${email}>\r\n`);
                step++;
            }
            else if (step === 3) {
                if (response.startsWith("250")) {
                    finish({
                        success: true,
                        result: "valid",
                        message: "Mailbox exists"
                    });
                }
                else if (response.startsWith("550")) {
                    finish({
                        success: false,
                        result: "invalid",
                        message: "Mailbox does not exist"
                    });
                }
                else {
                    finish({
                        success: false,
                        result: "unknown",
                        message: response.trim()
                    });
                }
            }
        });

        socket.on("timeout", () => {
            finish({
                success: false,
                result: "unknown",
                message: "Connection timeout"
            });
        });

        socket.on("error", (err) => {
            finish({
                success: false,
                result: "unknown",
                message: err.message
            });
        });

        function finish(result) {
            if (!isResolved) {
                isResolved = true;
                socket.end();
                socket.destroy();
                resolve(result);
            }
        }
    });
}