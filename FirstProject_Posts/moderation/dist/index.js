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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('/event', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, type } = req.body;
    console.log("chegou algo aqui: ", data, type);
    if (type === 'CommentCreated') {
        const status = String(String(data.content).toLocaleLowerCase()).includes('orange') ? 'rejected' : 'approved';
        yield axios_1.default.post('http://127.0.0.1:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        });
    }
    res.send();
}));
app.listen(4003, function () {
    console.log('Listening on 4003');
});
