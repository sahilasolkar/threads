"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class FollowService {
    static followUserService({ followeeId, followerId, }) {
        return db_1.prismaClient.follow.create({
            data: {
                followeeId,
                followerId,
            },
            include: {
                followee: true,
                follower: true,
            },
        });
    }
    static getfollowingService(userId) {
        return db_1.prismaClient.follow.findMany({
            where: { followerId: userId },
            include: { followee: true },
        });
    }
    static getFollowersService(userId) {
        return db_1.prismaClient.follow.findMany({
            where: { followeeId: userId },
            include: { follower: true },
        });
    }
}
exports.default = FollowService;
