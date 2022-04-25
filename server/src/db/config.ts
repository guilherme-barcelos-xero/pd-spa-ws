import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

export default sequelizeConnection;