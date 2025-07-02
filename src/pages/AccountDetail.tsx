import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Building2,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash,
  ChevronDown,
  Paperclip,
  Upload,
  Minus,
  Plus as PlusIcon
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useAccounts } from "@/context/AccountsContext";
import { useContacts } from "@/context/ContactsContext";
import { useOpportunities as useDeals } from "@/context/OpportunitiesContext";
import { useState } from "react";
import { OpportunityModal, OpportunitiesList } from "@/components/opportunities";
import PropTypes from "prop-types";

export default function AccountDetail({ accountId: propAccountId }) {
  // EARLY DEBUG LOGGING
  const params = useParams();
  const accountId = propAccountId || params.accountId;
  const { accounts, updateAccount } = useAccounts();
  if (!Array.isArray(accounts)) {
    return <div>Accounts context missing or corrupted. accounts={String(accounts)}</div>;
  }

  // (rest of hooks)
  const { contacts, addContact } = useContacts();
  const { opportunities: deals, addOpportunity: addDeal } = useDeals();

  // For now, we'll find the account from the context.
  const account = accounts.find((acc) => acc.id === accountId);
  let dynamicAccount = null;
  if (!account) {
    // Try to build a dynamic account from contacts
    const contactWithAccount = contacts.find(c => `A-dynamic-${c.account.replace(/\s+/g, '').toLowerCase()}` === accountId);
    if (contactWithAccount) {
      dynamicAccount = {
        id: accountId,
        name: contactWithAccount.account,
        owner: "Imported from Contact",
        created: new Date().toLocaleDateString(),
        industry: "",
        website: ""
      };
    }
  }
  const accountToShow = account || dynamicAccount;
  const accountContacts = contacts.filter(contact => contact.account === accountToShow?.name);

  // Find related deals for this account
  const relatedDeals = (deals || []).filter(
    (deal) => deal.account === accountToShow?.name
  );

  // Modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', title: '', account: accountToShow?.name || '', owner: accountToShow?.owner || '' });
  const [editForm, setEditForm] = useState(accountToShow ? { ...accountToShow } : { name: '', owner: '', industry: '', website: '', id: '' });

  // Map zoom state
  const [mapZoom, setMapZoom] = useState(1);

  // Tile order state for left column
  const initialTiles = [
    { key: "information", label: "Information" },
    { key: "contact", label: "Contact Details" },
    { key: "files", label: "Add Files" },
  ];
  const [tileOrder, setTileOrder] = useState(initialTiles.map(t => t.key));
  const [selectedTile, setSelectedTile] = useState(null);

  // Tile renderers
  const tileComponents = {
    information: (
      <Card className={`rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow ${selectedTile === "information" ? "ring-2 ring-blue-400" : ""}`}
        onClick={() => {
          if (selectedTile === null) setSelectedTile("information");
          else if (selectedTile !== "information") {
            // Swap
            const idx1 = tileOrder.indexOf(selectedTile);
            const idx2 = tileOrder.indexOf("information");
            const newOrder = [...tileOrder];
            [newOrder[idx1], newOrder[idx2]] = [newOrder[idx2], newOrder[idx1]];
            setTileOrder(newOrder);
            setSelectedTile(null);
          } else setSelectedTile(null);
        }}
        style={{ cursor: "pointer" }}
      >
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Building2 className="w-5 h-5 text-orange-500" />Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-base">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Account Name</span>
            <span className="font-semibold text-gray-900 text-lg">{accountToShow.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Website</span>
            <a href={`http://${accountToShow.website}`} className="text-purple-600 hover:underline font-semibold">{accountToShow.website}</a>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Type</span>
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">Business</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Description</span>
            <span className="text-gray-700 italic">-</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Parent Account</span>
            <span className="text-gray-700 italic">-</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Account Owner</span>
            <span className="font-semibold text-orange-700">{accountToShow.owner}</span>
          </div>
        </CardContent>
      </Card>
    ),
    contact: (
      <Card className={`rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow ${selectedTile === "contact" ? "ring-2 ring-blue-400" : ""}`}
        onClick={() => {
          if (selectedTile === null) setSelectedTile("contact");
          else if (selectedTile !== "contact") {
            // Swap
            const idx1 = tileOrder.indexOf(selectedTile);
            const idx2 = tileOrder.indexOf("contact");
            const newOrder = [...tileOrder];
            [newOrder[idx1], newOrder[idx2]] = [newOrder[idx2], newOrder[idx1]];
            setTileOrder(newOrder);
            setSelectedTile(null);
          } else setSelectedTile(null);
        }}
        style={{ cursor: "pointer" }}
      >
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Phone className="w-5 h-5 text-purple-500" />Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-base">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">6587412589</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Billing Address</p>
            <p className="font-medium">Siliguri<br/>Darjeeling<br/>West Bengal<br/>734001<br/>India</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-32 w-40 bg-gray-200 rounded-md flex items-center justify-center">
              <p>Map Placeholder</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon" onClick={e => { e.stopPropagation(); setMapZoom(z => Math.max(1, z - 1)); }}><Minus className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" onClick={e => { e.stopPropagation(); setMapZoom(z => z + 1); }}><PlusIcon className="w-4 h-4" /></Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shipping Address</p>
          </div>
        </CardContent>
      </Card>
    ),
    files: (
      <Card className={`rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow ${selectedTile === "files" ? "ring-2 ring-blue-400" : ""}`}
        onClick={() => {
          if (selectedTile === null) setSelectedTile("files");
          else if (selectedTile !== "files") {
            // Swap
            const idx1 = tileOrder.indexOf(selectedTile);
            const idx2 = tileOrder.indexOf("files");
            const newOrder = [...tileOrder];
            [newOrder[idx1], newOrder[idx2]] = [newOrder[idx2], newOrder[idx1]];
            setTileOrder(newOrder);
            setSelectedTile(null);
          } else setSelectedTile(null);
        }}
        style={{ cursor: "pointer" }}
      >
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Upload className="w-5 h-5 text-blue-500" />Add Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <Button variant="link">Upload Files</Button> or drop files
            </p>
          </div>
        </CardContent>
      </Card>
    ),
  };

  // Handlers
  const handleAddContact = (e) => {
    e.preventDefault();
    addContact(contactForm);
    setShowContactModal(false);
    setContactForm({ name: '', email: '', phone: '', title: '', account: accountToShow?.name || '', owner: accountToShow?.owner || '' });
  };
  const handleEditAccount = (e) => {
    e.preventDefault();
    updateAccount(editForm);
    setShowEditModal(false);
  };

  if (!accountToShow) {
    return (
      <div>
        <div>Account not found</div>
        <pre>accountId: {JSON.stringify(accountId, null, 2)}</pre>
        <pre>accounts: {JSON.stringify(accounts, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Building2 className="w-8 h-8 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Account</p>
            <h1 className="text-2xl font-bold">{accountToShow.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowContactModal(true)}>New Contact</Button>
          <Button variant="outline" onClick={() => setShowDealModal(true)}>New Deal</Button>
          <Button variant="default" onClick={() => setShowEditModal(true)}>
            Edit
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Compact grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Group: Reorderable tiles */}
        <div className="flex flex-col gap-4">
          {tileOrder.map(key => React.cloneElement(tileComponents[key], { className: tileComponents[key].props.className + ' p-4' }))}
        </div>

        {/* Activities Card */}
        <Card className="rounded-xl shadow bg-white hover:shadow-xl transition-shadow p-4">
          <CardContent className="p-4">
            <div className="flex justify-around mb-4">
              <Button variant="outline" size="icon"><Mail className="h-4 w-4"/></Button>
              <Button variant="outline" size="icon">Icon2</Button>
              <Button variant="outline" size="icon">Icon3</Button>
              <Button variant="outline" size="icon">Icon4</Button>
            </div>
            <div className="text-center py-6">
              <p>No activities to show.</p>
              <Button className="mt-2">Show All Activities</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Card */}
        <Card className="rounded-xl shadow bg-white hover:shadow-xl transition-shadow p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Contacts ({accountContacts.length})</CardTitle>
            <ChevronDown/>
          </CardHeader>
          <CardContent className="p-4">
            {accountContacts.map(contact => (
              <div key={contact.id} className="flex items-center space-x-4 py-2 border-b last:border-b-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-blue-600">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.title}</p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Deals Card */}
        <Card className="rounded-xl shadow bg-white hover:shadow-xl transition-shadow p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Deals</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <OpportunitiesList
              opportunities={relatedDeals}
              onAddOpportunity={() => setShowDealModal(true)}
            />
          </CardContent>
        </Card>

        {/* Cases Card */}
        <Card className="rounded-xl shadow bg-white hover:shadow-xl transition-shadow p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Cases (0)</CardTitle>
            <ChevronDown/>
          </CardHeader>
        </Card>
      </div>

      {/* Modals */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Contact</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddContact} className="space-y-4">
            <input className="w-full border p-2 rounded" placeholder="Name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="w-full border p-2 rounded" placeholder="Email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} required />
            <input className="w-full border p-2 rounded" placeholder="Phone" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} required />
            <input className="w-full border p-2 rounded" placeholder="Title" value={contactForm.title} onChange={e => setContactForm(f => ({ ...f, title: e.target.value }))} />
            <DialogFooter>
              <Button type="submit">Add Contact</Button>
              <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <OpportunityModal open={showDealModal} onClose={() => setShowDealModal(false)} initialData={{ account: accountToShow?.name || '' }} />
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditAccount} className="space-y-4">
            <input className="w-full border p-2 rounded" placeholder="Name" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="w-full border p-2 rounded" placeholder="Owner" value={editForm.owner} onChange={e => setEditForm(f => ({ ...f, owner: e.target.value }))} required />
            <input className="w-full border p-2 rounded" placeholder="Industry" value={editForm.industry} onChange={e => setEditForm(f => ({ ...f, industry: e.target.value }))} />
            <input className="w-full border p-2 rounded" placeholder="Website" value={editForm.website} onChange={e => setEditForm(f => ({ ...f, website: e.target.value }))} />
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
              <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

AccountDetail.propTypes = {
  accountId: PropTypes.string,
}; 