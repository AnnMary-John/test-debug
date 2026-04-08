import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Building2, LogOut, Loader2 } from "lucide-react";
import VendorTable from "@/components/VendorTable";
import VendorApplicationsTable from "@/components/VendorApplicationsTable";
import VendorOnboardingForm from "@/components/VendorOnboardingForm";
import { getVendors, getApplications, updateApplication } from "@/lib/api";
import { type VendorApplication } from "@/data/mockVendors";
import { useAuth } from "@/contexts/AuthContext";

type View = "vendors" | "applications";

const VendorDashboard = () => {
  const [view, setView] = useState<View>("vendors");
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const { data: vendors = [], isLoading: vendorsLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => getVendors().then((r) => r.data),
  });

  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplications().then((r) => r.data),
  });

  const updateAppMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<VendorApplication> }) =>
      updateApplication(id, updates as Record<string, unknown>),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  const pendingCount = (applications as VendorApplication[]).filter((a) => a.status === "NEW").length;

  const handleUpdateApplication = (id: string, updates: Partial<VendorApplication>) => {
    updateAppMutation.mutate({ id, updates });
  };

  const isLoading = vendorsLoading || appsLoading;

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

          <div className="flex items-center gap-2">
            {user && (
              <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
            )}
            {view === "vendors" && (
              <>
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
              </>
            )}
            <Button variant="ghost" size="sm" onClick={logout} className="gap-1 text-muted-foreground">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : view === "vendors" ? (
          <VendorTable vendors={vendors.filter((v: any) => v.isActive)} />
        ) : (
          <VendorApplicationsTable
            applications={applications as VendorApplication[]}
            onBack={() => setView("vendors")}
            onUpdateApplication={handleUpdateApplication}
          />
        )}
      </main>

      <VendorOnboardingForm
        open={addVendorOpen}
        onOpenChange={setAddVendorOpen}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["vendors"] })}
      />
    </div>
  );
};

export default VendorDashboard;
