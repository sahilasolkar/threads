"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const typedef_1 = require("./typedef");
exports.Post = { typedef: typedef_1.typedef, queries: queries_1.queries, mutations: mutations_1.mutations, resolvers: resolvers_1.resolvers };
