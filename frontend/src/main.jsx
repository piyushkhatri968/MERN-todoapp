import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
