import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import CompliancePopup from "./CompliancePopup";
import type { Vendor } from "@/data/mockVendors";

interface VendorTableProps {
  vendors: Vendor[];
}

const statusConfig = {
  compliant: { label: "Compliant", icon: CheckCircle2, className: "bg-success/10 text-success border-success/30 cursor-default" },
  "non-compliant": { label: "Non-Compliant", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/30 cursor-pointer hover:bg-destructive/20 transition-colors" },
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning border-warning/30 cursor-pointer hover:bg-warning/20 transition-colors" },
};

const VendorTable = ({ vendors }: VendorTableProps) => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleComplianceClick = (vendor: Vendor) => {
    console.log(statusConfig[vendor.complianceStatus].label);
    if(statusConfig[vendor.complianceStatus].label=="Non-Compliant"){
    setSelectedVendor(vendor);
    setPopupOpen(true);
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Vendor ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead className="hidden md:table-cell">Business Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Drivers</TableHead>
              <TableHead className="text-center">Cars</TableHead>
              <TableHead className="text-center">Compliance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => {
              const config = statusConfig[vendor.complianceStatus];
              const Icon = config.icon;
              return (
                <TableRow key={vendor.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{vendor.id}</TableCell>
                  <TableCell className="font-medium">{vendor.companyName}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{vendor.businessAddress}</TableCell>
                  <TableCell className="text-sm">{vendor.contactPhone}</TableCell>
                  <TableCell className="text-center">{vendor.totalDrivers}</TableCell>
                  <TableCell className="text-center">{vendor.totalCars}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`gap-1 ${config.className}`}
                      onClick={() => handleComplianceClick(vendor)}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <CompliancePopup vendor={selectedVendor} open={popupOpen} onOpenChange={setPopupOpen} />
    </>
  );
};

export default VendorTable;
