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
exports.resolvers = void 0;
const comment_1 = __importDefault(require("../../services/comment"));
const follow_1 = __importDefault(require("../../services/follow"));
const like_1 = __importDefault(require("../../services/like"));
const post_1 = __importDefault(require("../../services/post"));
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user_1.default.getUserToken({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }),
    getCurrentLoggedInUser: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const user = yield user_1.default.getUserById(id);
            return user;
        }
    }),
    // post resolver queries
    getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield post_1.default.getPosts();
        return posts;
    }),
    getPostById: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Authentication required");
        if (context && context.user) {
            const post = yield post_1.default.getPostById(context.user.id);
            if (post.length == 0)
                throw new Error(`No Posts found for the User - ${context.user.firstName}, id -${context.user.id}`);
            return post;
        }
    }),
    // follower and followee resolver queries
    getFollowing: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const following = yield follow_1.default.getfollowingService(context.user.id);
            console.log(following.map((follow) => follow.followee));
            return following === null || following === void 0 ? void 0 : following.map((follow) => follow.followee);
        }
        throw new Error("Unauthorised");
    }),
    getFollowers: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        const follower = yield follow_1.default.getFollowersService(context.user.id);
        console.log(follower);
        return follower === null || follower === void 0 ? void 0 : follower.map((follow) => follow.follower);
    }),
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.default.createUserService(payload);
        return res.id;
    }),
    // post resolver mutations
    createPost: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Authentication required");
        if (context && context.user) {
            const res = yield post_1.default.createPostService(payload, context.user.id);
            return res;
        }
    }),
    // comment resolver mutations
    createComment: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { postId, content }, context) {
        if (context && context.user) {
            const comment = yield comment_1.default.createCommentService({
                content,
                postId,
                userId: context.user.id,
            });
            return comment;
        }
        throw new Error("Unauthroized");
    }),
    likePost: (_2, _b, context_2) => __awaiter(void 0, [_2, _b, context_2], void 0, function* (_, { postId }, context) {
        if (context && context.user) {
            const like = yield like_1.default.likePostService({
                postId,
                userId: context.user.id,
            });
            return like;
        }
        throw new Error("Unauthorised");
    }),
    // follower and followee resolver mutations
    followUser: (_3, _c, context_3) => __awaiter(void 0, [_3, _c, context_3], void 0, function* (_, { followeeId }, context) {
        if (context && context.user) {
            const follow = yield follow_1.default.followUserService({
                followeeId,
                followerId: context.user.id,
            });
            return follow;
        }
        throw new Error("Unauthorised");
    }),
};
exports.resolvers = { queries, mutations };
