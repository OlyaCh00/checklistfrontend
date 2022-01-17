import React from 'react';
import todosReducer from './todos-reducer';

let store = {
    _state: {
        todos: {
            id: "1",
            tasks: [
                {
                    id: "1",
                    description: "прочитать книги",
                    goals: [
                        {
                            id: "1",
                            title: "прочитать тихий донпрочитать тихий донпрочитать тихий донпрочитать тихий донпрочитать тихий донпрочитать тихий дон",
                            status: "goal_open"
                        },
                        {
                            id: "2",
                            title: "прочитать мертвые души",
                            status: "goal_open"
                        },
                        {
                            id: "3",
                            title: "прочитать войну и мир",
                            status: "goal_open"
                        },
                        {
                            id: "4",
                            title: "прочитать войну и мир",
                            status: "goal_open"
                        },
                        {
                            id: "5",
                            title: "прочитать войну и мир",
                            status: "goal_open"
                        },
                        {
                            id: "6",
                            title: "прочитать войну и мир",
                            status: "goal_open"
                        },
                    ]
                },
                {
                    id: "2",
                    description: "посмотреть фильмы",
                    goals: [
                        {
                            id: "1",
                            title: "титаник",
                            status: "goal_open"
                        },
                        {
                            id: "2",
                            title: "аватар",
                            status: "goal_open"
                        },
                        {
                            id: "3",
                            title: "бойцовский клуб",
                            status: "goal_open"
                        },
                        {
                            id: "4",
                            title: "бойцовский клуб",
                            status: "goal_open"
                        },
                        {
                            id: "5",
                            title: "бойцовский клуб",
                            status: "goal_open"
                        },
                    ]
                },
                {
                    id: "3",
                    description: "послушать музыку",
                    goals: [
                        {
                            id: "1",
                            title: "песня1",
                            status: "goal_open"
                        },
                        {
                            id: "2",
                            title: "песня2",
                            status: "goal_open"
                        },
                        {
                            id: "3",
                            title: "песня3",
                            status: "goal_open"
                        },
                    ]
                },
                {
                    id: "4",
                    description: "послушать музыку",
                    goals: [
                        {
                            id: "1",
                            title: "песня1",
                            status: "goal_open"
                        },
                        {
                            id: "2",
                            title: "песня2",
                            status: "goal_open"
                        },
                        {
                            id: "3",
                            title: "песня3",
                            status: "goal_open"
                        },
                    ]
                }
            ]
        }
    },
    _callSubscriber () {
        console.log('123')
    },
    changeState(goal) {
        // goal.status === 'goal_open' ? goal.status = 'goal_close' : goal.status = 'goal_open'
        // this._callSubscriber(this._state);
    },
    getState () {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },
    dispatch (action) {
        // switch (action.type) {
        //     case CHANGE_STATE:
        //         this.changeState(action.goal);
        //     default: break;
        // }
        action.goal = todosReducer(action.goal, action.type);
        this._callSubscriber(this._state);
    },
    // const [goals, setGoal] = React.useState(props.task.goals)
    //
    // const removeGoal = (id) => {
    //     console.log(goals);
    //     setGoal(goals.filter(goal => {
    //         return goal.id !== id;
    //     }))
    //     console.log(goals);
    //     debugger;
    // }
}

export default store;

window.store = store;
