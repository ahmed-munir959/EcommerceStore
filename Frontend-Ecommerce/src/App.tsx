import ToastProvider from "./components/ToastProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ToastProvider />
      <AppRoutes />
    </>
  );
}

export default App;