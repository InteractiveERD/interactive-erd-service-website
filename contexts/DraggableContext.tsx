import React, { createRef, RefObject } from "react";

const defaultValue = createRef<HTMLElement>();
export const DraggableContext = React.createContext<RefObject<HTMLElement>>(defaultValue);
export const DraggableWrapper = DraggableContext.Provider
