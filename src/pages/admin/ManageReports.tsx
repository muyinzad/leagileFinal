import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, FileEdit, Trash2 } from "lucide-react";

interface Report {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  status: "published" | "draft" | "archived";
  createdAt: string;
}

const sampleReports: Report[] = [
  {
    id: "report-1",
    title: "Advanced Market Analysis: Emerging Trends in Technology",
    author: "Dr. Jane Smith",
    category: "Market Analysis",
    price: 49.99,
    status: "published",
    createdAt: "2023-06-15",
  },
  {
    id: "report-2",
    title: "Healthcare Innovation: Post-Pandemic Strategies",
    author: "Prof. Michael Chen",
    category: "Healthcare",
    price: 59.99,
    status: "published",
    createdAt: "2023-06-12",
  },
  {
    id: "report-3",
    title: "Sustainable Energy: Market Outlook 2023-2030",
    author: "Dr. Sarah Johnson",
    category: "Industry Reports",
    price: 79.99,
    status: "published",
    createdAt: "2023-06-10",
  },
  {
    id: "report-4",
    title: "Fintech Revolution: Banking Disruption Analysis",
    author: "Alex Rivera, MBA",
    category: "Business Strategy",
    price: 69.99,
    status: "draft",
    createdAt: "2023-06-08",
  },
  {
    id: "report-5",
    title: "AI Implementation Strategies for Enterprise",
    author: "Dr. Robert Zhang",
    category: "Technology",
    price: 89.99,
    status: "published",
    createdAt: "2023-06-05",
  },
  {
    id: "report-6",
    title: "Supply Chain Resilience in Global Markets",
    author: "Maria Gonzalez, PhD",
    category: "Global Trends",
    price: 54.99,
    status: "archived",
    createdAt: "2023-06-01",
  },
];

const ManageReports = () => {
  const [reports, setReports] = useState<Report[]>(sampleReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDeleteReport = () => {
    if (reportToDelete) {
      setReports(reports.filter((report) => report.id !== reportToDelete.id));
      setDeleteDialogOpen(false);
      setReportToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Research Reports</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add New Report
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>${report.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        report.status,
                      )}`}
                    >
                      {report.status.charAt(0).toUpperCase() +
                        report.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{report.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileEdit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setReportToDelete(report);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the report "
              {reportToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReport}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageReports;
