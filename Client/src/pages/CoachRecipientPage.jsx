import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Mail,
  Send,
  X,
  User,
  Bell,
  CheckCircle,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const CoachRecipientPage = () => {
  // Mock data for recipients (only name field)
  const initialRecipients = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com' },
    { id: 2, name: 'Priya Sharma', email: 'priya.s@email.com' },
    { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha.r@email.com' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.s@email.com' },
    { id: 6, name: 'Anjali Desai', email: 'anjali.d@email.com' },
    { id: 7, name: 'Rohan Mehta', email: 'rohan.m@email.com' },
    { id: 8, name: 'Neha Gupta', email: 'neha.g@email.com' }
  ];

  const [recipients, setRecipients] = useState(initialRecipients);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [newRecipientName, setNewRecipientName] = useState('');
  const [newRecipientEmail, setNewRecipientEmail] = useState('');
  const [sendingInviteId, setSendingInviteId] = useState(null);
  const [inviteSuccess, setInviteSuccess] = useState(null);
  const [coachEmail] = useState('coach.anand@email.com'); // Current coach's email

  // Filter recipients based on search
  const filteredRecipients = recipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipients = filteredRecipients.slice(indexOfFirstItem, indexOfLastItem);


  // Delete recipient
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipient?')) {
      setRecipients(recipients.filter(recipient => recipient.id !== id));
    }
  };

  // Send invitation to coach
  const handleSendInvitation = (recipient) => {
    setSendingInviteId(recipient.id);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Invitation sent to Coach ${coachEmail} for recipient: ${recipient.name}`);
      
      setSendingInviteId(null);
      setInviteSuccess(recipient.id);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setInviteSuccess(null);
      }, 3000);
    }, 1500);
  };

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
               Athletes Invitaions
              </h1>
              <p className="text-gray-600 mt-2">Manage athletes invitations</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Athelete by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Add Recipient Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Athelete</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddRecipient} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Athelete name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newRecipientEmail}
                  onChange={(e) => setNewRecipientEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Add Athelete
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recipients List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">All Atheletes</h3>
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRecipients.length)} of {filteredRecipients.length}
              </div>
            </div>

            {currentRecipients.length === 0 ? (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-gray-500 text-lg">No recipients found</h4>
                <p className="text-gray-400 mt-2">Try adding a new Athelete</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Athelete</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecipients.map(recipient => (
                        <tr key={recipient.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="font-medium text-gray-900">{recipient.name}</div>
                            </div>
                          </td>
                          
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              {recipient.email}
                            </div>
                          </td>
                          
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {/* Send Invitation Button */}
                              <button
                                onClick={() => handleSendInvitation(recipient)}
                                disabled={sendingInviteId === recipient.id || inviteSuccess === recipient.id}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                  sendingInviteId === recipient.id
                                    ? 'bg-blue-100 text-blue-600 cursor-wait'
                                    : inviteSuccess === recipient.id
                                    ? 'bg-emerald-100 text-emerald-600 cursor-default'
                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                }`}
                              >
                                {sendingInviteId === recipient.id ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Sending...</span>
                                  </>
                                ) : inviteSuccess === recipient.id ? (
                                  <>
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Invite Sent</span>
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4" />
                                    <span>Send to Athlete</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredRecipients.length > itemsPerPage && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachRecipientPage;