const fs = require("fs");
const crypto = require("crypto");
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

class Dao {
    #path;
    constructor(path) {
        this.path = path;
    }
    set path(val) {
        this.#path = val;
    }
    get path() {
        return this.#path;
    }
    async loadList() {
        let list;
        try {
            list = JSON.parse(await rf(this.path));
        } catch (e) {
            throw new Error("Unable to read from storage");
        }
        return list;
    }
    async listAllList() {
        return await this.loadList();
    }
    async createItem(item) {
        let list = await this.loadList();
        item.id = crypto.randomBytes(8).toString("hex");
        let id = list.find((e) => e.id === item.id);
        if (id !== undefined) {
            throw new Error("pleas try it again");
        }
        list.push(item);
        await wf(this.path, JSON.stringify(list, null, 2));
        return item;
    }
    async getItem(id) {
        let list = await this.loadList();
        return list.find((e) => e.id === id.id);
    }
    async getItemByVal(val){
        let list = await this.loadList();
        return list.find((e) => e.name === val);
    }
    async updateItem(item) {
        let list = await this.loadList();
        let index = list.findIndex((e) => e.id === item.id);
        if (index < 0) {
            throw new Error("this object does not exist");
        }
        list[index] = item;
        await wf(this.path, JSON.stringify(list, null, 2));
        return item;
    }
    async deleteItem(id) {
        let list = await this.loadList();
        const i = list.findIndex((e) => e.id === id.id);
        if (i < 0) {
            throw new Error("this id does not exist");
        }
        list[i].active = false;
        return list[i];
    }
}
module.exports = Dao;