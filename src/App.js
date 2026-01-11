// import React, { useState } from "react"; 
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Hero from "./components/Hero";
// import LostItems from "./components/LostItems";
// import FoundItems from "./components/FoundItems";
// import Settings from "./components/Settings";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <AuthProvider>
//       <Router>
//         <div className="relative">
//           {/* Sleek White Gear Icon */}
//           <button
//             onClick={() => setShowSidebar(true)}
//             className="fixed top-5 right-5 z-50 p-3 bg-transparent rounded-full hover:scale-105 transition-transform"
//             title="Settings"
//           >
//             {/* White Gear Icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-7 w-7 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
//               />
//             </svg>
//           </button>

//           {/* Settings Sidebar */}
//           <Settings showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

//           {/* App Routes */}
//           <Routes>
//             <Route path="/" element={<Hero />} />
//             <Route path="/lost-items" element={<LostItems />} />
//             <Route path="/found-items" element={<FoundItems />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ItemList from "./components/ItemList";

import Settings from "./components/Settings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { ItemProvider } from "./Itemcontext";  // ⬅️ add this import
import ItemForm from "./components/ItemForm";
import FoundItemForm from "./components/FoundItemForm";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AuthProvider>
      <ItemProvider> {/* ⬅️ wrap inside here so all pages can use lost/found items */}
        <Router>
          <div className="relative">
            {/* Sleek White Gear Icon */}
            <button
              onClick={() => setShowSidebar(true)}
              className="fixed top-5 right-5 z-50 p-3 bg-transparent rounded-full hover:scale-105 transition-transform"
              title="Settings"
            >
              {/* White Gear Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
                />
              </svg>
            </button>

            {/* Settings Sidebar */}
            <Settings showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            {/* App Routes */}
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/lost-items" element={<ItemList />} />
              <Route path="/itemform" element={<ItemForm />} />
              <Route path="/found-items" element={<FoundItemForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;
