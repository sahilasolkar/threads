"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class likeService {
    static likePostService(payload) {
        const { postId, userId } = payload;
        return db_1.prismaClient.like.create({
            data: {
                postId,
                userId,
            },
            include: { user: true, post: true },
        });
    }
}
exports.default = likeService;
