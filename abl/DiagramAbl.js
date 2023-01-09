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
    async createFull(req, res){
        let authorDao = new dao(dirPathAuthor);
        let topicDao = new dao(dirPathTopic);
        try {
            let data = req.body;
            const valid = this.ajv.validate(this.createSchema, data);
            if(!valid){
                res.status(400).send("invalid input");
            }  
            let authorList = data.authorList;
            let knownAuthors = await authorDao.listAllList();
            let containAuthor;
            for(let a of authorList){
                for (let k of knownAuthors){
                    if(k.name === a){
                        containAuthor = k;
                    }
                }
            }
            if(containAuthor){
                data.authorList = [containAuthor.id];
            }
            else {
                containAuthor = await authorDao.createItem({name: authorList[0]});
            }
            data.authorList = [containAuthor.id];
            let topics = data.topics;
            let knownTopics = await topicDao.listAllList();
            let containTopic;
            for(let t of topics){
                for(let k of knownTopics){
                    if(t === k.name){
                        containTopic = k;
                    }
                }
            }
            if(!containTopic){
                res.status(400).send("This topic does not exist");
            }
            data.topics = [containTopic.id];
            await this.dao.createItem(data);
            res.json(data);
        }
        catch(e){
            res.status(500).send(e);
        }
    }
    async updateFull(req,res){
        let authorDao = new dao(dirPathAuthor);
        let topicDao = new dao(dirPathTopic);
        try{
            let body = req.body;
            const valid = this.ajv.validate(updateSchema,body);
            if(!valid){
                res.status(400).send("invalid input");
                return;
            }
            let authorId = (await authorDao.getItemByVal(body.authorList[0]));
            let topicId = (await topicDao.getItemByVal(body.topics[0]));
            if(authorId && topicId){
                body.authorList[0] = authorId.id;
                body.topics[0] = topicId.id;
                req.body = body;
                res.json(await this.dao.updateItem(req.body));
                return;
            }
            res.status(400).send("invalidInput");
            return;

        }catch(e){
            res.status(500).send(e);
        }
    }
}
module.exports = DiagramAbl;