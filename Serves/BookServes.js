import XmlParser from "../MyModules/XMLParser";
import * as FileSystem from "expo-file-system";

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

        let opfContent = await BookServes.readTextFile(linkOpfFile)
        let opfXmlDom = new XmlParser(opfContent)

        let path = linkOpfFile.split('/')
        path.pop()
        path = path.join('/')+'/'

        let imgXml = await BookServes.readTextFile(path+opfXmlDom.getSelectByTagName('reference').attributes.href)
        imgXml = new XmlParser(imgXml)

        console.log(imgXml.getXmlDocument())
        let cover
        if(imgXml.getSelectByTagName('img')){
            cover = path+imgXml.getSelectByTagName('img').attributes.src
        }
        else {
            // await FileSystem.readDirectoryAsync('file:///data/user/0/ModileBook.apk/cache/DocumentPicker/default.png').then( async (uri)=>{
            //     arrUri=uri
            // })


            cover = 'null'

        }

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


}