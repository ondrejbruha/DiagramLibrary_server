const Ajv = require("ajv").default;
const Dao = require("../dao/Dao");

class Abl {
    constructor(createSchema, updateSchema, getSchema, deleteSchema, dirPath) {
        this.createSchema = createSchema;
        this.updateSchema = updateSchema;
        this.getSchema = getSchema;
        this.deleteSchema = deleteSchema;
        this.ajv = new Ajv();
        this.dao = new Dao(dirPath);
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
            const valid = this.ajv.validate(this.deleteSchema, req.body);
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
module.exports = Abl;