export default class BDBookServes {


    static createTable(db) {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY NOT NULL ,Control_sum TEXT,File_name TEXT,File_path TEXT, Title TEXT, Author TEXT, Type TEXT, Pages INTEGER, Bookmark_date TEXT, Bookmark_page TEXT, Cover TEXT); CREATE TABLE IF NOT EXISTS Bookmarks (ID INTEGER PARAMETER KEY AUTOINCREMENT,Book_id INTEGER, FOREIGN KEY (Book_id) REFERENCES Books(ID) ON DELETE CASCADE, Title TEXT, Bookmark_date TEXT, Bookmark_page INTEGER);"
                , [], () => {
                }, (tx, error) => {
                    console.log(error)
                }
            );
        })
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
        console.log('2')
        let result

        await db.transaction(async (tx) => {
            console.log('3')
            try {
                await tx.executeSql(
                    // "INSERT INTO Books (Control_sum,File_name, File_path, Title, Author, Type, Pages, Bookmark_date, Bookmark_page, Cover) VALUES ('"+book.File_name+"','"+book.File_path+"','"+book.Title+"','"+book.Author+"','"+book.Type+"','"+book.Pages+"','"+book.Bookmark_date+"','"+book.Bookmark_page+"','"+book.Cover+"','"++"')", [book.File_name, book.File_path, book.Title, book.Author, book.Type, book.Pages, book.Bookmark_date, book.Bookmark_page, book.Cover],
                    "INSERT INTO Books (Control_sum,File_name, File_path, Title, Author, Type, Pages, Bookmark_date, Bookmark_page, Cover) VALUES ('sdfsfsfdsdf', '" + book.File_name + "','" + book.File_path + "','" + book.Title + "','" + book.Author + "','" + book.Type + "'," + book.Pages + ",'" + book.Bookmark_date + "'," + book.Bookmark_page + ",'" + book.Cover + "')", [],
                    // "INSERT INTO Books (Control_sum,File_name, File_path, Title, Author, Type, Pages, Bookmark_date, Bookmark_page, Cover) VALUES ('fsdsdlsjklsdhfdhk','sdfsd','dsf','sd','sd','sdfs',16000,'2022.02.02',0,'asdsaaa')",[],
                    (tx, results) => {
                        console.log('4')
                        result = true
                    }, (tx, error) => {
                        console.log('5')
                        result = error
                    }
                )
                console.log('5.5')
            } catch (e) {
                console.log(e)
            }
            console.log('6')
        });
        return result
    }
}