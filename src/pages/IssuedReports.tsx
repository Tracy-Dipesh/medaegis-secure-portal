import { useState } from "react";
import { Search, Download, Eye, ShieldCheck, ShieldX, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Report {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  issueDate: string;
  status: "valid" | "revoked";
}

const mockReports: Report[] = [
  { id: "RPT-2024-001", patientId: "P-10234", patientName: "John Doe", type: "Lab Report", issueDate: "Jan 22, 2026", status: "valid" },
  { id: "RPT-2024-002", patientId: "P-10235", patientName: "Jane Smith", type: "Prescription", issueDate: "Jan 22, 2026", status: "valid" },
  { id: "RPT-2024-003", patientId: "P-10236", patientName: "Mike Johnson", type: "Discharge Summary", issueDate: "Jan 21, 2026", status: "valid" },
  { id: "RPT-2024-004", patientId: "P-10237", patientName: "Emily Davis", type: "Medical Examination", issueDate: "Jan 21, 2026", status: "valid" },
  { id: "RPT-2024-005", patientId: "P-10238", patientName: "Robert Wilson", type: "Lab Report", issueDate: "Jan 20, 2026", status: "revoked" },
  { id: "RPT-2024-006", patientId: "P-10239", patientName: "Sarah Brown", type: "Prescription", issueDate: "Jan 20, 2026", status: "valid" },
  { id: "RPT-2024-007", patientId: "P-10240", patientName: "David Lee", type: "Lab Report", issueDate: "Jan 19, 2026", status: "valid" },
  { id: "RPT-2024-008", patientId: "P-10241", patientName: "Lisa Anderson", type: "Discharge Summary", issueDate: "Jan 19, 2026", status: "valid" },
];

const IssuedReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleView = (reportId: string) => {
    toast.info(`Viewing report ${reportId}`);
  };

  const handleDownload = (reportId: string) => {
    toast.success(`Downloading signed report ${reportId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Issued Reports
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage all digitally signed medical reports
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name, ID, or report ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input-secure"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Lab Report">Lab Report</SelectItem>
                <SelectItem value="Prescription">Prescription</SelectItem>
                <SelectItem value="Medical Examination">Medical Examination</SelectItem>
                <SelectItem value="Discharge Summary">Discharge Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left py-4 px-5 text-sm font-semibold text-foreground">Patient ID</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-foreground">Patient Name</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-foreground">Report Type</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-foreground">Issue Date</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-foreground">Signature Status</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr
                  key={report.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-5 text-sm font-medium text-foreground">{report.patientId}</td>
                  <td className="py-4 px-5 text-sm text-foreground">{report.patientName}</td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">{report.type}</td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">{report.issueDate}</td>
                  <td className="py-4 px-5">
                    {report.status === "valid" ? (
                      <span className="secure-badge-success">
                        <ShieldCheck className="w-3 h-3" />
                        Valid
                      </span>
                    ) : (
                      <span className="secure-badge-error">
                        <ShieldX className="w-3 h-3" />
                        Revoked
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(report.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(report.id)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No reports found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredReports.length} of {mockReports.length} reports</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            {mockReports.filter(r => r.status === "valid").length} Valid
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            {mockReports.filter(r => r.status === "revoked").length} Revoked
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssuedReports;
