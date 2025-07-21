"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logViolation = logViolation;
function logViolation(message, reason) {
    console.log(`🚫 [${reason}] ${message.author.tag}: ${message.content}`);
}
