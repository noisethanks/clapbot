"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const messageHandler_1 = require("./handlers/messageHandler");
const slashCommands_1 = require("./handlers/slashCommands");
const post_1 = require("./commands/post");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.commands = new discord_js_1.Collection();
client.commands.set(post_1.postCommand.data.name, post_1.postCommand);
client.once("ready", () => {
    var _a;
    console.log(`🤖 Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
client.on("messageCreate", messageHandler_1.handleMessage);
client.on("interactionCreate", (interaction) => (0, slashCommands_1.handleInteraction)(interaction, client));
client.login(process.env.DISCORD_TOKEN);
if (process.env.REGISTER_COMMANDS === "true") {
    const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
    rest
        .put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
        body: [post_1.postCommand.data.toJSON()],
    })
        .then(() => console.log("✅ Slash command registered"))
        .catch(console.error);
}
