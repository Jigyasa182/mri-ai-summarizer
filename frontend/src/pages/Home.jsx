import React, { useState } from 'react';
import ReportForm from '../components/ReportForm';
import History from './History';
import { LayoutDashboard, FileUp } from 'lucide-react';

const Home = () => {
    const [activeTab, setActiveTab] = useState('reports');
    const [newReport, setNewReport] = useState(null);

    const handleAnalysisComplete = (report) => {
        setNewReport(report);
        setActiveTab('reports');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Tab Navigation */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => {
                        setActiveTab('reports');
                        setNewReport(null);
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'reports'
                        ? 'btn-primary'
                        : 'btn-secondary text-slate-400 hover:text-white'
                        }`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    My Reports
                </button>
                <button
                    onClick={() => setActiveTab('new')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'new'
                        ? 'btn-primary'
                        : 'btn-secondary text-slate-400 hover:text-white'
                        }`}
                >
                    <FileUp className="w-5 h-5" />
                    New Report
                </button>
            </div>

            <div className="min-h-[60vh]">
                {activeTab === 'reports' ? (
                    <History initialReport={newReport} />
                ) : (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <ReportForm onAnalysisComplete={handleAnalysisComplete} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
