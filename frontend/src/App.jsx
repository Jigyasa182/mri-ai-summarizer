import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LogOut, Activity, LayoutDashboard, FileUp } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import History from './pages/History';
import Login from './pages/Login';
import Signup from './pages/Signup';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return children;
};

function AppContent() {
    const { user, logout } = useAuth();

    return (
        <Router>
            <div className="min-h-screen flex flex-col medical-grid">
                {user && (
                    <nav className="bg-[#0B0E14] border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <Link to="/" className="flex items-center gap-3">
                                <div className="bg-cyan-500 p-1.5 rounded-lg">
                                    <Activity className="w-6 h-6 text-[#0B0E14]" />
                                </div>
                                <span className="text-xl text-gradient">MRI AI</span>
                            </Link>

                            <div className="flex items-center gap-8">
                                <span className="text-slate-400 text-sm hidden md:block">{user.email}</span>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold border border-slate-800 hover:border-red-400/30 px-4 py-2 rounded-lg transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </nav>
                )}

                <main className="flex-grow max-w-7xl mx-auto w-full p-6">
                    <Routes>
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                    </Routes>
                </main>

                <footer className="py-8 text-center text-slate-600 text-xs uppercase tracking-widest border-t border-slate-900 mt-auto">
                    &copy; {new Date().getFullYear()} MRI AI • Intelligent Radiology Assistant
                </footer>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
