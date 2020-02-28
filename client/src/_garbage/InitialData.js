const InitialData = {
    tasks: {
        "task-1": { id: "task-1", index: [1,1], imgUrl: "", content: "幼少期"},
        "task-2": { id: "task-2", index: [1,2], imgUrl: "", content: "友人関係"},
        "task-3": { id: "task-3", index: [1,3], imgUrl: "", content: "師匠との出会い"},
        "task-4": { id: "task-4", index: [1,4], imgUrl: "", content: "新技の習得"},
        "task-5": { id: "task-5", index: [1,5], imgUrl: "", content: "海外へ進出"},
        "task-6": { id: "task-6", index: [1,6], imgUrl: "", content: "Hall of Fame"},
        "task-7": { id: "task-7", index: [2,1], imgUrl: "", content: "剣術"},
        "task-8": { id: "task-8", index: [2,2], imgUrl: "", content: "他の分野の才能"},
        "task-9": { id: "task-9", index: [2,3], imgUrl: "", content: "日常"},
        "task-10": { id: "task-10", index: [3,1], imgUrl: "", content: "ハードウェアとの違い"}
    },
    columns: {
        "column-1": {
            id: "column-1",
            column: 1,
            title: "ソフトウェアの生涯",
            taskIds: ["task-1","task-2","task-3","task-4","task-5","task-6"]
        },
        "column-2": {
            id: "column-2",
            column: 2,
            title: "ソフトウェアの逸話",
            taskIds: ["task-7","task-8","task-9"]
        },
        "column-3": {
            id: "column-3",
            column: 3,
            title: "ソフトウェアに関する誤解",
            taskIds: ["task-10"]
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}

export default InitialData