import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Heritage from "@/pages/heritage";
import Hobbies from "@/pages/connections";
import NavMenu from "@/components/nav-menu";

function Router() {
  return (
    <Switch>
      <Route path="/Nathans-Heritage" component={Home} />
      <Route path="/heritage" component={Heritage} />
      <Route path="/hobbies" component={Hobbies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <NavMenu />
        <main className="container mx-auto px-4 py-8">
          <Router />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
