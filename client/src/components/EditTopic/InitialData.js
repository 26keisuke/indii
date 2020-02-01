const InitialData = {
    tasks: {
        "task-1": { id: "task-1", index: [1,1], content: "1.1"},
        "task-2": { id: "task-2", index: [1,2], content: "1.2"},
        "task-3": { id: "task-3", index: [1,3], content: "1.3"},
        "task-4": { id: "task-4", index: [1,4], content: "1.4"},
        "task-5": { id: "task-5", index: [1,5], content: "1.5"},
        "task-6": { id: "task-6", index: [1,6], content: "1.6"},
        "task-7": { id: "task-7", index: [2,1], content: "2.1"},
        "task-8": { id: "task-8", index: [2,2], content: "2.2"},
        "task-9": { id: "task-9", index: [2,3], content: "2.3"},
        "task-10": { id: "task-10", index: [3,1], content: "3.1"}
    },
    columns: {
        "column-1": {
            id: "column-1",
            column: 1,
            title: "ナポレオンの生涯",
            taskIds: ["task-1","task-2","task-3","task-4","task-5","task-6"]
        },
        "column-2": {
            id: "column-2",
            column: 2,
            title: "ナポレオンの影響",
            taskIds: ["task-7","task-8","task-9"]
        },
        "column-3": {
            id: "column-3",
            column: 3,
            title: "ナポレオンの逸話",
            taskIds: ["task-10"]
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}

export default InitialData