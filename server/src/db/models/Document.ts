import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface DocumentAttributes {
    id: number;
    name: string;
    type: string;
    data: any;
};

export interface DocumentInput extends Optional<DocumentAttributes, 'id'> {}
export interface DocumentOutput extends Required<DocumentAttributes> {}

class Document extends Model<DocumentAttributes, DocumentInput> implements DocumentAttributes {
    public id!: number;
    public name!: string;
    public type!: string;
    public data!: Blob;
};

Document.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    modelName: 'Document'
});

export default Document;