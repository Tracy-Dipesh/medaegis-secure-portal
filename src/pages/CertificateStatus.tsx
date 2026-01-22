import { ShieldCheck, Building2, Calendar, Clock, FileKey, Award, Lock } from "lucide-react";

const CertificateStatus = () => {
  const certificate = {
    subject: "Dr. Sarah Mitchell",
    doctorId: "DOC-2024-10234",
    issuer: "MedAegis Certificate Authority",
    status: "Active",
    issuedDate: "January 15, 2024",
    expiryDate: "December 31, 2026",
    serialNumber: "MA-CERT-2024-00145892",
    algorithm: "RSA-4096 with SHA-256",
    keyUsage: "Digital Signature, Non-Repudiation",
    organization: "Metropolitan General Hospital",
    department: "Internal Medicine",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Digital Certificate Status
        </h1>
        <p className="text-muted-foreground mt-1">
          View your MedAegis signing certificate details
        </p>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl p-6 flex items-center gap-5 animate-slide-up">
        <div className="w-16 h-16 rounded-xl bg-success/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-8 h-8 text-success" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-foreground">Certificate Active</h2>
            <span className="secure-badge-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Verified
            </span>
          </div>
          <p className="text-muted-foreground">
            Your digital signing certificate is valid and can be used to sign medical reports.
          </p>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Information */}
        <div className="glass-card rounded-xl p-6 space-y-5 animate-slide-up stagger-1">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Certificate Holder
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium text-foreground text-right">{certificate.subject}</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Doctor ID</span>
              <span className="text-sm font-mono text-foreground">{certificate.doctorId}</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Organization</span>
              <span className="text-sm font-medium text-foreground text-right">{certificate.organization}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Department</span>
              <span className="text-sm text-foreground">{certificate.department}</span>
            </div>
          </div>
        </div>

        {/* Issuer Information */}
        <div className="glass-card rounded-xl p-6 space-y-5 animate-slide-up stagger-2">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Issuing Authority
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Issuer</span>
              <span className="text-sm font-medium text-foreground text-right">{certificate.issuer}</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="secure-badge-success">
                <ShieldCheck className="w-3 h-3" />
                {certificate.status}
              </span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Serial Number</span>
              <span className="text-sm font-mono text-foreground text-right break-all">{certificate.serialNumber}</span>
            </div>
          </div>
        </div>

        {/* Validity Period */}
        <div className="glass-card rounded-xl p-6 space-y-5 animate-slide-up stagger-3">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Validity Period
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Issued Date</span>
              <span className="text-sm font-medium text-foreground">{certificate.issuedDate}</span>
            </div>
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Expiry Date</span>
              <span className="text-sm font-medium text-foreground">{certificate.expiryDate}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Time Remaining</span>
              <span className="text-sm text-success font-medium">~2 years</span>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="glass-card rounded-xl p-6 space-y-5 animate-slide-up stagger-4">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Technical Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Algorithm</span>
              <span className="text-sm font-mono text-foreground">{certificate.algorithm}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Key Usage</span>
              <span className="text-sm text-foreground text-right">{certificate.keyUsage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-muted/50 rounded-xl p-5 flex items-start gap-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <FileKey className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Note:</span> This is a read-only view of your digital certificate. 
            Certificate management including renewal and revocation is handled by the MedAegis Certificate Authority. 
            Contact your administrator for certificate-related requests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateStatus;
