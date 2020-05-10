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
        <div className="Counter">
            <div className="Counter__Value">{props.value}</div>
            <div className="Counter__Controls">
                <button className="Counter__Plus" onClick={props.onIncrement}>＋</button>
                <button className="Counter__Minus" onClick={props.onDecrement}>－</button>
            </div>
        </div>
    );
}

function render(): void {
    console.log(store.getState());
    ReactDOM.render(
        <div className="Main">
            <div className="Main__Counter">
                <Counter
                    value={store.getState().count}
                    onIncrement={() => store.dispatch({ type: "INCREMENT" }) }
                    onDecrement={() => store.dispatch({ type: "DECREMENT" }) }
                />
            </div>
        </div>,
        rootElement
    );
}

//-----------------------------------------------------------------------------

const rootElement = document.getElementById("root");
const store = createStore(update);
store.subscribe(render);
render();
