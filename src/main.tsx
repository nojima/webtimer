import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore } from 'redux';

import "./main.scss";

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

function update(state: State = initialState, action: Action): State {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };

        case "DECREMENT":
            return { count: state.count - 1 };

        default:
            return state;
    }
}

//-----------------------------------------------------------------------------

type CounterProps = {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

function Counter(props: CounterProps): JSX.Element {
    return (
        <div className="Counter">
            <div className="Counter__Value">{props.value}</div>
            <div className="Counter__Controls">
                <button className="Counter__Plus" onClick={props.onIncrement}>＋</button>
                <button className="Counter__Minus" onClick={props.onDecrement}>－</button>
            </div>
        </div>
    );
}

function Main(props: { state: State }): JSX.Element {
    const state = props.state;
    return (
        <div className="Main">
            <div className="Main__Counter">
                <Counter
                    value={state.count}
                    onIncrement={() => store.dispatch({ type: "INCREMENT" }) }
                    onDecrement={() => store.dispatch({ type: "DECREMENT" }) }
                />
            </div>
        </div>
    );
}

function render(): void {
    ReactDOM.render(
        <Main state={store.getState()} />,
        rootElement
    );
}

//-----------------------------------------------------------------------------

const rootElement = document.getElementById("root");
const store = createStore(update);
store.subscribe(render);
render();
