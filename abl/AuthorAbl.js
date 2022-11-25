const { request } = require("http");
const path = require("path");
const Ajv = require("ajv").default;
const Dao = require("../dao/Dao");

class AuthorAbl {
    constructor() {
        this.ajv = new Ajv();
        this.dao = new Dao(path.join("__dirname", "..", "storage", "AuthorList.json"));
        this.createSchema = {
            type: "object",
            properties: {
                name: { type: "string" }
            },
            required: ["name"]
        }
        this.updateSchema = {
            type: "object",
            properties: {
                name: { type: "string" },
                id: { type: "string" }
            },
            required: ["name", "id"]
        }
        this.getSchema = { //also delete schema
            type: "object",
            properties: {
                id: { type: "string" },
            },
            required: ["id"]
        }

    }
    async create(req, res) {
        try {
            const valid = this.ajv.validate(this.createSchema, req.body);
            if (valid) {
                res.json(await this.dao.createItem(req.body));
            }
            else {
                res.status(400).send("invalid input");
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
    async update(req, res) {
        try {
            const valid = this.ajv.validate(this.updateSchema, req.body);
            if (valid) {
                res.json(await this.dao.updateItem(req.body));
            }
            else {
                res.status(400).send("invalid input");
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
    async get(req, res) {
        try {
            const valid = this.ajv.validate(this.getSchema, req.body);
            if (valid) {
                res.json(await this.dao.getItem(req.body));
            }
            else {
                res.status(400).send("invalid input");
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
    async delete(req, res) {
        try {
            const valid = this.ajv.validate(this.getSchema, req.body);
            if (valid) {
                res.json(await this.dao.deleteItem(req.body));
            }
            else {
                res.status(400).send("invalid input");
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
    async list(req, res) {
        try {
            res.json(await this.dao.listAllList(req.body));
        } catch (e) {
            res.status(500).send(e);
        }
    }
}
module.exports = AuthorAbl;