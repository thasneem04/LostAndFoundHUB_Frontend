// import React, { createContext, useState, useContext } from "react";

// // Create context
// const ItemContext = createContext();

// // Custom hook to use ItemContext
// export const useItems = () => useContext(ItemContext);

// // Provider component
// export const ItemProvider = ({ children }) => {
//   const [items, setItems] = useState([]);

//   return (
//     <ItemContext.Provider value={{ items, setItems }}>
//       {children}
//     </ItemContext.Provider>
//   );
// };
import React, { createContext, useState, useContext } from "react";

// Create context
export const ItemContext = createContext();

// Custom hook to use ItemContext
export const useItems = () => useContext(ItemContext);

// Provider component
export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState({
    lost: [],
    found: [],
  });

  // Add Lost Item
  const addLostItem = (item) => {
    setItems((prev) => ({
      ...prev,
      lost: [...prev.lost, item],
    }));
  };

  // Add Found Item
  const addFoundItem = (item) => {
    setItems((prev) => ({
      ...prev,
      found: [...prev.found, item],
    }));
  };

  return (
    <ItemContext.Provider value={{ items, addLostItem, addFoundItem }}>
      {children}
    </ItemContext.Provider>
  );
};
