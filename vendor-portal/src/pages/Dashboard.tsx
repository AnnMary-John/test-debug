import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCars, getDrivers } from '../lib/api';
import { Car, LogOut, Users, Truck, ChevronRight, Search } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'cars' | 'drivers'>('cars');
  const [cars, setCars] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [driverSearch, setDriverSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    // Add dark class to body to ensure consistent look with Ops Portal dark theme
    document.documentElement.classList.add('dark');

    const fetchCars = async () => {
      try {
        const res = await getCars();
        setCars(res.data);
      } catch (err) {
        console.error('Failed to fetch cars', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await getDrivers(driverSearch, page, limit);
        setDrivers(res.data.data);
        setTotalDrivers(res.data.total);
      } catch (err) {
        console.error('Failed to fetch drivers', err);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchDrivers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [driverSearch, page]);

  useEffect(() => {
    setPage(1);
  }, [driverSearch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-sidebar-foreground">FleetHub</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="text-[10px] font-bold text-sidebar-foreground/40 px-4 mb-4 uppercase tracking-widest">
            Fleet Management
          </div>
          <button
            onClick={() => setActiveTab('cars')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-all group ${activeTab === 'cars'
                ? 'bg-sidebar-accent text-sidebar-foreground shadow-sm'
                : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
          >
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5" />
              <span className="font-medium">Vehicles</span>
            </div>
            {activeTab === 'cars' && <ChevronRight className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setActiveTab('drivers')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-all group ${activeTab === 'drivers'
                ? 'bg-sidebar-accent text-sidebar-foreground shadow-sm'
                : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span className="font-medium">Drivers</span>
            </div>
            {activeTab === 'drivers' && <ChevronRight className="w-4 h-4" />}
          </button>
        </nav>

        <div className="p-4 border-t border-sidebar-border/50">
          <div className="bg-sidebar-accent/30 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate text-sidebar-foreground">{user?.name}</p>
                <p className="text-[10px] text-sidebar-foreground/50 truncate uppercase tracking-tighter">{user?.vendorId}</p>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                {activeTab === 'cars' ? 'Vehicle Fleet' : 'Team Drivers'}
              </h1>
              <div className="flex items-center gap-2">
                <span className="bg-muted px-2 py-0.5 rounded text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Internal Portal
                </span>
                <span className="text-muted-foreground text-sm">
                  Managing assets for <span className="text-foreground font-semibold underline decoration-primary/40">{user?.vendorId}</span>
                </span>
              </div>
            </div>

            {activeTab === 'drivers' && (
              <div className="relative w-full md:w-72 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search drivers by name..."
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            )}
          </header>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-6">
            <table className="w-full text-left text-sm">
              {/* Table header remains same */}
              {/* ... */}
              <tbody className="divide-y divide-border">
                {activeTab === 'cars' ? (
                  // Cars mapping remains same
                  cars.map((car) => (
                    <tr key={car.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-foreground">{car.make}</div>
                        <div className="text-muted-foreground text-xs">{car.model}</div>
                      </td>
                      <td className="px-6 py-5 text-muted-foreground font-mono">{car.year}</td>
                      <td className="px-6 py-5">
                        <code className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs border border-border font-mono">
                          {car.licensePlate}
                        </code>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="inline-flex items-center gap-1.5 bg-success/10 text-success px-2.5 py-1 rounded-full text-[10px] font-bold border border-success/20 uppercase tracking-tighter">
                          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                          On-Road
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-foreground">{driver.name}</div>
                        <div className="text-muted-foreground text-[10px] font-mono tracking-tighter">ID: {driver.id.split('-')[0]}</div>
                      </td>
                      <td className="px-6 py-5 text-muted-foreground font-mono">{driver.licenseNumber}</td>
                      <td className="px-6 py-5 text-muted-foreground">{driver.phoneNumber}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] font-bold border border-primary/20 uppercase tracking-tighter">
                          Verified
                        </div>
                      </td>
                    </tr>
                  ))
                )}
                {(activeTab === 'cars' ? cars.length : drivers.length) === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-muted-foreground italic bg-muted/5">
                      No information available for this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {activeTab === 'drivers' && totalDrivers > limit && (
            <div className="flex items-center justify-between px-2 mb-10">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Showing <span className="text-foreground">{(page - 1) * limit + 1}</span>-
                <span className="text-foreground">{Math.min(page * limit, totalDrivers)}</span> of
                <span className="text-foreground ml-1">{totalDrivers}</span> drivers
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-card border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * limit >= totalDrivers}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-card border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          <footer className="mt-8 text-center text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
            &copy; 2026 Fleet Management Systems &bull; Confidential Data
          </footer>
        </div>
      </main>
    </div>
  );
};
