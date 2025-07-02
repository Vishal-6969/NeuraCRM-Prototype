import {
  ChevronLeft,
  Check,
  Pencil,
  Mail,
  Calendar as CalendarIcon,
  ListChecks,
  Phone,
  Settings2,
  Upload,
  ChevronDown,
  User,
  Building,
  DollarSign,
  Calendar,
  Info,
  UserCircle,
  Clock,
  Briefcase,
  Percent,
  FileText,
  Paperclip,
  Users,
  Plus,
  Search,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableCell, TableRow } from "@/components/ui/table";

const InfoRow = ({ icon: Icon, label, value, isLink = false }) => (
  <div>
    <dt className="text-sm text-gray-500">{label}</dt>
    <dd className={`mt-1 flex items-center justify-between text-sm font-medium text-gray-800`}>
      <span className={isLink ? "text-blue-600 hover:underline cursor-pointer" : ""}>{value}</span>
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <Pencil className="h-4 w-4 text-gray-400" />
      </Button>
    </dd>
  </div>
);

const AboutCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">About</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <InfoRow icon={Briefcase} label="Opportunity Name" value="Eire-" />
      <InfoRow icon={Building} label="Account Name" value="Amazon India" isLink />
      <InfoRow icon={Calendar} label="Close Date" value="30/06/2025" />
      <InfoRow icon={DollarSign} label="Amount" value="" />
      <InfoRow icon={FileText} label="Description" value="" />
      <InfoRow icon={UserCircle} label="Opportunity Owner" value="Vishal Paswan" isLink />
    </CardContent>
  </Card>
);

const StatusCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow icon={Briefcase} label="Stage" value="Propose" />
        <InfoRow icon={Percent} label="Probability (%)" value="50%" />
        <InfoRow icon={Info} label="Forecast Category" value="Pipeline" />
        <InfoRow icon={Briefcase} label="Next Step" value="" />
      </CardContent>
    </Card>
);

const HistoryCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">History</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>VP</AvatarFallback>
        </Avatar>
        <div>
            <p className="text-sm">Created By <span className="font-medium text-blue-600 hover:underline cursor-pointer">Vishal Paswan</span></p>
            <p className="text-xs text-gray-500">28/06/2025, 07:51</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ActivitiesCard = () => (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                    <Button variant="outline" size="icon" className="bg-gray-200 border-gray-300"><Mail className="h-5 w-5"/></Button>
                    <Button variant="outline" size="icon" className="bg-purple-100 border-purple-200"><CalendarIcon className="h-5 w-5 text-purple-600"/></Button>
                    <Button variant="outline" size="icon"><ListChecks className="h-5 w-5"/></Button>
                    <Button variant="outline" size="icon"><Phone className="h-5 w-5"/></Button>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-500"/>
                    <Label htmlFor="show-insights" className="text-sm font-medium">Only show activities with insights</Label>
                    <Switch id="show-insights" />
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Filters: Within 2 months • All activities • All types</p>
        </CardHeader>
        <CardContent className="text-center py-10 bg-gray-50 rounded-b-lg">
            <h3 className="text-md font-semibold">Upcoming & Overdue</h3>
            <p className="mt-2 text-sm text-gray-500">No activities to show.</p>
            <p className="text-sm text-gray-500">Get started by sending an email, scheduling a task, and more.</p>
            <div className="mt-4 bg-gray-100 border border-gray-200 rounded-md p-2 text-sm text-gray-600 inline-flex items-center">
                <Info className="h-4 w-4 mr-2" />
                To change what's shown, try changing your filters.
            </div>
            <Button className="mt-6">Show All Activities</Button>
        </CardContent>
    </Card>
);

const ContactRolesCard = ({ contacts }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Contact Roles ({contacts.length})</CardTitle>
        <Button variant="ghost" size="icon"><ChevronDown className="h-5 w-5"/></Button>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <p className="text-sm text-gray-500">No contacts.</p>
        ) : (
          contacts.map((contact, idx) => (
            <div key={contact} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3 rounded-md">
                        <AvatarFallback className="rounded-md bg-purple-600 text-white">{contact.split(' ').map(w => w[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-blue-600 hover:underline cursor-pointer">{contact}</p>
                        <p className="text-sm text-gray-500">Role:</p>
                    </div>
                </div>
                <Badge variant="secondary">PRIMARY</Badge>
            </div>
          ))
        )}
        <Button variant="link" className="p-0 h-auto mt-4 text-blue-600">View All</Button>
      </CardContent>
    </Card>
);

const FilesCard = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Files (0)</CardTitle>
            <Button variant="ghost" size="icon"><ChevronDown className="h-5 w-5"/></Button>
        </CardHeader>
        <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Files</Button>
                <p className="text-sm text-gray-500 mt-2">Or drop files</p>
            </div>
        </CardContent>
    </Card>
);

const ProductsCard = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Products (0)</CardTitle>
            <Button variant="ghost" size="icon"><ChevronDown className="h-5 w-5"/></Button>
        </CardHeader>
    </Card>
);

export const initialOpportunities = [
  {
    id: "O-001",
    title: "Eire-",
    company: "Amazon India",
    stage: "Closed Won",
    closeDate: "30/06/2025",
    owner: "User",
    account: "Amazon India",
    ownerAlias: "User",
  },
  {
    id: "O-002",
    title: "Amazon-",
    company: "Amazon",
    stage: "Qualify",
    closeDate: "30/06/2025",
    owner: "User",
    account: "Amazon",
    ownerAlias: "User",
  },
  {
    id: "O-003",
    title: "Eayo-",
    company: "Eayo",
    stage: "Closed Lost",
    closeDate: "09/06/2025",
    owner: "User",
    account: "Eayo",
    ownerAlias: "User",
  },
  {
    id: "O-004",
    title: "Flipkart-",
    company: "Flipkart",
    stage: "Closed Won",
    closeDate: "07/06/2025",
    owner: "User",
    account: "Flipkart",
    ownerAlias: "User",
  },
  {
    id: "O-005",
    title: "atome-",
    company: "atome",
    stage: "Closed Won",
    closeDate: "06/06/2025",
    owner: "User",
    account: "atome",
    ownerAlias: "User",
  },
  {
    id: "O-006",
    title: "Spring Promo 2025",
    company: "Vishal Kumar",
    stage: "Propose",
    closeDate: "06/06/2025",
    owner: "User",
    account: "Vishal Kumar",
    ownerAlias: "User",
  },
  {
    id: "O-007",
    title: "New Business",
    company: "Vishal Kumar",
    stage: "Propose",
    closeDate: "03/08/2025",
    owner: "User",
    account: "Vishal Kumar",
    ownerAlias: "User",
  },
  {
    id: "O-008",
    title: "Vishal Kumar",
    company: "Vishal Kumar",
    stage: "Closed Won",
    closeDate: "03/06/2025",
    owner: "User",
    account: "Vishal Kumar",
    ownerAlias: "User",
  },
];

function OpportunitiesList({ opportunities, onSelect, onAddOpportunity, accounts, contacts }) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    account: '',
    contact: '',
    stage: 'Qualify',
    closeDate: '',
    owner: '',
  });
  const [newAccount, setNewAccount] = useState('');
  const [newContact, setNewContact] = useState('');
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [creatingContact, setCreatingContact] = useState(false);
  const [viewCount, setViewCount] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const filtered = opportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.account.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let accountName = form.account;
    let contactName = form.contact;
    if (creatingAccount && newAccount) accountName = newAccount;
    if (creatingContact && newContact) contactName = newContact;
    onAddOpportunity({
      id: `O-${Math.floor(Math.random()*100000)}`,
      title: form.title,
      account: accountName,
      company: accountName,
      contact: contactName,
      stage: form.stage,
      closeDate: form.closeDate,
      owner: form.owner,
      ownerAlias: form.owner,
    }, creatingAccount ? accountName : null, creatingContact ? contactName : null);
    setForm({ title: '', account: '', contact: '', stage: 'Qualify', closeDate: '', owner: '' });
    setNewAccount('');
    setNewContact('');
    setCreatingAccount(false);
    setCreatingContact(false);
    setShowNewModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Opportunities</h1>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-muted-foreground">View</label>
          <select className="border rounded px-2 py-1 text-sm" value={viewCount} onChange={e => { setViewCount(Number(e.target.value)); setPage(1); }}>
            {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>&lt;</Button>
          <span className="text-xs">Page {page} of {Math.max(1, Math.ceil(filtered.length / viewCount))}</span>
          <Button variant="outline" size="sm" disabled={page === Math.ceil(filtered.length / viewCount) || filtered.length === 0} onClick={() => setPage(p => Math.min(Math.ceil(filtered.length / viewCount), p + 1))}>&gt;</Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="     Search opportunities..."
              className="w-56 pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">Import</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Bulk Delete</DropdownMenuItem>
              <DropdownMenuItem>Export Selected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setShowNewModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Opportunity
          </Button>
        </div>
      </div>
      <div className="px-8 pb-8">
        <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
          <Table className="min-w-full border-separate border-spacing-0">
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
                <TableHeader className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100"><input type="checkbox" /></TableHeader>
                <TableHeader className="w-[50px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">#</TableHeader>
                <TableHeader className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Opportunity Name</TableHeader>
                <TableHeader className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Account Name</TableHeader>
                <TableHeader className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Stage</TableHeader>
                <TableHeader className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Close Date</TableHeader>
                <TableHeader className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Opportunity Owner Alias</TableHeader>
                <TableHeader className="text-left px-2 py-2 font-bold text-gray-700 bg-gray-100">Actions</TableHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice((page-1)*viewCount, page*viewCount).map((opp, idx) => (
                <TableRow
                  key={opp.id}
                  className="border-b border-gray-300 text-sm group hover:bg-blue-50 transition-colors"
                  onClick={() => onSelect(opp)}
                >
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="px-2 py-1 text-muted-foreground border-r border-gray-200 bg-white group-hover:bg-blue-50">{idx + 1}</TableCell>
                  <TableCell className="px-2 py-1 font-medium border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    <span className="text-blue-600 hover:underline cursor-pointer">{opp.title}</span>
                  </TableCell>
                  <TableCell className="px-2 py-1 font-bold border-r border-gray-200 bg-white group-hover:bg-blue-50">{opp.account}</TableCell>
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    <Badge variant={opp.stage === 'Closed Won' ? 'default' : opp.stage === 'Closed Lost' ? 'destructive' : 'secondary'}>{opp.stage}</Badge>
                  </TableCell>
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{opp.closeDate}</TableCell>
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{opp.ownerAlias}</TableCell>
                  <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Opportunity</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Opportunity</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label>Opportunity Name</Label>
              <input className="w-full border rounded px-2 py-1" name="title" value={form.title} onChange={handleFormChange} required />
            </div>
            <div>
              <Label>Account</Label>
              <div className="flex gap-2">
                <select
                  className="w-full border rounded px-2 py-1"
                  name="account"
                  value={creatingAccount ? '' : form.account}
                  onChange={e => { setCreatingAccount(false); setForm({ ...form, account: e.target.value }); }}
                  disabled={creatingAccount}
                  required={!creatingAccount}
                >
                  <option value="">Select Account</option>
                  {accounts.map(acc => <option key={acc} value={acc}>{acc}</option>)}
                </select>
                <Button type="button" variant="outline" onClick={() => { setCreatingAccount(true); setForm({ ...form, account: '' }); }}>New</Button>
              </div>
              {creatingAccount && (
                <input className="w-full border rounded px-2 py-1 mt-2" placeholder="New Account Name" value={newAccount} onChange={e => setNewAccount(e.target.value)} required />
              )}
            </div>
            <div>
              <Label>Contact</Label>
              <div className="flex gap-2">
                <select
                  className="w-full border rounded px-2 py-1"
                  name="contact"
                  value={creatingContact ? '' : form.contact}
                  onChange={e => { setCreatingContact(false); setForm({ ...form, contact: e.target.value }); }}
                  disabled={creatingContact}
                  required={!creatingContact}
                >
                  <option value="">Select Contact</option>
                  {contacts.map(con => <option key={con} value={con}>{con}</option>)}
                </select>
                <Button type="button" variant="outline" onClick={() => { setCreatingContact(true); setForm({ ...form, contact: '' }); }}>New</Button>
              </div>
              {creatingContact && (
                <input className="w-full border rounded px-2 py-1 mt-2" placeholder="New Contact Name" value={newContact} onChange={e => setNewContact(e.target.value)} required />
              )}
            </div>
            <div>
              <Label>Stage</Label>
              <select className="w-full border rounded px-2 py-1" name="stage" value={form.stage} onChange={handleFormChange} required>
                <option value="Qualify">Qualify</option>
                <option value="Meet & Present">Meet & Present</option>
                <option value="Propose">Propose</option>
                <option value="Negotiate">Negotiate</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
            <div>
              <Label>Close Date</Label>
              <input className="w-full border rounded px-2 py-1" name="closeDate" type="date" value={form.closeDate} onChange={handleFormChange} required />
            </div>
            <div>
              <Label>Owner</Label>
              <input className="w-full border rounded px-2 py-1" name="owner" value={form.owner} onChange={handleFormChange} required />
            </div>
            <DialogFooter>
              <Button type="submit">Add Opportunity</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { OpportunitiesList };

function OpportunityDetailView({ opportunity, onBack, contacts }) {
  // Stages for the progress bar
  const stages = [
    "Qualify",
    "Meet & Present",
    "Propose",
    "Negotiate",
    "Closed",
  ];
  const [currentStageIdx, setCurrentStageIdx] = useState(0); // User can set this
  const [pendingStageIdx, setPendingStageIdx] = useState(null);
  const [closedType, setClosedType] = useState(null); // 'Closed Won' or 'Closed Lost'
  const [showClosedDialog, setShowClosedDialog] = useState(false);

  const handleStageClick = (idx) => {
    setPendingStageIdx(idx);
  };

  const handleMarkCurrentStage = () => {
    if (pendingStageIdx !== null) {
      if (stages[pendingStageIdx] === "Closed") {
        setShowClosedDialog(true);
    } else {
        setCurrentStageIdx(pendingStageIdx);
        setClosedType(null);
        setPendingStageIdx(null);
      }
    }
  };

  const handleClosedTypeSelect = (type) => {
    setClosedType(type);
    setCurrentStageIdx(stages.length - 1);
    setShowClosedDialog(false);
    setPendingStageIdx(null);
  };

  // For display, if current is closed, show closedType
  const getStageDisplay = (idx) => {
    if (idx === stages.length - 1 && currentStageIdx === idx && closedType) {
      return closedType;
    }
    return stages[idx];
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src="https://pbs.twimg.com/profile_images/1719850389273731072/i3A7p4I7_400x400.jpg" alt="Eire" />
            <AvatarFallback className="bg-orange-500 text-white font-bold">O</AvatarFallback>
          </Avatar>
        <div>
            <p className="text-sm text-gray-500">Opportunity</p>
            <h1 className="text-2xl font-bold text-gray-800">{opportunity.title}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">New Event</Button>
          <Button variant="outline">New Task</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="outline" size="icon" onClick={onBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Stage Progress Bar */}
      <div className="flex items-center bg-white rounded-2xl p-2 mb-6 shadow-sm">
        <Button variant="ghost" size="icon" className="mr-2 rounded-full">
          <ChevronDown className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 items-center">
          {stages.map((stage, idx) => {
            const isCurrent = idx === currentStageIdx;
            const isPrev = idx < currentStageIdx;
            const isFuture = idx > currentStageIdx;
            const isPending = pendingStageIdx === idx;
            const isClosed = idx === stages.length - 1 && (isCurrent || isPending);
            return (
              <React.Fragment key={stage}>
                <div
                  className={`flex items-center justify-center h-10 px-8 min-w-[120px] text-sm font-medium relative transition-all duration-200 cursor-pointer
                    ${(isCurrent || isPrev || isPending) ? (isClosed ? (closedType === 'Closed Won' ? 'bg-teal-200 text-black' : closedType === 'Closed Lost' ? 'bg-red-200 text-black' : 'bg-[#001A3A] text-white') : 'bg-[#001A3A] text-white') : 'bg-gray-200 text-black'}
                    ${idx === 0 ? "rounded-l-full" : ""}
                    ${idx === stages.length - 1 ? "rounded-r-full" : ""}
                    ${isPending ? "ring-2 ring-blue-400" : ""}
                  `}
                  style={{ zIndex: 2 }}
                  onClick={() => handleStageClick(idx)}
                >
                  {/* Show check for previous, name for current/future, closedType for closed */}
                  {isPrev && !isCurrent && !isPending ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{getStageDisplay(idx)}</span>
                  )}
                </div>
                {idx < stages.length - 1 && (
                  <div
                    className="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-white -ml-2 -mr-2"
                    style={{ zIndex: 1 }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {pendingStageIdx !== null && pendingStageIdx !== currentStageIdx && (
          <Button className="ml-4 bg-[#0070F3] hover:bg-[#0059c1] text-white font-semibold rounded-full px-6" onClick={handleMarkCurrentStage}>
            Mark as Current Stage
          </Button>
        )}
      </div>

      {/* Closed Stage Dialog */}
      <Dialog open={showClosedDialog} onOpenChange={setShowClosedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Closed Stage</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button variant="outline" className="w-full" onClick={() => handleClosedTypeSelect('Closed Won')}>Closed Won</Button>
            <Button variant="outline" className="w-full" onClick={() => handleClosedTypeSelect('Closed Lost')}>Closed Lost</Button>
            </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowClosedDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            <AboutCard/>
            <StatusCard/>
            <HistoryCard/>
        </div>
        <div className="col-span-12 lg:col-span-6">
            <ActivitiesCard/>
        </div>
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            <ContactRolesCard contacts={contacts}/>
            <FilesCard/>
            <ProductsCard/>
        </div>
      </main>
    </div>
  );
}

export default function OpportunitiesPage() {
  const { opportunities, addOpportunity } = useOpportunities();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  if (selectedOpportunity) {
    return (
      <OpportunityDetailView
        opportunity={selectedOpportunity}
        onBack={() => setSelectedOpportunity(null)}
        contacts={[]}
      />
    );
  }
  return <OpportunitiesList opportunities={opportunities} onSelect={setSelectedOpportunity} onAddOpportunity={addOpportunity} accounts={[]} contacts={[]} />;
} 