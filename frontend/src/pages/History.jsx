import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Eye, Trash2, FileText, Loader2 } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';

const History = ({ initialReport }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(initialReport || null);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        if (initialReport) {
            setSelectedReport(initialReport);
        }
    }, [initialReport]);

    const fetchHistory = async () => {
        try {
            const response = await api.get('/api/report/history');
            setReports(response.data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteReport = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;
        try {
            await api.delete(`/api/report/${id}`);
            setReports(reports.filter(r => r._id !== id));
            if (selectedReport?._id === id) setSelectedReport(null);
        } catch (err) {
            alert("Failed to delete report");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <span>Loading your reports...</span>
            </div>
        );
    }

    if (selectedReport) {
        return (
            <div className="animate-in zoom-in-95 duration-300 space-y-6">
                <button
                    onClick={() => setSelectedReport(null)}
                    className="btn-secondary py-2 px-4 text-xs mb-4"
                >
                    &larr; Back to List
                </button>
                <SummaryCard report={selectedReport} />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reports.length === 0 ? (
                <div className="glass-card p-20 text-center text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>You haven't uploaded any MRI reports yet.</p>
                </div>
            ) : (
                reports.map((report) => (
                    <div
                        key={report._id}
                        className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-cyan-500/30 transition-all"
                    >
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-100">
                                {report.bodyPart || 'General MRI'}
                            </h3>
                            <div className="flex items-center gap-3 text-slate-500 text-xs">
                                <span>Patient: {report.age ? `${report.age}y` : 'Anonymous'}</span>
                                <span>•</span>
                                <span>{new Date(report.createdAt).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedReport(report)}
                                className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                                title="View Analysis"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => deleteReport(report._id)}
                                className="p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default History;
