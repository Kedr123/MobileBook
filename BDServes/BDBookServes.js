import {enablePromise} from 'react-native-sqlite-storage';
enablePromise(true);

export default class BDBookServes {


    // static async onForeignKey(db) {
    //     enablePromise(true);
    //
    //     return new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             "PRAGMA foreign_keys = ON;"
    //             , [], () => {
    //                 resolve(true)
    //             }, (tx, error) => {
    //                 console.log(error)
    //             }
    //         );
    //     })
    //     });
    // }
    static async createTableBooks(db) {
        enablePromise(true);

        return new Promise((resolve, reject) => {
            db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, (error, resultSet) => {});
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY NOT NULL ,Control_sum TEXT,File_name TEXT,File_path TEXT, Title TEXT, Author TEXT, Type TEXT, Pages INTEGER, Bookmark_date TEXT, Bookmark_page TEXT, Cover TEXT);"
                    , [], () => {
                        resolve(true)
                    }, (tx, error) => {
                        console.log(error)
                    }
                );
            });
        });
    }
    static async createTableBookmarks(db) {
        enablePromise(true);

        return new Promise((resolve, reject) => {
            db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, (error, resultSet) => {});
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Bookmarks (id INTEGER PRIMARY KEY NOT NULL ,book_id INTEGER, Title TEXT, Bookmark_date TEXT, Bookmark_page INTEGER);"
                    , [], () => {
                        resolve(true)
                    }, (tx, error) => {
                        console.log(error)
                    }
                );
            });
        });
    }
    // static async createTableBookmarks(db) {
    //     enablePromise(true);
    //
    //     return new Promise((resolve, reject) => {
    //         db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, (error, resultSet) => {});
    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "CREATE TABLE IF NOT EXISTS Bookmarks (id INTEGER PRIMARY KEY NOT NULL ,book_id INTEGER, FOREIGN KEY (book_id) REFERENCES Books(id) ON DELETE CASCADE, Title TEXT, Bookmark_date TEXT, Bookmark_page INTEGER);"
    //                 , [], () => {
    //                     resolve(true)
    //                 }, (tx, error) => {
    //                     console.log(error)
    //                 }
    //             );
    //         });
    //     });
    // }
    static async createTableContents(db) {
        enablePromise(true);

        return new Promise((resolve, reject) => {
            db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, (error, resultSet) => {});
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Contents ( id INTEGER PRIMARY KEY NOT NULL ,book_id INTEGER NOT NULL, name TEXT, content TEXT);"
                    , [], () => {
                        resolve(true)
                    }, (tx, error) => {
                        console.log(error)
                    }
                );
            });
        });
    }

    static async setContentBook(db, request){


        // console.log("Выполнение :  "+request);

        enablePromise(true);

        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                    tx.executeSql(
                        request, [],
                        (tx, results) => {
                            resolve(true)
                        }, (tx, error) => {
                            console.log("\x1b[31m",error);
                        }
                    );
            });
        });
    }

    static async informBDTable(db){

        enablePromise(true);

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT name FROM sqlite_master WHERE type = 'table';", [],
                    (tx, results) => {
                        console.log(results)
                        resolve(true)
                    }, (tx, error) => {
                        console.log(error);
                    }
                );
            });
        });
    }
    // Удалить после проверки
    static async countBD(db){

        enablePromise(true);

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT count(*) FROM Contents WHERE book_id = '20';", [],
                    (tx, results) => {
                        console.log(results)
                        resolve(true)
                    }, (tx, error) => {
                        console.log(error);
                    }
                );
            });
        });
    }


    static getBooks(db, setBooks) {
        db.transaction((tx) => {
            // console.log("results1");
            tx.executeSql(
                'SELECT * FROM Books;', [],
                (tx, {rows}) => {
                    // console.log(rows)

                    setBooks(() => {
                            let books = [];

                            for (let i = 0; i < rows._array.length; i++) {
                                let row = rows.item(i);
                                books.push({
                                    "id": row.id,
                                    "author": row.Author,
                                    "bookmark": row.Bookmark_page,
                                    "url": row.Cover,
                                    "pages": row.Pages,
                                    "title": row.Title,
                                    "type": row.Type,
                                    "fileName": row.File_name,
                                    "filePath": row.File_path,
                                    "cover": row.Cover
                                });
                            }
                            return books;
                        }
                    )


                }
                , (tx, error) => {
                    console.log(error);
                    return 'title';
                });
        });

    }

    static getBook(db, id) {
        let book
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Books WHERE id = ' + id + ';', [],
                (tx, {rows}) => {
                    let row = rows.item(0);
                    book = {
                        "id": row.id,
                        "author": row.Author,
                        "bookmark": row.Bookmark_page,
                        "url": row.Cover,
                        "pages": row.Pages,
                        "title": row.Title,
                        "type": row.Type,

                    };


                }
                , (tx, error) => {
                    console.log(error);
                    return 'title';
                }
            );

        });
        return book

    }

    static async getContentBook(db, id) {
        enablePromise(true);

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM Contents WHERE book_id = ' + id + ';', [],
                    (tx, {rows}) => {
                        resolve(rows);
                    }
                    , (tx, error) => {
                        console.log(error);
                    }
                );

            });
        });

    }
// static getBookshelf() {
//     const Books = this.getBooks();
//     let Bookshelf = [];
//
//     for(let i=0; i<Books.length;i++){
//         console.log(Books)
//     }
//
//     // return Bookshelf
//
// }


//
// ПЕРЕДЕЛАТЬ БД
//
    static async setBook(db, book) {

        enablePromise(true);

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO Books (Control_sum,File_name, File_path, Title, Author, Type, Pages, Bookmark_date, Bookmark_page, Cover) VALUES ('sdfsfsfdsdf', '" + book.File_name + "','" + book.File_path + "','" + book.Title + "','" + book.Author + "','" + book.Type + "'," + book.Pages + ",'" + book.Bookmark_date + "'," + book.Bookmark_page + ",'" + book.Cover + "')", [],
                    (tx, results) => {
                        resolve(true);

                    }, (tx, error) => {
                        console.log(error)
                    }
                );
            });

        });
    }

    static async getEndIdBook(db) {
        enablePromise(true);
        return new Promise((resolve, reject) =>{



        db.transaction((tx) => {
            tx.executeSql("select max(id) from Books", [], (tx, results) => {
                // console.log(results.rows.item(0)["max(id)"]);
                resolve(results.rows.item(0)["max(id)"]);

            }, (tx, error) => {
                console.log(error)
            });
        });



        })

    }
}