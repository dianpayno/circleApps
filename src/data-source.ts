import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "payno17",
    database: "db_circle_apps",
    synchronize: true,
    logging: false,
    entities: ["./src/entity/*.ts"],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
})
