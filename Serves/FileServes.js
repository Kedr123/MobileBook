import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {unzip} from 'react-native-zip-archive';
import BookServes from "./BookServes";
import BDBookServes from "../BDServes/BDBookServes";
import * as SQLite from "expo-sqlite";
// import DomSelector from 'react-native-dom-parser';
// let DOMParser = require('xmldom').DOMParser;
// import {DOMParser} from "xmldom";


const db = SQLite.openDatabase('MobileBookBD.db', '', '', '', (tx) => {
    console.log("db connect true")
});

export default class FileServes {

    // static async defaultFiles() {
    //     let img =  './../assets/Icons/default.png'
    //
    //     let response = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'staticFiles')
    //     if (!response.isDirectory){
    //         await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'staticFiles')
    //         console.log(img)
    //         await FileSystem.downloadAsync(img,FileSystem.documentDirectory + 'staticFiles/')
    //     }
    // }


    static async addEpubBook(file) {
        // console.log(results.uri)
    }

    static async readTextFile(file) {
        let XmlContent = await FileSystem.readAsStringAsync(file);
        return XmlContent.replace(/(\r\n|\n|\r)/gm, " ")
    }

    static async genericUniqueDirectory() {
        let items = ['0', '2', '1', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
        let result = ''
        for (let i = 0; i < 16; i++) {
            result += items[Math.floor(Math.random() * items.length)]
        }

        let arrUri = []

        await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+'DocumentPicker/').then(async (uri) => {
            arrUri = uri
        })

        while (true) {
            arrUri = []

            await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+'DocumentPicker/').then(async (uri) => {
                arrUri = uri
            })
            let check = true
            for (let i = 0; i < arrUri.length; i++) {
                if (result == arrUri[i]) {
                    check = false
                }
            }
            if (check) {
                return result
            }

            result = ''
            for (let i = 0; i < 16; i++) {
                result += items[Math.floor(Math.random() * items.length)]
            }
        }


    }

    static async searchOptFile(directory, filesName) {
        for (let i = 0; i < filesName.length; i++) {
            let type = filesName[i].split('.')
            type = type[type.length - 1]

            if (type == 'opf') {
                return directory + filesName[i];
            } else {
                let result
                await FileSystem.readDirectoryAsync(directory + filesName[i] + '/').then(async (uri) => {
                    result = await FileServes.searchOptFile(directory + filesName[i] + '/', uri);
                }).catch((error) => {
                    return false
                });

                if (result) {
                    return result
                }
            }
        }

        return null;
    }


    static async getMenuFile(setBooks) {
        // console.log("\x1b[32m","open file start")
        await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
            type: ['application/epub+zip']
        }).then(async (results) => {
            // console.log("\x1b[32m","open file true")
            let name = await FileServes.genericUniqueDirectory();
            let dir = FileSystem.cacheDirectory+"DocumentPicker/"+ name+"/";

            await unzip(results.uri, FileSystem.cacheDirectory+'DocumentPicker/' + name)
                .then(async (path) => {
                    // console.log("\x1b[32m","unzip file true")
                    if (results != undefined) {
                        switch (results.mimeType) {
                            case 'application/epub+zip': {
                                // console.log("\x1b[32m","file = EPUB")
                                let url = results.uri.replace(results.name, '')
                                let optFile

                                await FileSystem.readDirectoryAsync(dir).then(async (uri) => {

                                    optFile = await FileServes.searchOptFile(dir, uri);
                                    // console.log("\x1b[32m","opf file search = true")

                                }).catch((error) => {
                                    // console.log("\x1b[31m","opf file search = false")
                                });

                                // console.log("\x1b[32m","opf file true")
                                let book = await BookServes.getEpubBookInfo(optFile);

                                console.log("\x1b[32m","get Book info = true")
                                // let book = await BookServes.getEpubBookInfo(optFile)
                                await BDBookServes.setBook(db,book);

                                // Получение id последней добавленной книги
                                let idBook = await BDBookServes.getEndIdBook(db);

                                //Получение списка ссылок на файлы для чтения
                                let links =await BookServes.getListLinkFilesContent(optFile);

                                await BookServes.saveEpubBookInBD(db,idBook,links);

                                // Подгрузка загруженной книги в список для отображения на главнной странице
                                BDBookServes.getBooks(db, setBooks);

                            }
                        }
                    }


                })
                .catch((error) => {
                    console.error(error)
                })


        });
    }


}