const { request } = require("http");
const path = require("path");
const Ajv = require("ajv").default;
const Dao = require("../dao/Dao");
const Abl = require("./CRUD_ABL");

const dirPath = path.join(__dirname, "..", "storage", "diagramList.json");

const createSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        type: { type: "string" },
        authorList: { type: "array", items: { type: "string" } },
        description: { type: "string" },
        topics: { type: "array", items: { type: "string" } },
        publishDate: { type: "string" },
        img: { type: "string" },
        published: { type: "boolean" },
    },
    required: ["name", "type", "description", "authorList", "topics", "publishDate", "img", "published"]
}
const updateSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        type: { type: "string" },
        authorList: { type: "array", items: { type: "string" } },
        description: { type: "string" },
        topics: { type: "array", items: { type: "string" } },
        publishDate: { type: "string" },
        img: { type: "string" },
        published: { type: "boolean" },
    },
    required: ["id", "name", "type", "description", "authorList", "topics", "publishDate", "img", "published"]
}
const getSchema = { //also delete schema
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"]
}

class DiagramAbl extends Abl{
    constructor() {
        super(createSchema, updateSchema, getSchema, getSchema, dirPath);
    }
}
module.exports = DiagramAbl;