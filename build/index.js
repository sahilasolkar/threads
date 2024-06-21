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
const graphql_1 = __importDefault(require("./graphql"));
const express4_1 = require("@apollo/server/express4");
const user_1 = __importDefault(require("./services/user"));
const cors_1 = __importDefault(require("cors"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: "http://localhost:3000", // Frontend URL
            credentials: true, // If you need to allow cookies or other credentials
        }));
        app.get("/", (req, res) => {
            res.json({ message: "server is up and running" });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)(), {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const token = req.headers["token"];
                try {
                    const user = user_1.default.decodeJWTToken(token);
                    return { user };
                }
                catch (error) {
                    return {};
                }
            }),
        }));
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    });
}
init();
