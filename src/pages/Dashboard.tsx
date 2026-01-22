import { FileText, FilePlus, Clock, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const doctorName = "Sarah Mitchell";

  const recentReports = [
    { id: "RPT-2024-001", patient: "John Doe", type: "Lab Report", date: "Jan 22, 2026", status: "Valid" },
    { id: "RPT-2024-002", patient: "Jane Smith", type: "Prescription", date: "Jan 22, 2026", status: "Valid" },
    { id: "RPT-2024-003", patient: "Mike Johnson", type: "Discharge Summary", date: "Jan 21, 2026", status: "Valid" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome to MedAegis, Dr. {doctorName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Secure Medical Record Authority Dashboard
          </p>
        </div>
        <Button variant="secure" onClick={() => navigate("/issue-report")}>
          <FilePlus className="w-4 h-4" />
          Issue New Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Reports Issued"
          value={1247}
          icon={FileText}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
          className="animate-slide-up stagger-1"
        />
        <StatCard
          title="Reports Signed Today"
          value={8}
          icon={ShieldCheck}
          variant="success"
          className="animate-slide-up stagger-2"
        />
        <StatCard
          title="Pending Requests"
          value={3}
          icon={Clock}
          variant="warning"
          className="animate-slide-up stagger-3"
        />
        <StatCard
          title="Certificate Status"
          value="Active"
          icon={ShieldCheck}
          variant="success"
          className="animate-slide-up stagger-4"
        />
      </div>

      {/* Recent Reports */}
      <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">Recent Reports</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/issued-reports")}>
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Report ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{report.id}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{report.patient}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{report.type}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className="secure-badge-success">
                      <ShieldCheck className="w-3 h-3" />
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-5 flex items-start gap-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">Security Status: Protected</h3>
          <p className="text-sm text-muted-foreground">
            All reports are cryptographically signed with your MedAegis digital certificate. 
            Your certificate is active and valid until December 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
