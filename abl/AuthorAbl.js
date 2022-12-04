const { request } = require("http");
const path = require("path");
const Abl = require("./CRUD_ABL");

const dirPath = path.join(__dirname, "..", "storage", "authorList.json");

const createSchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"]
}
const updateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        id: { type: "string" }
    },
    required: ["name", "id"]
}
const getSchema = { //also delete schema
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"]
}

class AuthorAbl extends Abl {
    constructor() {
        super(createSchema, updateSchema, getSchema, getSchema, dirPath);
    }
}

module.exports = AuthorAbl;