const fs = require('fs');

const tasks = {
    tasks: [{
                text: 'Grocery shopping',
                completed: true
            },
            {
                text: 'Clean yard',
                completed: false
            }, 
            {
                text: 'Film course',
                completed: false
            },
            {
                text: 'Programming course',
                completed: false
            },
            {
                text: 'Piano lessons',
                completed: true
            }
        ]
}

const transferData = () => {
    const tasksJSON = JSON.stringify(tasks);
    fs.writeFileSync('notes.json',tasksJSON);
}

module.exports = transferData;

