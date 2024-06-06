import React from 'react';
import CountdownTimer from './task1';
import InfiniteTimer from './task2';
import PrimeNumbers from './task3';
import Revert from './task5';

function App() {
    return (
        <div className="App">
            <CountdownTimer />

            <InfiniteTimer />

            <PrimeNumbers />

            <Revert />
        </div>
    );
}

export default App;