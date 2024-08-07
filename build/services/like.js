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
    static unlikePostService(payload) {
        const { postId, userId } = payload;
        return db_1.prismaClient.like.deleteMany({
            where: { postId: { contains: postId }, userId: { contains: userId } },
        });
    }
    static getLikesByPostIdService(payload) {
        const { postId } = payload;
        return db_1.prismaClient.like.findMany({
            where: { postId },
            include: {
                user: true,
            },
        });
    }
}
exports.default = likeService;
