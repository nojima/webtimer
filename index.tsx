import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';

//-----------------------------------------------------------------------------

interface State {
    readonly count: number;
}

const initialState: State = {
    count: 0,
};

//-----------------------------------------------------------------------------

interface Increment {
    type: "INCREMENT";
}

interface Decrement {
    type: "DECREMENT";
}

type Action = Increment | Decrement;

//-----------------------------------------------------------------------------

function update(state: State | undefined, action: Action): State {
    if (state == null) {
        return initialState;
    }

    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };

        case "DECREMENT":
            return { count: state.count - 1 };
    }

    console.error("unknown action", action);
}

//-----------------------------------------------------------------------------

type CounterProps = {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

function Counter(props: CounterProps) {
    return (
        <div className="counter">
            <div className="counter--value">{props.value}</div>
            <button className="counter-plus" onClick={props.onIncrement}>+</button>
            <button className="counter-minus" onClick={props.onDecrement}>-</button>
        </div>
    );
}

function render(): void {
    console.log(store.getState());
    ReactDOM.render(
        <Counter
            value={store.getState().count}
            onIncrement={() => store.dispatch({ type: "INCREMENT" }) }
            onDecrement={() => store.dispatch({ type: "DECREMENT" }) }
        />,
        rootElement
    );
}

//-----------------------------------------------------------------------------

const rootElement = document.getElementById("root");
const store = createStore(update);
store.subscribe(render);
render();
