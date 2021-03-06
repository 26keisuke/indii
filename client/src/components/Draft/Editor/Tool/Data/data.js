export const nameList = [
    "ウェブ",
    "ニュース",
    "本",
    "本の章",
    "雑誌",
    "論文",
    "メディア",
    "その他"
]

export const stateName = [
    "website",
    "news",
    "book",
    "chapter",
    "journal",
    "paper",
    "media",
    "general",
]

export const websiteList = [
    {
        name: "タイトル",
        stateName: "title",
        placeholder: "タイトル",
        required: true,
    },
    {
        name: "URL",
        stateName: "url",
        placeholder: "URL",
        required: true,
        isValid: null,
    },
    {
        name: "著者",
        stateName: "author",
        placeholder: "著者名",
        required: true,
    },
    {
        name: "掲載日",
        stateName: "postDate",
        date: true,
    },
    {
        name: "サイト名",
        stateName: "website",
        placeholder: "サイト名",
    },
]

export const newsList = [
    {
        name: "タイトル",
        stateName: "title",
        placeholder: "タイトル",
        required: true,
    },
    {
        name: "ソース",
        stateName: "source",
        placeholder: "ソース元の名前",
        required: true,
    },
    {
        name: "掲載日",
        stateName: "postDate",
        date: true,
        required: true,
    },
    {
        name: "著者",
        stateName: "author",
        placeholder: "著者名",
    },
    {
        name: "URL",
        stateName: "url",
        placeholder: "URL",
        isValid: null,
    },
]

export const journalList = [
    {
        name: "著者",
        stateName: "author",
        placeholder: "著者名",
        required: true,
    },
    {
        name: "タイトル",
        stateName: "title",
        placeholder: "タイトル",
        required: true,
    },
    {
        name: "ソース",
        stateName: "source",
        placeholder: "ソース元の名前",
        required: true,
    },
    {
        name: "掲載日",
        stateName: "postDate",
        date: true,
        required: true,
    },
    {
        name: "ページ",
        stateName: "page",
        required: true,
        placeholder: "ページ"
    },
    {
        name: "DOI",
        stateName: "doi",
        placeholder: "DOI",
        isValid: null,
    },
    {
        name: "URL",
        stateName: "url",
        placeholder: "URL",
    },
]

export const bookList = [
    {
        name: "著者",
        stateName: "author",
        placeholder: "著者名",
        required: true,
    },
    {
        name: "タイトル",
        stateName: "title",
        placeholder: "タイトル",
        required: true,
    },
    {
        name: "出版日",
        stateName: "publishDate",
        date: true,
    },
    {
        name: "出版社",
        stateName: "publisher",
        placeholder: "出版社の名前"
    },
    {
        name: "ISBNURL",
        stateName: "isbnurl",
        placeholder: "ISBNURL",
        isValid: null,
    },
]

export const chapterList = [
    {
        name: "著者",
        stateName: "author",
        placeholder: "著者名",
        required: true,
    },
    {
        name: "本のタイトル",
        stateName: "bookTitle",
        placeholder: "本のタイトル",
        required: true,
    },
    {
        name: "章のタイトル",
        stateName: "chapterTitle",
        placeholder: "章のタイトル",
        required: true,
    },
    {
        name: "掲載日",
        stateName: "postDate",
        date: true,
        required: true,
    },
    {
        name: "ページ",
        stateName: "page",
        required: true,
        placeholder: "ページ"
    },
    {
        name: "出版社",
        stateName: "publisher",
        placeholder: "出版社の名前"
    },
    {
        name: "編集者",
        stateName: "editor",
        placeholder: "編集者の名前",
    },
    {
        name: "URL",
        stateName: "url",
        placeholder: "URL",
        isValid: null,
    },
]

export const paperList = [
    {
        name: "著者",
        stateName: "author",
        placeholder: "著者名",
        required: true,
    },
    {
        name: "タイトル",
        stateName: "title",
        placeholder: "タイトル",
        required: true,
    },
    {
        name: "出版日",
        stateName: "heldDate",
        date: true,
        required: true,
    },
    {
        name: "カンファレンスの名前",
        stateName: "conferenceName",
        placeholder: "カンファレンスの名前",
    },
    {
        name: "DOI",
        stateName: "doi",
        placeholder: "DOI",
        isValid: null,
    },
    {
        name: "URL",
        stateName: "url",
        placeholder: "URL",
        isValid: null, 
    },
]

export const mediaList = [
    {
        name: "作成者",
        stateName: "creator",
        placeholder: "作成者の名前",
        required: true,
    },
    {
        name: "作成者へのURL",
        stateName: "creatorUrl",
        placeholder: "作成者へのURL",
        isValid: null,
    },
    {
        name: "ソースのURL",
        stateName: "sourceUrl",
        placeholder: "ソースのURL",
        isValid: null,
    },
    {
        name: "ライセンス名",
        stateName: "licenseName",
        placeholder: "ライセンス名",
    },
    {
        name: "ライセンスのURL",
        stateName: "licenseUrl",
        placeholder: "ライセンスのURL",
        isValid: null,
    },
    {
        name: "ライセンスの保持者",
        stateName: "licenseHolder",
        placeholder: "ライセンスの保持者の名前",
    },
    {
        name: "ライセンスの作成日",
        stateName: "licenseDate",
        date: true,
    },
]

export const generalList = [
    {
        name: "タイトル",
        stateName: "title",
        placeholder: "タイトル",
        required: true,
    },
    {
        name: "作成者",
        stateName: "author",
        placeholder: "作成者の名前",
        required: true,
    },
    {
        name: "掲載日",
        stateName: "postDate",
        placeholder: "掲載日",
    },
    {
        name: "URL",
        stateName: "url",
        placeholder: "URL",
        isValid: null,
    },
]

export function jpMapping(enName) {
    switch(enName){
        case "refType":
            return "種類"
        case "title":
            return "タイトル"
        case "url":
            return　"URL"
        case "author":
            return "著者"
        case "postDate":
            return "掲載日"
        case "website":
            return "ウェブサイト名"
        case "source":
            return "ソース"
        case "date":
            return "作成日"
        case "publishDate":
            return "出版日"
        case "isbnurl":
            return "ISBNURL"
        case "page":
            return "ページ"
        case "doi":
            return "DOI"
        case "bookTitle":
            return "本のタイトル"
        case "chapterTitle":
            return "章のタイトル"
        case "publisher":
            return "出版社"
        case "editor":
            return "編集者"
        case "heldDate":
            return "開催日"
        case "conferenceName":
            return "カンファレンス名"
        case "creator":
            return "クリエイター"
        case "creatorUrl":
            return "クレエイターへのURL"
        case "sourceUrl":
            return "ソースのURL"
        case "licenseName":
            return "ライセンス名"
        case "licenseUrl":
            return "ライセンスへのURL"
        case "licenseHolder":
            return "ライセンス保持者"
        case "licenseDate":
            return "ライセンス期限"
        default:
            return ""
    }
}