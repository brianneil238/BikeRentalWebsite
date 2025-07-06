"use client";
import { useState, useEffect } from "react";

interface Bike {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  applications?: any[];
}

export default function AdminBikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addName, setAddName] = useState("");
  const [addStatus, setAddStatus] = useState("available");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await fetch("/api/admin/bikes");
      const data = await response.json();
      
      if (data.success) {
        setBikes(data.bikes);
      } else {
        setError("Failed to fetch bikes");
      }
    } catch (err) {
      setError("Failed to fetch bikes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBike = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!addName.trim()) {
      setAddError("Plate number is required.");
      return;
    }
    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/bikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: addName.trim(), status: addStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAddName("");
        setAddStatus("available");
        fetchBikes();
      } else {
        setAddError(data.error || "Failed to add bike.");
      }
    } catch {
      setAddError("Failed to add bike.");
    }
    setAddLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "#22c55e";
      case "rented":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "rented":
        return "Rented";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fa' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Loading bikes...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.10)', padding: 32 }}>
          <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 32, marginBottom: 32, textAlign: 'center' }}>
            Bike Inventory Management
          </h1>
          
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: 16, borderRadius: 8, marginBottom: 24 }}>
              {error}
            </div>
          )}

          {/* Add Bike Form */}
          <form onSubmit={handleAddBike} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Plate Number (e.g. BSU 011)"
              value={addName}
              onChange={e => setAddName(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1.5px solid #e0e0e0',
                fontSize: 16,
                minWidth: 180,
                outline: 'none',
                fontFamily: 'inherit',
              }}
              disabled={addLoading}
            />
            <select
              value={addStatus}
              onChange={e => setAddStatus(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1.5px solid #e0e0e0',
                fontSize: 16,
                outline: 'none',
                fontFamily: 'inherit',
              }}
              disabled={addLoading}
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
            </select>
            <button
              type="submit"
              style={{
                background: '#1976d2',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                border: 'none',
                borderRadius: 8,
                padding: '10px 28px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                letterSpacing: 0.1,
              }}
              disabled={addLoading}
            >
              {addLoading ? 'Adding...' : 'Add Bike'}
            </button>
            {addError && <span style={{ color: '#b22222', fontWeight: 600, fontSize: 15 }}>{addError}</span>}
          </form>

          <div style={{ display: 'grid', gap: 16 }}>
            {bikes.map((bike) => (
              <div 
                key={bike.id} 
                style={{ 
                  border: '1px solid #e5e7eb', 
                  borderRadius: 12, 
                  padding: 20, 
                  background: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ color: '#111827', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>
                    {bike.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>
                    Added: {new Date(bike.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {bike.status === "rented" && bike.applications && bike.applications.length > 0 ? (
                    <div>
                      <span>Rented by: {bike.applications[0].firstName} {bike.applications[0].lastName}</span>
                    </div>
                  ) : (
                    <span>Available</span>
                  )}
                  
                  {bike.applications && bike.applications.length > 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#1976d2', fontWeight: 600, fontSize: 16 }}>
                        {bike.applications.length}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: 12 }}>
                        Application{bike.applications.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <div style={{ background: '#f0f8ff', padding: 20, borderRadius: 12 }}>
              <h3 style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>
                Summary
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 24 }}>
                    {bikes.filter(b => b.status === 'available').length}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 14 }}>Available</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 24 }}>
                    {bikes.filter(b => b.status === 'rented').length}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 14 }}>Rented</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 24 }}>
                    {bikes.length}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 14 }}>Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 