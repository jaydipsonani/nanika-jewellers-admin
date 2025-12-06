import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/admin/Dashboard";
import AddDiamond from "@/pages/admin/diamonds/AddDiamond";
import ManageDiamonds from "@/pages/admin/diamonds/ManageDiamonds";
import AddJewellery from "@/pages/admin/jewellery/AddJewellery";
import ManageJewellery from "@/pages/admin/jewellery/ManageJewellery";
import SalesDashboard from "@/pages/admin/sales/SalesDashboard";
import OrdersList from "@/pages/admin/sales/OrdersList";
import CustomersList from "@/pages/admin/sales/CustomersList";
import OrderDetails from "@/pages/admin/sales/OrderDetails";
import Settings from "@/pages/admin/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="diamonds" element={<ManageDiamonds />} />
            <Route path="diamonds/add" element={<AddDiamond />} />
            <Route path="jewellery" element={<ManageJewellery />} />
            <Route path="jewellery/add" element={<AddJewellery />} />
            <Route path="sales" element={<SalesDashboard />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="customers" element={<CustomersList />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
