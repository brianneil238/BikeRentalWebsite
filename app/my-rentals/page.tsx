"use client";
import { useEffect, useState } from "react";

export default function MyRentalsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
    if (!user) {
      setError("You must be logged in to view your rentals.");
      setLoading(false);
      return;
    }
    fetch(`/api/my-rentals?email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setApplications(data.applications);
        else setError(data.error || "Failed to fetch rentals.");
      })
      .catch(() => setError("Failed to fetch rentals."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fa' }}><h2 style={{ color: '#1976d2' }}>Loading your rentals...</h2></div>;
  if (error) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fa' }}><h2 style={{ color: '#b22222' }}>{error}</h2></div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.10)', padding: 32 }}>
          <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 32, marginBottom: 32, textAlign: 'center' }}>
            My Rentals
          </h1>
          {applications.length === 0 ? (
            <div style={{ color: '#888', fontSize: 18, textAlign: 'center' }}>You have no rental applications yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Bike</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: 10 }}>{app.bike ? app.bike.name : '-'}</td>
                    <td style={{ padding: 10 }}>{app.bikeId ? 'Rented' : 'Pending'}</td>
                    <td style={{ padding: 10 }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
} 