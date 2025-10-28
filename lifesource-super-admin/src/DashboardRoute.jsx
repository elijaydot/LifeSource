import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <>
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </SidebarProvider>
  </>
);

export default App;
