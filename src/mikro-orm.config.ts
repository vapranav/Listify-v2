import { dbName, password, user, __prod__ } from "./constants";
import { Category } from "./entities/Category";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Category],
    dbName: dbName,
    type: "postgresql",
    user: user,
    password: password,
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];