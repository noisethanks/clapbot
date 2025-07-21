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
exports.postCommand = void 0;
const discord_js_1 = require("discord.js");
const moderate_1 = require("../moderation/moderate");
exports.postCommand = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("post")
        .setDescription("Submit a message through the moderation service")
        .addStringOption((opt) => opt
        .setName("message")
        .setDescription("The message you want to post")
        .setRequired(true)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = interaction.options.getString("message", true);
            const userTag = interaction.user.tag;
            const result = yield (0, moderate_1.moderate)(message);
            if (!result.ok) {
                yield interaction.reply({
                    content: `🚫 Rejected: ${result.reason}`,
                    ephemeral: true,
                });
                return;
            }
            yield interaction.reply({
                content: "✅ Your message passed moderation and has been posted.",
                ephemeral: true,
            });
            const targetChannel = interaction.channel;
            yield targetChannel.send(`**[Moderated Post from ${userTag}]**\n${message}`);
        });
    },
};
