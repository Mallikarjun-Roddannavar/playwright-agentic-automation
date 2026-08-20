import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import crypto from "node:crypto";

const logPath = path.join(process.cwd(), "knowledge", "workflow-runs.jsonl");
const runId = `${new Date().toISOString()}-${crypto.randomBytes(3).toString("hex")}`;

export function logWorkflowEvent(event) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(
    logPath,
    `${JSON.stringify({ runId, timestamp: new Date().toISOString(), command: process.argv.slice(2).join(" "), ...event })}\n`,
    "utf8"
  );
}
