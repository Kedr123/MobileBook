import XmlParser from "../MyModules/XMLParser";
import * as FileSystem from "expo-file-system";
import EpubBook from "../MyModules/EpubBook";

export default class BookServes {

    static PagesCalculation(bookContent) {
        let countPages;


        return bookContent? countPages : 16000
    }

    static async readTextFile(file)
    {
        let XmlContent = await FileSystem.readAsStringAsync(file);
        return XmlContent.replace(/(\r\n|\n|\r)/gm," ")
    }

    static async getEpubBookInfo(linkOpfFile){

        // console.log("\x1b[32m","start")

        let opfContent = await BookServes.readTextFile(linkOpfFile)
        let opfXmlDom = new XmlParser(opfContent)

        let path = linkOpfFile.split('/')
        path.pop()
        path = path.join('/')+'/'
        let cover;
        try {
            console.log("\x1b[32m","cover start")
            let imgXml = await BookServes.readTextFile(path + opfXmlDom.getSelectByTagName('reference').attributes.href)
            imgXml = new XmlParser(imgXml)
            console.log("\x1b[32m","end")
            // console.log(imgXml.getXmlDocument())

            if (imgXml.getSelectByTagName('img')) {
                cover = path + imgXml.getSelectByTagName('img').attributes.src
            } else {
                // await FileSystem.readDirectoryAsync('file:///data/user/0/ModileBook.apk/cache/DocumentPicker/default.png').then( async (uri)=>{
                //     arrUri=uri
                // })


                cover = 'null'

            }
        }catch (e) {
            cover = 'null'
        }
        console.log("\x1b[32m","reg")
        let book = {
            File_name:linkOpfFile.split('/')[linkOpfFile.split('/').length-1],
            File_path:linkOpfFile,
            Title:opfXmlDom.getSelectByTagName('dc:title')? opfXmlDom.getSelectByTagName('dc:title').nestedTags[0]: 'Не указано',
            Author:opfXmlDom.getSelectByTagName('dc:publisher')?opfXmlDom.getSelectByTagName('dc:publisher').nestedTags[0]: 'Не указано',
            Type:'EPUB',
            Pages: this.PagesCalculation(''),
            Bookmark_date: new Date(),
            Bookmark_page:0,
            Cover: cover,
        }

        return book
    }

    static async getListLinkFilesContent(linkOptFile){
        let dir = linkOptFile.split('/')
        dir.pop()
        dir = dir.join('/')+'/'
        console.log("\x1b[32m","list start")
        let optFile = await BookServes.readTextFile(linkOptFile);
        let document = new XmlParser(optFile);
        let spine = document.getSelectByCustom("toc", "ncx");

        let refs = [];
        let links = [];
        // console.log(spine)
        let tags = spine.nestedTags;
        // console.log(tags)
        let i;
        for( i in spine.nestedTags){
            if(spine.nestedTags[i].attributes){
                refs.push(tags[i].attributes.idref);
            }
            // console.log(spine.nestedTags[i].attributes)
            // console.log(spine.nestedTags[i])
        }

        // console.log(refs)

        for(let j = 0; j<refs.length; j++){
            links.push(dir+document.getSelectByCustom('id', refs[j]).attributes.href);
        }
// console.log(links)
        return links;

    }

    static async saveEpubBookInBD(db, id, book){
        console.log("f"+id);
        let epubBook = new EpubBook();
        for(let i =0; i<book.length; i++){
            let b = await BookServes.readTextFile(book[i])
            // console.log(b)
            epubBook.addContent(b);
            console.log("Save to - "+book[i]);
        }
        console.log("To BD");
       await epubBook.saveInBD(db, id);
        console.log("Yes BD");

    }


}