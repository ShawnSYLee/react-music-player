import React, { useState } from 'react';

const ThemeContext = React.createContext([{}, () => {}]);

const ThemeProvider = (props) => {
    const [state, setState] = useState({
        theme: "light"
    });

    return (
        <ThemeContext.Provider value={[state, setState]}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider };