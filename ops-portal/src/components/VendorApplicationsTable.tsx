import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import VendorOnboardingForm from "./VendorOnboardingForm";
import type { VendorApplication } from "@/data/mockVendors";

interface VendorApplicationsTableProps {
  applications: VendorApplication[];
  onBack: () => void;
  onUpdateApplication: (id: string, updates: Partial<VendorApplication>) => void;
}

const VendorApplicationsTable = ({ applications, onBack, onUpdateApplication }: VendorApplicationsTableProps) => {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<VendorApplication | null>(null);

  const newApplications = applications.filter((app) => app.status === "NEW");

  const handleApprove = (app: VendorApplication) => {
    setSelectedApp(app);
    setOnboardingOpen(true);
  };

  const handleDecline = (app: VendorApplication) => {
    onUpdateApplication(app.id, { status: "done", internalNotes: "request declined" });
    toast.info(`Application from ${app.businessName} has been declined.`);
  };

  const handleOnboardingSubmit = () => {
    if (selectedApp) {
      onUpdateApplication(selectedApp.id, { status: "done" });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Vendor Applications</h2>
            <p className="text-sm text-muted-foreground">{newApplications.length} pending application(s)</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Business Name</TableHead>
                <TableHead className="text-center">Cars</TableHead>
                <TableHead className="text-center">Vehicles</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No pending applications.
                  </TableCell>
                </TableRow>
              ) : (
                newApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.businessName}</TableCell>
                    <TableCell className="text-center">{app.numberOfCars}</TableCell>
                    <TableCell className="text-center">{app.numberOfVehicles}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.email}</TableCell>
                    <TableCell className="text-sm">{app.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" className="gap-1 bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleApprove(app)}>
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1" onClick={() => handleDecline(app)}>
                          <X className="h-3.5 w-3.5" />
                          Decline
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedApp && (
        <VendorOnboardingForm
          open={onboardingOpen}
          onOpenChange={setOnboardingOpen}
          prefillData={{
            companyName: selectedApp.businessName,
            email: selectedApp.email,
            contactPhone: selectedApp.phone,
            numberOfCars: String(selectedApp.numberOfCars),
          }}
          onSubmit={handleOnboardingSubmit}
        />
      )}
    </>
  );
};

export default VendorApplicationsTable;
