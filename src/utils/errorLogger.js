import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export function logErrorToFile(error) {
  const logFilePath = path.join(logDir, "error.log");
  const time = new Date().toISOString();
  const errorMessage = `[${time}] ${error.stack || error}\n\n`;

  fs.appendFile(logFilePath, errorMessage, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });
}
