import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { Vendor } from "@/data/mockVendors";

interface CompliancePopupProps {
  vendor: Vendor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const severityConfig = {
  high: { icon: AlertTriangle, className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { icon: AlertCircle, className: "bg-warning/10 text-warning border-warning/20" },
  low: { icon: Info, className: "bg-primary/10 text-primary border-primary/20" },
};

const CompliancePopup = ({ vendor, open, onOpenChange }: CompliancePopupProps) => {
  if (!vendor) return null;

  const handleEmailVendor = () => {
    window.open(`mailto:${vendor.email}?subject=Compliance Issues - ${vendor.companyName}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Compliance Status — {vendor.companyName}</DialogTitle>
          <DialogDescription>
            {vendor.complianceIssues.length === 0
              ? "No compliance issues found."
              : `${vendor.complianceIssues.length} issue(s) require attention.`}
          </DialogDescription>
        </DialogHeader>

        {vendor.complianceIssues.length > 0 && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {vendor.complianceIssues.map((issue) => {
              const config = severityConfig[issue.severity];
              const Icon = config.icon;
              return (
                <div key={issue.id} className={`flex items-start gap-3 rounded-lg border p-3 ${config.className}`}>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{issue.description}</p>
                    <p className="text-xs opacity-70 mt-1">Reported: {issue.dateReported}</p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize shrink-0">
                    {issue.severity}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button onClick={handleEmailVendor} className="gap-2">
            <Mail className="h-4 w-4" />
            Email Vendor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompliancePopup;
