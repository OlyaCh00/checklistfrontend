import axios from 'axios';

const CHANGE_STATE = 'CHANGE-STATE';
const CHANGE_GOAL = 'CHANGE-GOAL';
const CHANGE_DESCRIPTION = 'CHANGE-DESCRIPTION';
const REMOVE_ITEM = 'REMOVE-ITEM';
const REMOVE_TASK = 'REMOVE-TASK';
const ADD_ITEM = 'ADD-ITEM';
const ADD_TASK = 'ADD-TASK';
const WRITE_TASK = 'WRITE-TASK';
const DONE_CHL = 'DONE-CHL';
const CREATE_CHL = 'CREATE-CHL';
const CHANGE_STATE_CHL = 'CHANGE_STATE_CHL';

let initialState =  {
    id: "1",
    tasks: [],
    tasksDone: [],
    challenge: [],
    challengesDone: []
}





const checkStateTask = () => {
    initialState.tasks.map((task,index) => {
        const length = task.goals.length;
        let count = 0;
        task.goals.map(goal => {
            if (goal.status === 'task_closed') {
                count++;
            }
            return goal;
        })
        if (length === count && count !== 0) {
            initialState.tasksDone.push(task);
            initialState.tasks.splice(index, 1);
        }
        return task;
    })
}

const writeState = (lists) => {
    const tasks = [];
    lists.map(checklist => {
        const goals = [];
        checklist.tasks.map(task => goals.push({
            id: task.id,
            title: task.title,
            status: task.status
        }));
        tasks.push({
            id: checklist.id,
            unique_id: checklist["unique_id"],
            description: checklist.title,
            goals: goals
        })
    return checklist;
    })
    initialState.tasks = tasks;
}

const todosReducer = (state = initialState, action) => {
    state.tasks.map(task => {
        if (task.description !== '') {
            task.description = task.description[0].toUpperCase() + task.description.slice(1);
        }
        return task;
    });
    checkStateTask();
    switch (action.type) {
        case CHANGE_STATE:
            state.tasks.map(task => {
                if (task.id === action.taskId) {
                    task.goals.map(goal => {
                        if (goal.id === action.goalId) {
                            goal.status === 'task_open' || goal.status === 'goal_open' ? goal.status = 'task_closed' : goal.status = 'task_open';
                            axios.put("http://api.project.local/task/change-status/" + goal.id, {status: goal.status},
                                {headers: {Authorization : localStorage.token}})
                                .then(res => {
                                    console.log(res);
                                    if (!res.data) {
                                        alert("Error");
                                    }
                                }).catch((err) => {
                                console.log(err);
                            })
                        }
                        return goal;
                    })
                }
                return task;
            })
            checkStateTask();
            return state;
        case CHANGE_GOAL:
            state.tasks.map(task => {
                if (task.id === action.taskId) {
                    task.goals.map(goal => {
                        if (goal.id === action.goalId) {
                            goal.title = action.newGoal;
                        }
                        return goal;
                    })
                }
                return task;
            })
            return state;
        case CHANGE_DESCRIPTION:
            state.tasks.map(task => {
                if (task.id == action.taskId) {
                    task.description = action.newDesc;
                }
                return task;
            })
            return state;
        case REMOVE_ITEM:
            state.tasks.map((task) => {
                if (task.id === action.taskId) {
                    task.goals.map((goal,index) => {
                        if (goal.id === action.goalId) {
                            task.goals.splice(index, 1);
                        }
                        return goal;
                    })
                }
                return task;
            })
            return state;
        case REMOVE_TASK:
            state.tasks.map((task,index) => {
                if (task.id === action.taskId) {
                    state.tasks.splice(index, 1);
                }
                return task;
            })
            state.tasksDone.map((task,index) => {
                if (task.id === action.taskId) {
                    state.tasksDone.splice(index, 1);
                }
                return task;
            })
            return state;
        case ADD_ITEM:
            state.tasks.map((task) => {
                if (task.id === action.taskId && action.value.trim() !== '') {
                    const goals = [];
                    task.goals.map(goal => goals.push(goal.title));
                    if (goals.indexOf(action.value) === -1) {
                        const id = task.goals.length !== 0 ? Number(task.goals[task.goals.length - 1].id) + 1 : 1;
                        task.goals.push({
                            id: id.toString(),
                            title: action.value,
                            status: "goal_open"
                        })
                    }
                }
                return task;
            })
            return state;
        case ADD_TASK:
            state.tasks.push({
                id: action.newId,
                description: 'Новый чек-лист',
                goals: []
            })
            return state;
        case WRITE_TASK:
            writeState(action.state);
            return state;
        case CREATE_CHL:
            state.tasks.map((task,index) => {
                if (task.id === action.taskId) {
                    initialState.challenge.push(task);
                    initialState.tasks.splice(index, 1);
                }
                return task;
            })
            return state;
        case CHANGE_STATE_CHL:
            state.challenge.map(task => {
                if (task.id === action.taskId) {
                    task.goals.map(goal => {
                        if (goal.id === action.goalId) {
                            goal.status === 'task_open' || goal.status === 'goal_open' ? goal.status = 'task_closed' : goal.status = 'task_open';
                        }
                        return goal;
                    })
                }
                return task;
            })
            return state;
        case DONE_CHL:
            state.challenge.map((task,index) => {
                if (task.id === action.taskId) {
                    initialState.challengesDone.push(task);
                    initialState.challenge.splice(index, 1);
                }
                return task;
            })
            return state;
        default: return state;
    }
}


export const changeStateActionCreator = (taskId, goalId) => ({type: CHANGE_STATE, taskId, goalId});
export const changeGoalActionCreator = (taskId, goalId, newGoal) => ({type: CHANGE_GOAL, taskId, goalId, newGoal});
export const changeDescriptionActionCreator = (taskId, newDesc) => ({type: CHANGE_DESCRIPTION, taskId, newDesc});
export const removeItemActionCreator = (taskId, goalId) => ({type: REMOVE_ITEM, taskId, goalId});
export const removeTaskActionCreator = (taskId) => ({type: REMOVE_TASK, taskId});
export const addItemActionCreator = (value, taskId) => ({type: ADD_ITEM, value, taskId});
export const addTaskActionCreator = (newId) => ({type: ADD_TASK, newId});
export const writeStateActionCreator = (state) => ({type: WRITE_TASK, state});
export const changeStateChlActionCreator = (taskId, goalId) => ({type: CHANGE_STATE_CHL, taskId, goalId});
export const doneChlActionCreator = (taskId) => ({type: DONE_CHL, taskId});
export const createChlActionCreator = (taskId) => ({type: CREATE_CHL, taskId});
export default todosReducer;
