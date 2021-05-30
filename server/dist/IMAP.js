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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var ImapClient = require("emailjs-imap-client");
var mailparser_1 = require("mailparser");
// Disable certificate validation (less secure, but needed for some servers).
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// The worker that will perform IMAP operations.
var Worker = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Worker(inServerInfo) {
        console.log("IMAP.Worker.constructor", inServerInfo);
        Worker.serverInfo = inServerInfo;
    } /* End constructor. */
    /**
     * Connect to the SMTP server and return a client object for operations to use.
     *
     * @return An ImapClient instance.
     */
    Worker.prototype.connectToServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new ImapClient.default(Worker.serverInfo.imap.host, Worker.serverInfo.imap.port, { auth: Worker.serverInfo.imap.auth });
                        client.logLevel = client.LOG_LEVEL_NONE;
                        client.onerror = function (inError) {
                            console.log("IMAP.Worker.listMailboxes(): Connection error", inError);
                        };
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        console.log("IMAP.Worker.listMailboxes(): Connected");
                        return [2 /*return*/, client];
                }
            });
        });
    }; /* End connectToServer(). */
    /**
     * Returns a list of all (top-level) mailboxes.
     *
     * @return An array of objects, on per mailbox, that describes the nmilbox.
     */
    Worker.prototype.listMailboxes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, mailboxes, finalMailboxes, iterateChildren;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IMAP.Worker.listMailboxes()");
                        return [4 /*yield*/, this.connectToServer()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.listMailboxes()];
                    case 2:
                        mailboxes = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        finalMailboxes = [];
                        iterateChildren = function (inArray) {
                            inArray.forEach(function (inValue) {
                                finalMailboxes.push({
                                    name: inValue.name,
                                    path: inValue.path
                                });
                                iterateChildren(inValue.children);
                            });
                        };
                        iterateChildren(mailboxes.children);
                        return [2 /*return*/, finalMailboxes];
                }
            });
        });
    }; /* End listMailboxes(). */
    /**
     * Lists basic information about messages in a named mailbox.
     *
     * @param inCallOptions An object implementing the ICallOptions interface.
     * @return              An array of objects, one per message.
     */
    Worker.prototype.listMessages = function (inCallOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var client, mailbox, messages, finalMessages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IMAP.Worker.listMessages()", inCallOptions);
                        return [4 /*yield*/, this.connectToServer()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.selectMailbox(inCallOptions.mailbox)];
                    case 2:
                        mailbox = _a.sent();
                        console.log("IMAP.Worker.listMessages(): Message count = " + mailbox.exists);
                        if (!(mailbox.exists === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, []];
                    case 4: return [4 /*yield*/, client.listMessages(inCallOptions.mailbox, "1:*", ["uid", "envelope"])];
                    case 5:
                        messages = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 6:
                        _a.sent();
                        finalMessages = [];
                        messages.forEach(function (inValue) {
                            finalMessages.push({
                                id: inValue.uid,
                                date: inValue.envelope.date,
                                from: inValue.envelope.from[0].address,
                                subject: inValue.envelope.subject
                            });
                        });
                        return [2 /*return*/, finalMessages];
                }
            });
        });
    }; /* End listMessages(). */
    /**
     * Gets the plain text body of a single message.
     *
     * @param  inCallOptions An object implementing the ICallOptions interface.
     * @return               The plain text body of the message.
     */
    Worker.prototype.getMessageBody = function (inCallOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var client, messages, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IMAP.Worker.getMessageBody()", inCallOptions);
                        return [4 /*yield*/, this.connectToServer()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.listMessages(inCallOptions.mailbox, inCallOptions.id, ["body[]"], { byUid: true })];
                    case 2:
                        messages = _a.sent();
                        return [4 /*yield*/, mailparser_1.simpleParser(messages[0]["body[]"])];
                    case 3:
                        parsed = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, parsed.text];
                }
            });
        });
    }; /* End getMessageBody(). */
    /**
     * Deletes a single message.
     *
     * @param inCallOptions An object implementing the ICallOptions interface.
     */
    Worker.prototype.deleteMessage = function (inCallOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IMAP.Worker.deleteMessage()", inCallOptions);
                        return [4 /*yield*/, this.connectToServer()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.deleteMessages(inCallOptions.mailbox, inCallOptions.id, { byUid: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }; /* End deleteMessage(). */
    return Worker;
}()); /* End class. */
exports.Worker = Worker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSU1BUC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9JTUFQLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2xELHlDQUEwQztBQWdDMUMsNkVBQTZFO0FBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxDQUFDO0FBRy9DLGdEQUFnRDtBQUNoRDtJQU9FOztPQUVHO0lBQ0gsZ0JBQVksWUFBeUI7UUFFbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztJQUVuQyxDQUFDLENBQUMsc0JBQXNCO0lBR3hCOzs7O09BSUc7SUFDVyxnQ0FBZSxHQUE3Qjs7Ozs7O3dCQUdRLE1BQU0sR0FBUSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQ3hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFDM0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUMzQixFQUFFLElBQUksRUFBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDdkMsQ0FBQzt3QkFDRixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7d0JBQ3hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxPQUFjOzRCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUN4RSxDQUFDLENBQUM7d0JBQ0YscUJBQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBdEIsU0FBc0IsQ0FBQzt3QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO3dC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Qjt3QkFHeEIscUJBQU0sTUFBTSxDQUFDLFlBQVksQ0FDL0MsYUFBYSxDQUFDLE9BQU8sRUFDckIsYUFBYSxDQUFDLEVBQUUsRUFDaEIsQ0FBRSxRQUFRLENBQUUsRUFDWixFQUFFLEtBQUssRUFBRyxJQUFJLEVBQUUsQ0FDakIsRUFBQTs7d0JBTEssUUFBUSxHQUFVLFNBS3ZCO3dCQUMwQixxQkFBTSx5QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFBOzt3QkFBOUQsTUFBTSxHQUFlLFNBQXlDO3dCQUVwRSxxQkFBTSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUFwQixTQUFvQixDQUFDO3dCQUVyQixzQkFBTyxNQUFNLENBQUMsSUFBSyxFQUFDOzs7O0tBRXJCLEVBQUMsMkJBQTJCO0lBRzdCOzs7O09BSUc7SUFDVSw4QkFBYSxHQUExQixVQUEyQixhQUEyQjs7Ozs7O3dCQUVwRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUV0QyxxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUExQyxNQUFNLEdBQVEsU0FBNEI7d0JBRWhELHFCQUFNLE1BQU0sQ0FBQyxjQUFjLENBQ3pCLGFBQWEsQ0FBQyxPQUFPLEVBQ3JCLGFBQWEsQ0FBQyxFQUFFLEVBQ2hCLEVBQUUsS0FBSyxFQUFHLElBQUksRUFBRSxDQUNqQixFQUFBOzt3QkFKRCxTQUlDLENBQUM7d0JBRUYscUJBQU0sTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFBOzt3QkFBcEIsU0FBb0IsQ0FBQzs7Ozs7S0FFdEIsRUFBQywwQkFBMEI7SUFHOUIsYUFBQztBQUFELENBQUMsQUEvS0QsSUErS0MsQ0FBQyxnQkFBZ0I7QUEvS0wsd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMaWJyYXJ5IGltcG9ydHMuXHJcbmltcG9ydCB7IFBhcnNlZE1haWwgfSBmcm9tIFwibWFpbHBhcnNlclwiO1xyXG5jb25zdCBJbWFwQ2xpZW50ID0gcmVxdWlyZShcImVtYWlsanMtaW1hcC1jbGllbnRcIik7XHJcbmltcG9ydCB7IHNpbXBsZVBhcnNlciB9IGZyb20gXCJtYWlscGFyc2VyXCI7XHJcblxyXG4vLyBBcHAgaW1wb3J0cy5cclxuaW1wb3J0IHsgSVNlcnZlckluZm8gfSBmcm9tIFwiLi9TZXJ2ZXJJbmZvXCI7XHJcblxyXG5cclxuLy8gRGVmaW5lIGludGVyZmFjZSB0byBkZXNjcmliZSBhIG1haWxib3ggYW5kIG9wdGlvbmFsbHkgYSBzcGVjaWZpYyBtZXNzYWdlXHJcbi8vIHRvIGJlIHN1cHBsaWVkIHRvIHZhcmlvdXMgbWV0aG9kcyBoZXJlLlxyXG5leHBvcnQgaW50ZXJmYWNlIElDYWxsT3B0aW9ucyB7XHJcbiAgbWFpbGJveDogc3RyaW5nLFxyXG4gIGlkPzogbnVtYmVyXHJcbn1cclxuXHJcblxyXG4vLyBEZWZpbmUgaW50ZXJmYWNlIHRvIGRlc2NyaWJlIGEgcmVjZWl2ZWQgbWVzc2FnZS4gIE5vdGUgdGhhdCBib2R5IGlzIG9wdGlvbmFsIHNpbmNlIGl0IGlzbid0IHNlbnQgd2hlbiBsaXN0aW5nXHJcbi8vIG1lc3NhZ2VzLlxyXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlIHtcclxuICBpZDogc3RyaW5nLFxyXG4gIGRhdGU6IHN0cmluZyxcclxuICBmcm9tOiBzdHJpbmcsXHJcbiAgc3ViamVjdDogc3RyaW5nLFxyXG4gIGJvZHk/OiBzdHJpbmdcclxufVxyXG5cclxuXHJcbi8vIERlZmluZSBpbnRlcmZhY2UgdG8gZGVzY3JpYmUgYSBtYWlsYm94LlxyXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsYm94IHtcclxuICBuYW1lOiBzdHJpbmcsXHJcbiAgcGF0aDogc3RyaW5nXHJcbn1cclxuXHJcblxyXG4vLyBEaXNhYmxlIGNlcnRpZmljYXRlIHZhbGlkYXRpb24gKGxlc3Mgc2VjdXJlLCBidXQgbmVlZGVkIGZvciBzb21lIHNlcnZlcnMpLlxyXG5wcm9jZXNzLmVudi5OT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEID0gXCIwXCI7XHJcblxyXG5cclxuLy8gVGhlIHdvcmtlciB0aGF0IHdpbGwgcGVyZm9ybSBJTUFQIG9wZXJhdGlvbnMuXHJcbmV4cG9ydCBjbGFzcyBXb3JrZXIge1xyXG5cclxuXHJcbiAgLy8gU2VydmVyIGluZm9ybWF0aW9uLlxyXG4gIHByaXZhdGUgc3RhdGljIHNlcnZlckluZm86IElTZXJ2ZXJJbmZvO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaW5TZXJ2ZXJJbmZvOiBJU2VydmVySW5mbykge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiSU1BUC5Xb3JrZXIuY29uc3RydWN0b3JcIiwgaW5TZXJ2ZXJJbmZvKTtcclxuICAgIFdvcmtlci5zZXJ2ZXJJbmZvID0gaW5TZXJ2ZXJJbmZvO1xyXG5cclxuICB9IC8qIEVuZCBjb25zdHJ1Y3Rvci4gKi9cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENvbm5lY3QgdG8gdGhlIFNNVFAgc2VydmVyIGFuZCByZXR1cm4gYSBjbGllbnQgb2JqZWN0IGZvciBvcGVyYXRpb25zIHRvIHVzZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gQW4gSW1hcENsaWVudCBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIGNvbm5lY3RUb1NlcnZlcigpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgIC8vIG5vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVKU1R5cGVzXHJcbiAgICBjb25zdCBjbGllbnQ6IGFueSA9IG5ldyBJbWFwQ2xpZW50LmRlZmF1bHQoXHJcbiAgICAgIFdvcmtlci5zZXJ2ZXJJbmZvLmltYXAuaG9zdCxcclxuICAgICAgV29ya2VyLnNlcnZlckluZm8uaW1hcC5wb3J0LFxyXG4gICAgICB7IGF1dGggOiBXb3JrZXIuc2VydmVySW5mby5pbWFwLmF1dGggfVxyXG4gICAgKTtcclxuICAgIGNsaWVudC5sb2dMZXZlbCA9IGNsaWVudC5MT0dfTEVWRUxfTk9ORTtcclxuICAgIGNsaWVudC5vbmVycm9yID0gKGluRXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSU1BUC5Xb3JrZXIubGlzdE1haWxib3hlcygpOiBDb25uZWN0aW9uIGVycm9yXCIsIGluRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIklNQVAuV29ya2VyLmxpc3RNYWlsYm94ZXMoKTogQ29ubmVjdGVkXCIpO1xyXG5cclxuICAgIHJldHVybiBjbGllbnQ7XHJcblxyXG4gIH0gLyogRW5kIGNvbm5lY3RUb1NlcnZlcigpLiAqL1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsICh0b3AtbGV2ZWwpIG1haWxib3hlcy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gQW4gYXJyYXkgb2Ygb2JqZWN0cywgb24gcGVyIG1haWxib3gsIHRoYXQgZGVzY3JpYmVzIHRoZSBubWlsYm94LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBsaXN0TWFpbGJveGVzKCk6IFByb21pc2U8SU1haWxib3hbXT4ge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiSU1BUC5Xb3JrZXIubGlzdE1haWxib3hlcygpXCIpO1xyXG5cclxuICAgIGNvbnN0IGNsaWVudDogYW55ID0gYXdhaXQgdGhpcy5jb25uZWN0VG9TZXJ2ZXIoKTtcclxuXHJcbiAgICBjb25zdCBtYWlsYm94ZXM6IGFueSA9IGF3YWl0IGNsaWVudC5saXN0TWFpbGJveGVzKCk7XHJcblxyXG4gICAgYXdhaXQgY2xpZW50LmNsb3NlKCk7XHJcblxyXG4gICAgLy8gVHJhbnNsYXRlIGZyb20gZW1haWxqcy1pbWFwLWNsaWVudCBtYWlsYm94IG9iamVjdHMgdG8gYXBwLXNwZWNpZmljIG9iamVjdHMuICBBdCB0aGUgc2FtZSB0aW1lLCBmbGF0dGVuIHRoZSBsaXN0XHJcbiAgICAvLyBvZiBtYWlsYm94ZXMgdmlhIHJlY3Vyc2lvbi5cclxuICAgIGNvbnN0IGZpbmFsTWFpbGJveGVzOiBJTWFpbGJveFtdID0gW107XHJcbiAgICBjb25zdCBpdGVyYXRlQ2hpbGRyZW46IEZ1bmN0aW9uID0gKGluQXJyYXk6IGFueVtdKTogdm9pZCA9PiB7XHJcbiAgICAgIGluQXJyYXkuZm9yRWFjaCgoaW5WYWx1ZTogYW55KSA9PiB7XHJcbiAgICAgICAgZmluYWxNYWlsYm94ZXMucHVzaCh7XHJcbiAgICAgICAgICBuYW1lIDogaW5WYWx1ZS5uYW1lLFxyXG4gICAgICAgICAgcGF0aCA6IGluVmFsdWUucGF0aFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0ZXJhdGVDaGlsZHJlbihpblZhbHVlLmNoaWxkcmVuKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgaXRlcmF0ZUNoaWxkcmVuKG1haWxib3hlcy5jaGlsZHJlbik7XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsTWFpbGJveGVzO1xyXG5cclxuICB9IC8qIEVuZCBsaXN0TWFpbGJveGVzKCkuICovXHJcblxyXG5cclxuICAvKipcclxuICAgKiBMaXN0cyBiYXNpYyBpbmZvcm1hdGlvbiBhYm91dCBtZXNzYWdlcyBpbiBhIG5hbWVkIG1haWxib3guXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW5DYWxsT3B0aW9ucyBBbiBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBJQ2FsbE9wdGlvbnMgaW50ZXJmYWNlLlxyXG4gICAqIEByZXR1cm4gICAgICAgICAgICAgIEFuIGFycmF5IG9mIG9iamVjdHMsIG9uZSBwZXIgbWVzc2FnZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgbGlzdE1lc3NhZ2VzKGluQ2FsbE9wdGlvbnM6IElDYWxsT3B0aW9ucyk6IFByb21pc2U8SU1lc3NhZ2VbXT4ge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiSU1BUC5Xb3JrZXIubGlzdE1lc3NhZ2VzKClcIiwgaW5DYWxsT3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QgY2xpZW50OiBhbnkgPSBhd2FpdCB0aGlzLmNvbm5lY3RUb1NlcnZlcigpO1xyXG5cclxuICAgIC8vIFdlIGhhdmUgdG8gc2VsZWN0IHRoZSBtYWlsYm94IGZpcnN0LiAgVGhpcyBnaXZlcyB1cyB0aGUgbWVzc2FnZSBjb3VudC5cclxuICAgIGNvbnN0IG1haWxib3g6IGFueSA9IGF3YWl0IGNsaWVudC5zZWxlY3RNYWlsYm94KGluQ2FsbE9wdGlvbnMubWFpbGJveCk7XHJcbiAgICBjb25zb2xlLmxvZyhgSU1BUC5Xb3JrZXIubGlzdE1lc3NhZ2VzKCk6IE1lc3NhZ2UgY291bnQgPSAke21haWxib3guZXhpc3RzfWApO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBtZXNzYWdlcyB0aGVuIGp1c3QgcmV0dXJuIGFuIGVtcHR5IGFycmF5LlxyXG4gICAgaWYgKG1haWxib3guZXhpc3RzID09PSAwKSB7XHJcbiAgICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG4gICAgICByZXR1cm4gWyBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9rYXksIHRoZXJlIGFyZSBtZXNzYWdlcywgbGV0J3MgZ2V0ICdlbSEgIE5vdGUgdGhhdCB0aGV5IGFyZSByZXR1cm5lZCBpbiBvcmRlciBieSB1aWQsIHNvIGl0J3MgRklGTy5cclxuICAgIC8vIG5vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVKU1R5cGVzXHJcbiAgICBjb25zdCBtZXNzYWdlczogYW55W10gPSBhd2FpdCBjbGllbnQubGlzdE1lc3NhZ2VzKFxyXG4gICAgICBpbkNhbGxPcHRpb25zLm1haWxib3gsXHJcbiAgICAgIFwiMToqXCIsXHJcbiAgICAgIFsgXCJ1aWRcIiwgXCJlbnZlbG9wZVwiIF1cclxuICAgICk7XHJcblxyXG4gICAgYXdhaXQgY2xpZW50LmNsb3NlKCk7XHJcblxyXG4gICAgLy8gVHJhbnNsYXRlIGZyb20gZW1haWxqcy1pbWFwLWNsaWVudCBtZXNzYWdlIG9iamVjdHMgdG8gYXBwLXNwZWNpZmljIG9iamVjdHMuXHJcbiAgICBjb25zdCBmaW5hbE1lc3NhZ2VzOiBJTWVzc2FnZVtdID0gW107XHJcbiAgICBtZXNzYWdlcy5mb3JFYWNoKChpblZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgZmluYWxNZXNzYWdlcy5wdXNoKHtcclxuICAgICAgICBpZCA6IGluVmFsdWUudWlkLFxyXG4gICAgICAgIGRhdGU6IGluVmFsdWUuZW52ZWxvcGUuZGF0ZSxcclxuICAgICAgICBmcm9tOiBpblZhbHVlLmVudmVsb3BlLmZyb21bMF0uYWRkcmVzcyxcclxuICAgICAgICBzdWJqZWN0OiBpblZhbHVlLmVudmVsb3BlLnN1YmplY3RcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmluYWxNZXNzYWdlcztcclxuXHJcbiAgfSAvKiBFbmQgbGlzdE1lc3NhZ2VzKCkuICovXHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBwbGFpbiB0ZXh0IGJvZHkgb2YgYSBzaW5nbGUgbWVzc2FnZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAgaW5DYWxsT3B0aW9ucyBBbiBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBJQ2FsbE9wdGlvbnMgaW50ZXJmYWNlLlxyXG4gICAqIEByZXR1cm4gICAgICAgICAgICAgICBUaGUgcGxhaW4gdGV4dCBib2R5IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRNZXNzYWdlQm9keShpbkNhbGxPcHRpb25zOiBJQ2FsbE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiSU1BUC5Xb3JrZXIuZ2V0TWVzc2FnZUJvZHkoKVwiLCBpbkNhbGxPcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBjbGllbnQ6IGFueSA9IGF3YWl0IHRoaXMuY29ubmVjdFRvU2VydmVyKCk7XHJcblxyXG4gICAgLy8gbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZUpTVHlwZXNcclxuICAgIGNvbnN0IG1lc3NhZ2VzOiBhbnlbXSA9IGF3YWl0IGNsaWVudC5saXN0TWVzc2FnZXMoXHJcbiAgICAgIGluQ2FsbE9wdGlvbnMubWFpbGJveCxcclxuICAgICAgaW5DYWxsT3B0aW9ucy5pZCxcclxuICAgICAgWyBcImJvZHlbXVwiIF0sXHJcbiAgICAgIHsgYnlVaWQgOiB0cnVlIH1cclxuICAgICk7XHJcbiAgICBjb25zdCBwYXJzZWQ6IFBhcnNlZE1haWwgPSBhd2FpdCBzaW1wbGVQYXJzZXIobWVzc2FnZXNbMF1bXCJib2R5W11cIl0pO1xyXG5cclxuICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG5cclxuICAgIHJldHVybiBwYXJzZWQudGV4dCE7XHJcblxyXG4gIH0gLyogRW5kIGdldE1lc3NhZ2VCb2R5KCkuICovXHJcblxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGVzIGEgc2luZ2xlIG1lc3NhZ2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW5DYWxsT3B0aW9ucyBBbiBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBJQ2FsbE9wdGlvbnMgaW50ZXJmYWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGVNZXNzYWdlKGluQ2FsbE9wdGlvbnM6IElDYWxsT3B0aW9ucyk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJJTUFQLldvcmtlci5kZWxldGVNZXNzYWdlKClcIiwgaW5DYWxsT3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QgY2xpZW50OiBhbnkgPSBhd2FpdCB0aGlzLmNvbm5lY3RUb1NlcnZlcigpO1xyXG5cclxuICAgIGF3YWl0IGNsaWVudC5kZWxldGVNZXNzYWdlcyhcclxuICAgICAgaW5DYWxsT3B0aW9ucy5tYWlsYm94LFxyXG4gICAgICBpbkNhbGxPcHRpb25zLmlkLFxyXG4gICAgICB7IGJ5VWlkIDogdHJ1ZSB9XHJcbiAgICApO1xyXG5cclxuICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG5cclxuICB9IC8qIEVuZCBkZWxldGVNZXNzYWdlKCkuICovXHJcblxyXG5cclxufSAvKiBFbmQgY2xhc3MuICovIl19