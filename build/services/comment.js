"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class commentService {
    static createCommentService(payload) {
        const { content, postId, userId } = payload;
        return db_1.prismaClient.comment.create({
            data: {
                content,
                postId,
                userId,
                updatedAt: new Date(),
            },
            include: { user: true, post: true },
        });
    }
}
exports.default = commentService;
