import React, { useState, useEffect } from 'react';
import { IncidentMap } from './components/IncidentMap';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import svgPaths from './imports/svg-yragh2w9z4';

interface Incident {
  _id: string;
  type: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  photo?: {
    data: string;
    contentType: string;
    filename: string;
  };
  additionalNotes?: string;
  status: 'Pending' | 'Acknowledged' | 'Resolved';
  createdAt: string;
  updatedAt: string;
}

export default function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch incidents from backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        console.log('🔄 Fetching incidents from backend...');
        const response = await fetch('http://localhost:5000/api/incidents/admin', {
          headers: {
            'Content-Type': 'application/json',
            // Add auth token if needed
            // 'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('📡 Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Received data:', data);
          console.log('📊 Number of incidents:', data.data?.length || 0);
          
          setIncidents(data.data || []);
          // Select first incident by default
          if (data.data && data.data.length > 0) {
            setSelectedIncident(data.data[0]);
            console.log('🎯 Selected first incident:', data.data[0].type);
          } else {
            console.log('⚠️ No incidents found in response');
          }
        } else {
          console.error('❌ Failed to fetch incidents. Status:', response.status);
          const errorText = await response.text();
          console.error('Error details:', errorText);
        }
      } catch (error) {
        console.error('❌ Error fetching incidents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
    
    // Poll for new incidents every 10 seconds
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, []);

  // Format time ago
  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Update incident status
  const updateStatus = async (newStatus: 'Pending' | 'Acknowledged' | 'Resolved') => {
    if (!selectedIncident) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:5000/api/incidents/${selectedIncident._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update local state
        setSelectedIncident(data.data);
        setIncidents(prev => prev.map(inc => 
          inc._id === data.data._id ? data.data : inc
        ));
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Get status color and styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-[rgba(240,177,0,0.1)]',
          border: 'border-[rgba(240,177,0,0.3)]',
          text: 'text-[#fdc700]',
          icon: '#FDC700'
        };
      case 'Acknowledged':
        return {
          bg: 'bg-[rgba(81,162,255,0.1)]',
          border: 'border-[rgba(81,162,255,0.3)]',
          text: 'text-[#51A2FF]',
          icon: '#51A2FF'
        };
      case 'Resolved':
        return {
          bg: 'bg-[rgba(5,223,114,0.1)]',
          border: 'border-[rgba(5,223,114,0.3)]',
          text: 'text-[#05DF72]',
          icon: '#05DF72'
        };
      default:
        return {
          bg: 'bg-[rgba(240,177,0,0.1)]',
          border: 'border-[rgba(240,177,0,0.3)]',
          text: 'text-[#fdc700]',
          icon: '#FDC700'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading incidents...</div>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-white text-xl">No incidents reported yet</div>
      </div>
    );
  }

  const incident = selectedIncident || incidents[0];
  const statusStyle = getStatusStyle(incident.status);
  const imageUrl = incident.photo?.data 
    ? `data:${incident.photo.contentType};base64,${incident.photo.data}`
    : 'https://images.unsplash.com/photo-1639369488374-561b5486177d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGZpcmUlMjBzbW9rZXxlbnwxfHx8fDE3NjEzMjQzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[955px] bg-[#1a1a1a] rounded-2xl p-12 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* Title with incident selector */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-[#7ee5ff] tracking-[0.4px] text-[36px] leading-[36px] font-medium">
            Incident Detail View
          </h1>
          {incidents.length > 1 && (
            <select
              value={incident._id}
              onChange={(e) => {
                const selected = incidents.find(inc => inc._id === e.target.value);
                setSelectedIncident(selected || null);
              }}
              className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg border border-[#3a3a3a]"
            >
              {incidents.map((inc, idx) => (
                <option key={inc._id} value={inc._id}>
                  Incident #{idx + 1} - {inc.type.charAt(0).toUpperCase() + inc.type.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* User Updated Photo */}
          <div className="bg-[#2a2a2a] rounded-[14px] border border-[#3a3a3a] shadow-lg overflow-hidden aspect-video">
            <ImageWithFallback 
              src={imageUrl}
              alt={`${incident.type} Incident Photo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detail Map */}
          <div className="bg-[#2a2a2a] rounded-[14px] border border-[#3a3a3a] shadow-lg overflow-hidden aspect-video">
            <IncidentMap 
              center={[incident.location.coordinates[1], incident.location.coordinates[0]]}
              markerPosition={[incident.location.coordinates[1], incident.location.coordinates[0]]}
            />
          </div>
        </div>

        {/* Report Message */}
        {incident.additionalNotes && (
          <div className="bg-[#252525] rounded-[14px] p-6 border border-[#3a3a3a] mb-6">
            <h3 className="text-[#99a1af] text-sm mb-2">Report Message</h3>
            <p className="text-white">{incident.additionalNotes}</p>
          </div>
        )}

        {/* Details and Action Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Detail Information */}
          <div className="bg-[#252525] rounded-[14px] p-6 border border-[#3a3a3a] flex-1 max-w-[408px]">
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p15268c80} stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M12.5 4.80334V17.3033" stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M7.5 2.69666V15.1967" stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Location</div>
                  <div className="text-white text-sm">
                    {incident.location.coordinates[1].toFixed(4)}, {incident.location.coordinates[0].toFixed(4)}
                  </div>
                </div>
              </div>
              
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p2cf60600} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Category</div>
                  <div className="text-white capitalize">{incident.type}</div>
                </div>
              </div>
              
              {/* Reported */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <clipPath id="clip0_clock">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                    <g clipPath="url(#clip0_clock)">
                      <path d="M10 5V10L13.3333 11.6667" stroke="#05DF72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p14d24500} stroke="#05DF72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Reported</div>
                  <div className="text-white">{getTimeAgo(incident.createdAt)}</div>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <clipPath id="clip0_alert">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                    <g clipPath="url(#clip0_alert)">
                      <path d={svgPaths.p14d24500} stroke={statusStyle.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M10 6.66667V10" stroke={statusStyle.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M10 13.3333H10.0083" stroke={statusStyle.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="text-[#99a1af] text-sm">Status</div>
                  <div className={`${statusStyle.bg} ${statusStyle.border} border rounded-lg px-[8.8px] py-[1.8px] inline-block mt-1`}>
                    <span className={`${statusStyle.text} text-xs`}>{incident.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 md:self-end">
            <button 
              onClick={() => updateStatus('Acknowledged')}
              disabled={isUpdating || incident.status === 'Acknowledged'}
              className="bg-[#51A2FF] hover:bg-[#3d8ee6] disabled:bg-[#2a2a2a] disabled:text-[#666] text-white px-8 py-3 rounded-[10px] transition-colors duration-200 shadow-lg border border-[#3a3a3a]"
            >
              {isUpdating ? 'Updating...' : 'Acknowledge'}
            </button>
            <button 
              onClick={() => updateStatus('Resolved')}
              disabled={isUpdating || incident.status === 'Resolved'}
              className="bg-[#05DF72] hover:bg-[#04c564] disabled:bg-[#2a2a2a] disabled:text-[#666] text-white px-8 py-3 rounded-[10px] transition-colors duration-200 shadow-lg border border-[#3a3a3a]"
            >
              {isUpdating ? 'Updating...' : 'Resolve'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
