"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class PostService {
    static createPostService(payload, userId) {
        return db_1.prismaClient.post.create({
            data: {
                content: payload.content,
                imageURL: payload.imageUrl,
                userId: userId,
            },
            include: { user: true, likes: true, comments: true },
        });
    }
    static getPosts() {
        return db_1.prismaClient.post.findMany({
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
                likes: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }
    static getPostById(id) {
        return db_1.prismaClient.post.findMany({
            where: { userId: id },
            include: {
                user: true,
                likes: {
                    include: {
                        user: true,
                    },
                },
                comments: true,
            },
        });
    }
}
exports.default = PostService;
