import XmlParser from "./XMLParser";
import BDBookServes from "../BDServes/BDBookServes";

export default class EpubBook {

    constructor() {
        this.Book = [];
    }

    addContent(XmlText) {
        // Удалить при изменении концепции
        let XmlDocument = new XmlParser(XmlText);
        XmlDocument = XmlDocument.getSelectByTagName("body")

        // Основной функционал
        let arrContent = this.getContent(XmlDocument)

        this.Book = [...this.Book, ...arrContent];

        // console.log(XmlDocument)
    }

    getContent(XmlObject) {
        let arrContent = [];

        if (XmlObject.name =="img") {
            return [{
                name: XmlObject.name,
                content: XmlObject.attributes["src"]
            }]
        }

        if (XmlObject.nestedTags && XmlObject.nestedTags.length > 0) {

            for (let i = 0; i < XmlObject.nestedTags.length; i++) {

                if(typeof XmlObject.nestedTags[i] == "string")
                    arrContent.push({name:XmlObject.name, content: XmlObject.nestedTags[i]})
                else
                    arrContent = [...arrContent, ...this.getContent(XmlObject.nestedTags[i])]

            }

        }


        return arrContent;
    }

    async saveInBD(db, book_id){
        console.log("start in BD");

        let request = "INSERT INTO Contents (book_id, name, content) VALUES"
        for (let i = 0; i< this.Book.length; i++){

            if (i+1==this.Book.length) request+= " ('" + (book_id) + "','" + this.Book[i].name + "','" + this.Book[i].content.replace("'","''") + "');"
            request+= " ('" + (book_id) + "','" + this.Book[i].name + "','" + this.Book[i].content.replace("'","''") + "'), "

            // console.log("\n"+this.Book.length+" / "+i+"\n")
        }
        await BDBookServes.setContentBook(db,request);

        console.log("end in BD");
        // console.log(await BDBookServes.getContentBook(db, book_id))
    }

    getBook() {
        return this.Book
    }


}