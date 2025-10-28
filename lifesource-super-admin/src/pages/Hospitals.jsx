import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const hospitals = [
  {
    id: "HOSP-001",
    name: "City General Hospital",
    location: "Los Angeles, CA",
    email: "admin@citygeneral.org",
    phone: "+1 (555) 123-4567",
    status: "Active",
    capacity: 450,
    lastActive: "2 hours ago",
    documentsStatus: "Verified",
  },
  {
    id: "HOSP-002",
    name: "St. Mary's Medical Center",
    location: "Phoenix, AZ",
    email: "contact@stmarys.org",
    phone: "+1 (555) 987-6543",
    status: "Active",
    capacity: 320,
    lastActive: "1 day ago",
    documentsStatus: "Verified",
  },
  {
    id: "HOSP-003",
    name: "Valley Medical Institute",
    location: "Sacramento, CA",
    email: "info@valleymed.org",
    phone: "+1 (555) 456-7890",
    status: "Pending",
    capacity: 280,
    lastActive: "Never",
    documentsStatus: "Under Review",
  },
  {
    id: "HOSP-004",
    name: "Metro Emergency Center",
    location: "Phoenix, AZ",
    email: "admin@metroec.org",
    phone: "+1 (555) 321-9876",
    status: "Suspended",
    capacity: 150,
    lastActive: "1 week ago",
    documentsStatus: "Issues Found",
  },
];

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || hospital.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Suspended":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Suspended":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-6 font-work">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hospital Management</h1>
          <p className="text-muted-foreground">
            Manage hospital registrations, approvals, and status
          </p>
        </div>
        <Button className="bg-[#008080] hover:bg[#008080]/20">
          <Building2 className="w-4 h-4 mr-1" />
          Add Hospital
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search hospitals by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {["All", "Active", "Pending", "Suspended"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                  size="sm"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card
            key={hospital.id}
            className="shadow-soft hover:shadow-medium transition-smooth"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hospital.location}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(hospital.status)}>
                    {getStatusIcon(hospital.status)}
                    <span className="ml-1">{hospital.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                  </div>
                  <p className="font-medium">{hospital.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                  </div>
                  <p className="font-medium">{hospital.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="font-medium">{hospital.capacity} beds</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Active</p>
                  <p className="font-medium">{hospital.lastActive}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    Documents Status:
                  </span>
                  <Badge
                    variant={
                      hospital.documentsStatus === "Verified"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {hospital.documentsStatus}
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  {hospital.status === "Pending" ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  ) : hospital.status === "Suspended" ? (
                    <Button
                      size="sm"
                      className="flex-1 bg-success hover:bg-success/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Reactivate
                    </Button>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                      >
                        Suspend
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="text-center py-12">
            <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No hospitals found</p>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default Hospitals;
