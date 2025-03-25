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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  FileEdit,
  Trash2,
  Star,
} from "lucide-react";

interface Expert {
  id: string;
  name: string;
  photo: string;
  credentials: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  reportsCount: number;
  consultationRate: number;
  status: "active" | "pending" | "inactive";
}

const sampleExperts: Expert[] = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert1",
    credentials: "Ph.D. in Economics, Harvard University",
    specialties: [
      "Market Research",
      "Financial Analysis",
      "Economic Forecasting",
    ],
    rating: 4.8,
    reviewCount: 124,
    reportsCount: 18,
    consultationRate: 150,
    status: "active",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert2",
    credentials: "Professor of Computer Science, MIT",
    specialties: ["AI Research", "Machine Learning", "Data Science"],
    rating: 4.9,
    reviewCount: 156,
    reportsCount: 24,
    consultationRate: 180,
    status: "active",
  },
  {
    id: "3",
    name: "Dr. Sarah Johnson",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert3",
    credentials: "Ph.D. in Environmental Science, Stanford",
    specialties: ["Climate Research", "Sustainability", "Environmental Policy"],
    rating: 4.7,
    reviewCount: 98,
    reportsCount: 12,
    consultationRate: 140,
    status: "active",
  },
  {
    id: "4",
    name: "Dr. Robert Williams",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert4",
    credentials: "Ph.D. in Biomedical Engineering, Johns Hopkins",
    specialties: ["Medical Research", "Biotechnology", "Healthcare Innovation"],
    rating: 4.6,
    reviewCount: 87,
    reportsCount: 9,
    consultationRate: 160,
    status: "pending",
  },
  {
    id: "5",
    name: "Prof. Elena Rodriguez",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert5",
    credentials: "Professor of Psychology, UC Berkeley",
    specialties: [
      "Behavioral Research",
      "Cognitive Science",
      "Social Psychology",
    ],
    rating: 4.9,
    reviewCount: 142,
    reportsCount: 15,
    consultationRate: 170,
    status: "inactive",
  },
];

const ManageExperts = () => {
  const [experts, setExperts] = useState<Expert[]>(sampleExperts);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expertToDelete, setExpertToDelete] = useState<Expert | null>(null);

  const filteredExperts = experts.filter(
    (expert) =>
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.credentials.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const handleDeleteExpert = () => {
    if (expertToDelete) {
      setExperts(experts.filter((expert) => expert.id !== expertToDelete.id));
      setDeleteDialogOpen(false);
      setExpertToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Experts</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add New Expert
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search experts..."
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
              <TableHead>Expert</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Reports</TableHead>
              <TableHead>Consultation Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <TableRow key={expert.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={expert.photo} alt={expert.name} />
                        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{expert.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {expert.credentials}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {expert.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{expert.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({expert.reviewCount})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{expert.reportsCount}</TableCell>
                  <TableCell>${expert.consultationRate}/hr</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        expert.status,
                      )}`}
                    >
                      {expert.status.charAt(0).toUpperCase() +
                        expert.status.slice(1)}
                    </span>
                  </TableCell>
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
                            setExpertToDelete(expert);
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
                  No experts found.
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
              Are you sure you want to delete the expert "{expertToDelete?.name}
              "? This will remove all their reports and consultations from the
              platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteExpert}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageExperts;
