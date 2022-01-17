import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Register from './components/Auth_Reg/Register';
import Auth from './components/Auth_Reg/Auth';
import CheckListPage from './components/CheckList/CheckListPage';
import Context from './context';
import Profile from './components/Profile/Profile';
import ChallengePage from './components/Challenge/ChallengePage';

import * as PropTypes from 'prop-types';
import ChallengeModal from './components/Challenge/ChallengeModal/ChallengeModal';

ChallengeModal.propTypes = {tasks: PropTypes.any};
const App = (props) => {
    return (
        <Context.Provider value={{}}>
            <div className="main-container">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path='/auth' element={<Auth/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/myLists' element={<CheckListPage tasks={props.appState.todos.tasks} isDone={false} dispatch={props.dispatch}/>}/>
                        <Route path='/myListsDone' element={<CheckListPage tasks={props.appState.todos.tasksDone} isDone={true} dispatch={props.dispatch}/>}/>
                        <Route path='/myChallenges' element={<ChallengePage tasks={props.appState.todos.challenge} dispatch={props.dispatch}/>}/>
                        <Route path='/myChallengesDone' element={<ChallengePage tasks={props.appState.todos.challengesDone} isDone={true} dispatch={props.dispatch}/>}/>
                        <Route path='/checkList/3' element={<ChallengeModal task={props.appState.todos.challenge[0]} dispatch={props.dispatch}/>}/>
                    </Routes>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
