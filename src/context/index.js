import { createContext, useState } from 'react';
export const Context = createContext();

const StateProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //   useEffect(() => {
    //     (async () => {
    //       const user = localStorage.getItem("user");
    //       if (user && (process.env.REACT_APP_DEBUG_MODE === "true" ?? false)) {
    //         setUser(await JSON.parse(user));
    //       } else {
    //         localStorage.removeItem("user");
    //       }
    //     })();
    //   }, []);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default StateProvider;
