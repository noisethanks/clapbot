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
exports.handleInteraction = handleInteraction;
function handleInteraction(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!interaction.isChatInputCommand())
            return;
        const command = (_a = client.commands) === null || _a === void 0 ? void 0 : _a.get(interaction.commandName);
        if (!command) {
            yield interaction.reply({ content: '⚠️ Unknown command.', ephemeral: true });
            return;
        }
        try {
            yield command.execute(interaction, client);
        }
        catch (err) {
            console.error(`Error executing command ${interaction.commandName}:`, err);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: '❌ There was an error executing that command.', ephemeral: true });
            }
            else {
                yield interaction.reply({ content: '❌ There was an error executing that command.', ephemeral: true });
            }
        }
    });
}
