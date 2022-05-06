import React, { useState } from "react";
import Loading from "components/loading/Loading";

const loadingContext = React.createContext()

const LoadingProvider = ({children}) => {
    const [isLoading, setLoading] = useState(true)

  return (
    <loadingContext.Provider value={{
        isLoading: isLoading,
        setLoading: setLoading,
        Loading: Loading
    }}>
        {children}
    </loadingContext.Provider>
  );
};

export { loadingContext, LoadingProvider}