const { request } = require("http");
const path = require("path");
const Ajv = require("ajv").default;
const Dao = require("../dao/Dao");
const Abl = require("./CRUD_ABL");

const dirPath = path.join(__dirname,"..","storage","topicList.json");
const createSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" }
    },
    required: ["name", "description"]
}
const updateSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" }
    },
    required: ["name", "description", "id"]
}
const getSchema = { //also delete schema
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"]
}

class TopicAbl extends Abl{
    constructor() {
        super(createSchema,updateSchema, getSchema, getSchema, dirPath);
    }
}
module.exports = TopicAbl;