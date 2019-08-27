import React, { useState } from 'react';

import ThemeContext from './context'

function World() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <ThemeContext.Consumer>
            {(context) => (<div>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me, theme:{context}
                    </button>
                </div>)
            }
        </ThemeContext.Consumer>
    );
}

export default World