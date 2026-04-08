import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createVendor } from "@/lib/api";

interface VendorFormData {
  companyName: string;
  businessAddress: string;
  contactPhone: string;
  email: string;
  numberOfCars: string;
  numberOfDrivers: string;
}

interface VendorOnboardingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillData?: Partial<VendorFormData>;
  onSubmit?: (data: VendorFormData) => void;
  onSuccess?: () => void;
}

const emptyForm: VendorFormData = {
  companyName: "",
  businessAddress: "",
  contactPhone: "",
  email: "",
  numberOfCars: "",
  numberOfDrivers: "",
};

const VendorOnboardingForm = ({ open, onOpenChange, prefillData, onSubmit, onSuccess }: VendorOnboardingFormProps) => {
  const [formData, setFormData] = useState<VendorFormData>({ ...emptyForm, ...prefillData });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof VendorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createVendor({
        companyName: formData.companyName,
        businessAddress: formData.businessAddress,
        contactPhone: formData.contactPhone,
        email: formData.email,
        numberOfCars: Number(formData.numberOfCars),
        numberOfDrivers: Number(formData.numberOfDrivers),
      });
      onSubmit?.(formData);
      onSuccess?.();
      toast.success("Vendor onboarded successfully!");
      onOpenChange(false);
      setFormData(emptyForm);
    } catch {
      toast.error("Failed to onboard vendor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Vendor Onboarding</DialogTitle>
          <DialogDescription>Fill in the vendor details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" value={formData.companyName} onChange={(e) => handleChange("companyName", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input id="businessAddress" value={formData.businessAddress} onChange={(e) => handleChange("businessAddress", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input id="contactPhone" value={formData.contactPhone} onChange={(e) => handleChange("contactPhone", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfCars">Number of Cars</Label>
              <Input id="numberOfCars" type="number" value={formData.numberOfCars} onChange={(e) => handleChange("numberOfCars", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfDrivers">Number of Drivers</Label>
              <Input id="numberOfDrivers" type="number" value={formData.numberOfDrivers} onChange={(e) => handleChange("numberOfDrivers", e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Onboarding…" : "Onboard Vendor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VendorOnboardingForm;
