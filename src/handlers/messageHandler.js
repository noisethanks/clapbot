"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
const moderate_1 = require("../moderation/moderate");
const logger_1 = require("../utils/logger");
const MODERATED_GATE_CHANNEL_ID = "1396690898615537747";
function handleMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (message.author.bot || !message.guild)
            return;
        if (message.channel.id === MODERATED_GATE_CHANNEL_ID) {
            if (!message.interactionMetadata) {
                const reply = yield message.author.send({
                    content: `🚫 Please use the /post command to submit content.`,
                })
                    .catch((err) => console.error("Failed to notify user:", err));
                yield message.delete();
            }
            return;
        }
        const result = yield (0, moderate_1.moderate)(message.content);
        if (!result.ok) {
            try {
                yield message.delete();
                (0, logger_1.logViolation)(message, (_a = result.reason) !== null && _a !== void 0 ? _a : "unspecified");
                yield message.author.send(`🚫 Your message was removed for violating rules: ${result.reason}`);
            }
            catch (err) {
                console.error("Failed to delete or DM user:", err);
            }
        }
    });
}
