import React from "react";
import { createContext, FC, useContext, useMemo } from "react";
import IEXClient from "../core/client";

const Context = createContext<IEXClient | undefined>(undefined);

export const useIex = () => {
  const iex = useContext(Context);

  if (!iex) {
    throw new Error("Must be used inside context.");
  }

  return iex;
};

interface Params {
  children: JSX.Element | JSX.Element[];
}

const IEXProvider: FC<Params> = React.memo(({ children }) => {
  const iex = useMemo(() => new IEXClient(), []);

  return <Context.Provider value={iex}>{children}</Context.Provider>;
});

export default IEXProvider;
