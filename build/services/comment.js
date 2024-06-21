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
    static getCommentByPostIdService(payload) {
        const { postId } = payload;
        return db_1.prismaClient.comment.findMany({
            where: { postId },
            include: {
                user: true,
            },
        });
    }
}
exports.default = commentService;
