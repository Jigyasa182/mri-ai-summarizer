import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock } from 'lucide-react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await signup(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 text-center">
                <h1 className="text-4xl text-gradient mb-2">MRI AI</h1>
                <p className="text-slate-400 text-sm mb-8">Intelligent MRI Report Simplification</p>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="text-slate-300 text-sm font-medium ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/50" />
                            <input
                                type="email"
                                required
                                className="input-field pl-12"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-300 text-sm font-medium ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/50" />
                            <input
                                type="password"
                                required
                                className="input-field pl-12"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-300 text-sm font-medium ml-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/50" />
                            <input
                                type="password"
                                required
                                className="input-field pl-12"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-4"
                    >
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><UserPlus className="w-5 h-5" /> Sign Up</>}
                    </button>

                    <p className="text-slate-500 text-sm py-2">
                        Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
