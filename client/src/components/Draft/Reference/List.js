export const nameList = ["ウェブサイト","本","本の章","雑誌","論文","メディア","その他"]

export const websiteList = [
    {
        name: "タイトル",
        placeholder: "タイトルを入力",
        required: true,
    },
    {
        name: "URL",
        placeholder: "URLを入力",
        required: true,
        isValid: null,
    },
    {
        name: "著者",
        placeholder: "著者名を入力",
        required: true,
    },
    {
        name: "掲載日",
        date: true,
    },
    {
        name: "サイト名",
        placeholder: "サイト名を入力",
    },
]

export const newsList = [
    {
        name: "タイトル",
        placeholder: "タイトルを入力",
        required: true,
    },
    {
        name: "ソース",
        placeholder: "ソース元の名前を入力",
        required: true,
    },
    {
        name: "掲載日",
        date: true,
        required: true,
    },
    {
        name: "著者",
        placeholder: "著者名を入力",
    },
    {
        name: "URL",
        placeholder: "URLを入力",
        isValid: null,
    },
]

export const journalList = [
    {
        name: "著者",
        placeholder: "著者名を入力",
        required: true,
    },
    {
        name: "タイトル",
        placeholder: "タイトルを入力",
        required: true,
    },
    {
        name: "ソース",
        placeholder: "ソース元の名前を入力",
        required: true,
    },
    {
        name: "掲載日",
        date: true,
        required: true,
    },
    {
        name: "DOI",
        placeholder: "DOIを入力",
        isValid: null,
    },
    {
        name: "サイト名",
        placeholder: "サイト名を入力",
    },
]

export const bookList = [
    {
        name: "著者",
        placeholder: "著者名を入力",
        required: true,
    },
    {
        name: "タイトル",
        placeholder: "タイトルを入力",
        required: true,
    },
    {
        name: "出版日",
        date: true,
    },
    {
        name: "出版社",
        placeholder: "出版社の名前を入力"
    },
    {
        name: "ISBNURL",
        placeholder: "ISBNURLを入力",
        isValid: null,
    },
]

export const chapterList = [
    {
        name: "著者",
        placeholder: "著者名を入力",
        required: true,
    },
    {
        name: "本のタイトル",
        placeholder: "本のタイトルを入力",
        required: true,
    },
    {
        name: "章のタイトル",
        placeholder: "章のタイトルを入力",
        required: true,
    },
    {
        name: "掲載日",
        date: true,
        required: true,
    },
    {
        name: "サイト名",
        placeholder: "サイト名を入力",
    },
    {
        name: "出版社",
        placeholder: "出版社の名前を入力"
    },
    {
        name: "編集者",
        placeholder: "編集者の名前を入力",
    },
    {
        name: "URL",
        placeholder: "URLを入力",
        isValid: null,
    },
]

export const paperList = [
    {
        name: "著者",
        placeholder: "著者名を入力",
        required: true,
    },
    {
        name: "タイトル",
        placeholder: "タイトルを入力",
        required: true,
    },
    {
        name: "掲載日",
        date: true,
        required: true,
    },
    {
        name: "カンファレンスの名前",
        placeholder: "カンファレンスの名前を入力",
    },
    {
        name: "カンファレンスの開催地",
        placeholder: "カンファレンスの開催地を入力"
    },
    {
        name: "DOI",
        placeholder: "DOIを入力",
        isValid: null,
    },
    {
        name: "URL",
        placeholder: "URLを入力",
        isValid: null, 
    },
]

export const mediaList = [
    {
        name: "作成者",
        placeholder: "作成者の名前を入力",
        required: true,
    },
    {
        name: "作成者へのURL",
        placeholder: "作成者へのURLを入力",
        isValid: null,
    },
    {
        name: "ソースのURL",
        placeholder: "ソースのURLを入力",
        isValid: null,
    },
    {
        name: "ライセンス名",
        placeholder: "ライセンス名を入力",
    },
    {
        name: "ライセンスのURL",
        placeholder: "ライセンスのURLを入力",
        isValid: null,
    },
]

export const generalList = [
    {
        name: "タイトル",
        placeholder: "タイトルを入力",
        required: true,
    },
    {
        name: "作成者",
        placeholder: "作成者の名前を入力",
        required: true,
    },
    {
        name: "掲載日",
        placeholder: "掲載日を入力",
    },
    {
        name: "URL",
        placeholder: "URLを入力",
        isValid: null,
    },
]