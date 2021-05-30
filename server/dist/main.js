"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var ServerInfo_1 = require("./ServerInfo");
var IMAP = __importStar(require("./IMAP"));
var SMTP = __importStar(require("./SMTP"));
var Contacts = __importStar(require("./Contacts"));
var app = express_1.default();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
// GET mailboxes
app.get("/mailboxes", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, mailboxes, inError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.listMailboxes()];
            case 1:
                mailboxes = _a.sent();
                inResponse.json(mailboxes);
                return [3 /*break*/, 3];
            case 2:
                inError_1 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET a list of messages in a specific mailbox
app.get("/mailboxes/:mailbox", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messages, inError_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.listMessages({
                        mailbox: inRequest.params.mailbox
                    })];
            case 1:
                messages = _a.sent();
                inResponse.json(messages);
                return [3 /*break*/, 3];
            case 2:
                inError_2 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get a Message
app.get("/messages/:mailbox/:id", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messageBody, inError_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.getMessageBody({
                        mailbox: inRequest.params.mailbox,
                        id: parseInt(inRequest.params.id, 10)
                    })];
            case 1:
                messageBody = _a.sent();
                inResponse.send(messageBody);
                return [3 /*break*/, 3];
            case 2:
                inError_3 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete a Message
app.delete("/messages/:mailbox/:id", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, inError_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.deleteMessage({
                        mailbox: inRequest.params.mailbox,
                        id: parseInt(inRequest.params.id, 10)
                    })];
            case 1:
                _a.sent();
                inResponse.send("ok");
                return [3 /*break*/, 3];
            case 2:
                inError_4 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Send [POST] a message
app.post("/messages", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var smtpWorker, inError_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                smtpWorker = new SMTP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, smtpWorker.sendMessage(inRequest.body)];
            case 1:
                _a.sent();
                inResponse.send("ok");
                return [3 /*break*/, 3];
            case 2:
                inError_5 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET list contacts
app.get("/contacts", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var contactWorker, contacts, inError_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactWorker = new Contacts.Worker();
                return [4 /*yield*/, contactWorker.listContacts()];
            case 1:
                contacts = _a.sent();
                inResponse.json(contacts);
                return [3 /*break*/, 3];
            case 2:
                inError_6 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Add Contacts
app.post("/contacts", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var contactWorker, contact, inError_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactWorker = new Contacts.Worker();
                return [4 /*yield*/, contactWorker.addContact(inRequest.body)];
            case 1:
                contact = _a.sent();
                inResponse.json(contact);
                return [3 /*break*/, 3];
            case 2:
                inError_7 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete Contact
app.delete("/contacts/:id", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var contactsWorker, inError_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactsWorker = new Contacts.Worker();
                return [4 /*yield*/, contactsWorker.deleteContact(inRequest.params.id)];
            case 1:
                _a.sent();
                inResponse.send("ok");
                return [3 /*break*/, 3];
            case 2:
                inError_8 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Start app listening.
app.listen(80, function () {
    console.log("MailBag server open for requests");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QixvREFBNEU7QUFDNUUsMkNBQTBDO0FBQzFDLDJDQUErQjtBQUMvQiwyQ0FBK0I7QUFDL0IsbURBQXVDO0FBR3ZDLElBQU0sR0FBRyxHQUFZLGlCQUFPLEVBQUUsQ0FBQztBQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVMsU0FBa0IsRUFBRSxVQUFvQixFQUFFLE1BQW9CO0lBQzNFLFVBQVUsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsVUFBVSxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFDaEQsNEJBQTRCLENBQUMsQ0FBQztJQUM5QixVQUFVLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUNoRCxnREFBZ0QsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sRUFBRSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUE7QUFFRixnQkFBZ0I7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQ2hCLFVBQU0sU0FBa0IsRUFBRSxVQUFvQjs7Ozs7O2dCQUVoQyxVQUFVLEdBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLENBQUM7Z0JBQ3pCLHFCQUFNLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBQTs7Z0JBQTdELFNBQVMsR0FBb0Is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b20gXCJwYXRoXCI7XHJcbmltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBzZXJ2ZXJJbmZvIH0gZnJvbSBcIi4vU2VydmVySW5mb1wiO1xyXG5pbXBvcnQgKiBhcyBJTUFQIGZyb20gXCIuL0lNQVBcIjtcclxuaW1wb3J0ICogYXMgU01UUCBmcm9tIFwiLi9TTVRQXCI7XHJcbmltcG9ydCAqIGFzIENvbnRhY3RzIGZyb20gXCIuL0NvbnRhY3RzXCI7XHJcbmltcG9ydCB7IElDb250YWN0IH0gZnJvbSBcIi4vQ29udGFjdHNcIjtcclxuXHJcbmNvbnN0IGFwcDogRXhwcmVzcyA9IGV4cHJlc3MoKTtcclxuYXBwLnVzZShleHByZXNzLmpzb24oKSk7XHJcbmFwcC51c2UoXCIvXCIsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vY2xpZW50L2Rpc3RcIikpKTtcclxuYXBwLnVzZShmdW5jdGlvbihpblJlcXVlc3Q6IFJlcXVlc3QsIGluUmVzcG9uc2U6IFJlc3BvbnNlLCBpbk5leHQ6IE5leHRGdW5jdGlvbil7XHJcbiAgICBpblJlc3BvbnNlLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICBpblJlc3BvbnNlLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIiwgXHJcbiAgICBcIkdFVCwgUE9TVCwgREVMRVRFLCBPUFRJT05TXCIpO1xyXG4gICAgaW5SZXNwb25zZS5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsXHJcbiAgICBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHRcIik7XHJcbiAgICBpbk5leHQoKTtcclxufSlcclxuXHJcbi8vIEdFVCBtYWlsYm94ZXNcclxuYXBwLmdldChcIi9tYWlsYm94ZXNcIixcclxuICAgIGFzeW5jKGluUmVxdWVzdDogUmVxdWVzdCwgaW5SZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpbWFwV29ya2VyOiBJTUFQLldvcmtlciA9IG5ldyBJTUFQLldvcmtlcihzZXJ2ZXJJbmZvKTtcclxuICAgICAgICAgICAgY29uc3QgbWFpbGJveGVzOiBJTUFQLklNYWlsYm94W10gPSBhd2FpdCBpbWFwV29ya2VyLmxpc3RNYWlsYm94ZXMoKTtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5qc29uKG1haWxib3hlcylcclxuICAgICAgICB9IGNhdGNoKGluRXJyb3IpIHtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuLy9HRVQgYSBsaXN0IG9mIG1lc3NhZ2VzIGluIGEgc3BlY2lmaWMgbWFpbGJveFxyXG5hcHAuZ2V0KFwiL21haWxib3hlcy86bWFpbGJveFwiLFxyXG4gICAgYXN5bmMgKGluUmVxdWVzdDogUmVxdWVzdCwgaW5SZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpbWFwV29ya2VyOiBJTUFQLldvcmtlciA9IG5ldyBJTUFQLldvcmtlcihzZXJ2ZXJJbmZvKVxyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlczogSU1BUC5JTWVzc2FnZSBbXSA9IGF3YWl0IGltYXBXb3JrZXIubGlzdE1lc3NhZ2VzKHtcclxuICAgICAgICAgICAgICAgIG1haWxib3g6IGluUmVxdWVzdC5wYXJhbXMubWFpbGJveFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5qc29uKG1lc3NhZ2VzKTtcclxuICAgICAgICB9IGNhdGNoIChpbkVycm9yKSB7XHJcbiAgICAgICAgICAgIGluUmVzcG9uc2Uuc2VuZChcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gR2V0IGEgTWVzc2FnZVxyXG5hcHAuZ2V0KFwiL21lc3NhZ2VzLzptYWlsYm94LzppZFwiLFxyXG4gICAgYXN5bmMgKGluUmVxdWVzdDogUmVxdWVzdCwgaW5SZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpbWFwV29ya2VyOiBJTUFQLldvcmtlciA9IG5ldyBJTUFQLldvcmtlcihzZXJ2ZXJJbmZvKVxyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQm9keTogc3RyaW5nID0gYXdhaXQgaW1hcFdvcmtlci5nZXRNZXNzYWdlQm9keSh7XHJcbiAgICAgICAgICAgICAgICBtYWlsYm94OiBpblJlcXVlc3QucGFyYW1zLm1haWxib3gsXHJcbiAgICAgICAgICAgICAgICBpZDogcGFyc2VJbnQoaW5SZXF1ZXN0LnBhcmFtcy5pZCwgMTApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpblJlc3BvbnNlLnNlbmQobWVzc2FnZUJvZHkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGluRXJyb3IpIHtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gRGVsZXRlIGEgTWVzc2FnZVxyXG5hcHAuZGVsZXRlKFwiL21lc3NhZ2VzLzptYWlsYm94LzppZFwiLFxyXG4gICAgYXN5bmMgKGluUmVxdWVzdDogUmVxdWVzdCwgaW5SZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpbWFwV29ya2VyOiBJTUFQLldvcmtlciA9IG5ldyBJTUFQLldvcmtlcihzZXJ2ZXJJbmZvKTtcclxuICAgICAgICAgICAgYXdhaXQgaW1hcFdvcmtlci5kZWxldGVNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIG1haWxib3g6IGluUmVxdWVzdC5wYXJhbXMubWFpbGJveCxcclxuICAgICAgICAgICAgICAgIGlkOiBwYXJzZUludChpblJlcXVlc3QucGFyYW1zLmlkLCAxMClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGluUmVzcG9uc2Uuc2VuZChcIm9rXCIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGluRXJyb3IpIHtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gU2VuZCBbUE9TVF0gYSBtZXNzYWdlXHJcbmFwcC5wb3N0KFwiL21lc3NhZ2VzXCIsXHJcbiAgICBhc3luYyAoaW5SZXF1ZXN0OiBSZXF1ZXN0LCBpblJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNtdHBXb3JrZXI6IFNNVFAuV29ya2VyID0gbmV3IFNNVFAuV29ya2VyKHNlcnZlckluZm8pO1xyXG4gICAgICAgICAgICBhd2FpdCBzbXRwV29ya2VyLnNlbmRNZXNzYWdlKGluUmVxdWVzdC5ib2R5KTtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwib2tcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoaW5FcnJvcikge1xyXG4gICAgICAgICAgICBpblJlc3BvbnNlLnNlbmQoXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcblxyXG4vLyBHRVQgbGlzdCBjb250YWN0c1xyXG5hcHAuZ2V0KFwiL2NvbnRhY3RzXCIsXHJcbiAgICBhc3luYyAoaW5SZXF1ZXN0OiBSZXF1ZXN0LCBpblJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RXb3JrZXI6IENvbnRhY3RzLldvcmtlciA9IG5ldyBDb250YWN0cy5Xb3JrZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdHM6IElDb250YWN0W10gPSBhd2FpdCBjb250YWN0V29ya2VyLmxpc3RDb250YWN0cygpO1xyXG4gICAgICAgICAgICBpblJlc3BvbnNlLmpzb24oY29udGFjdHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGluRXJyb3IpIHtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gQWRkIENvbnRhY3RzXHJcbmFwcC5wb3N0KFwiL2NvbnRhY3RzXCIsIFxyXG4gICAgYXN5bmMoaW5SZXF1ZXN0OiBSZXF1ZXN0LCBpblJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RXb3JrZXI6IENvbnRhY3RzLldvcmtlciA9IG5ldyBDb250YWN0cy5Xb3JrZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdDogSUNvbnRhY3QgPSBhd2FpdCBjb250YWN0V29ya2VyLmFkZENvbnRhY3QoaW5SZXF1ZXN0LmJvZHkpO1xyXG4gICAgICAgICAgICBpblJlc3BvbnNlLmpzb24oY29udGFjdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gY2F0Y2ggKGluRXJyb3IpIHtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gRGVsZXRlIENvbnRhY3RcclxuYXBwLmRlbGV0ZShcIi9jb250YWN0cy86aWRcIixcclxuICAgIGFzeW5jIChpblJlcXVlc3Q6IFJlcXVlc3QsIGluUmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdHNXb3JrZXI6IENvbnRhY3RzLldvcmtlciA9IG5ldyBDb250YWN0cy5Xb3JrZXIoKTtcclxuICAgICAgICAgICAgYXdhaXQgY29udGFjdHNXb3JrZXIuZGVsZXRlQ29udGFjdChpblJlcXVlc3QucGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgaW5SZXNwb25zZS5zZW5kKFwib2tcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoaW5FcnJvcikge1xyXG4gICAgICAgICAgICBpblJlc3BvbnNlLnNlbmQoXCJlcnJvclwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuXHJcbi8vIFN0YXJ0IGFwcCBsaXN0ZW5pbmcuXHJcbmFwcC5saXN0ZW4oODAsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTWFpbEJhZyBzZXJ2ZXIgb3BlbiBmb3IgcmVxdWVzdHNcIik7XHJcbiAgfSk7Il19