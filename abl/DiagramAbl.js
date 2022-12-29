const path = require("path");
const Abl = require("./CRUD_ABL");
const dao = require("../dao/Dao");

const dirPath = path.join(__dirname, "..", "storage", "DiagramList.json");
const dirPathAuthor = path.join(__dirname, "..", "storage", "AuthorList.json");
const dirPathTopic = path.join(__dirname, "..", "storage", "TopicList.json");

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
    async listFull(req, res){
        let authorDao = new dao(dirPathAuthor);
        let topicDao = new dao(dirPathTopic);
        try{
            let data = await this.dao.listAllList();
            let outData = [];
            for(let i = 0; i < data.length; i++){
                outData.push(data[i]);
                let authorList = [];
                for(let j = 0; j < data[j].authorList.length; j++){
                    authorList.push((await authorDao.getItem({id: data[i].authorList[j]})).name);
                }
                outData[i].authorList = authorList;
                let topicList = [];
                for(let j = 0; j < data[j].topics.length; j++){
                    topicList.push((await topicDao.getItem({id: data[i].topics[j]})).name);
                }
                outData[i].topics = topicList;
            }
            res.json(outData);

        }
        catch (e) {
            res.status(500).send(e);
        }
    }
}
module.exports = DiagramAbl;