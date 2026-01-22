import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, ShieldCheck, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const reportTypes = [
  { value: "lab-report", label: "Lab Report" },
  { value: "medical-examination", label: "Medical Examination" },
  { value: "prescription", label: "Prescription" },
  { value: "discharge-summary", label: "Discharge Summary" },
];

const IssueReport = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reportType, setReportType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast.error("Please upload a PDF file only");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF file only");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please upload a medical report");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success("Report successfully signed and issued!", {
      description: "The medical report has been cryptographically signed.",
    });
    
    navigate("/issued-reports");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Issue Medical Report
        </h1>
        <p className="text-muted-foreground mt-1">
          Create and digitally sign a new medical report
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-6">
          <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Patient Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="input-secure"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="input-secure"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType} required>
              <SelectTrigger className="input-secure">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* File Upload */}
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Upload Medical Report
          </h2>

          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
              dragActive
                ? "border-primary bg-primary/5"
                : file
                ? "border-success bg-success/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setFile(null)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium mb-1">
                  Drag and drop your PDF here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  PDF files only, max 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Cryptographic Signature
            </p>
            <p className="text-sm text-muted-foreground">
              This report will be cryptographically signed by MedAegis using your digital certificate, ensuring authenticity and integrity.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secure"
            size="lg"
            disabled={isSubmitting || !file || !patientId || !patientName || !reportType}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing Report...
              </span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Digitally Sign & Issue Report
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueReport;
