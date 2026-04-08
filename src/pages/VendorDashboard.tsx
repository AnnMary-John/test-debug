import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Building2, LogOut } from "lucide-react";
import VendorTable from "@/components/VendorTable";
import VendorApplicationsTable from "@/components/VendorApplicationsTable";
import VendorOnboardingForm from "@/components/VendorOnboardingForm";
import { mockVendors, mockApplications, type VendorApplication } from "@/data/mockVendors";
import { useAuth } from "@/contexts/AuthContext";

type View = "vendors" | "applications";

const VendorDashboard = () => {
  const [view, setView] = useState<View>("vendors");
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  const [applications, setApplications] = useState<VendorApplication[]>(mockApplications);
  const { user, logout } = useAuth();

  const pendingCount = applications.filter((a) => a.status === "NEW").length;

  const handleUpdateApplication = (id: string, updates: Partial<VendorApplication>) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, ...updates } : app)));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Vendor Management</h1>
              <p className="text-xs text-muted-foreground">Ops Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
            )}

          {view === "vendors" && (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2" onClick={() => setView("applications")}>
                <FileText className="h-4 w-4" />
                Vendor Applications
                {pendingCount > 0 && (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-semibold text-destructive-foreground px-1.5">
                    {pendingCount}
                  </span>
                )}
              </Button>
              <Button className="gap-2" onClick={() => setAddVendorOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Vendor
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-6">
        {view === "vendors" ? (
          <VendorTable vendors={mockVendors} />
        ) : (
          <VendorApplicationsTable
            applications={applications}
            onBack={() => setView("vendors")}
            onUpdateApplication={handleUpdateApplication}
          />
        )}
      </main>

      <VendorOnboardingForm open={addVendorOpen} onOpenChange={setAddVendorOpen} />
    </div>
  );
};

export default VendorDashboard;
