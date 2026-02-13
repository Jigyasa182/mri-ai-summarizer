import React, { useState } from 'react';
import api from '../api/api';
import { Send, AlertCircle, Info, Loader2 } from 'lucide-react';

const ReportForm = ({ onAnalysisComplete }) => {
    const [reportText, setReportText] = useState('');
    const [age, setAge] = useState('');
    const [bodyPart, setBodyPart] = useState('General MRI');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reportText.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/api/report/analyze', {
                reportText,
                age: age ? parseInt(age) : null,
                bodyPart,
            });
            onAnalysisComplete(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'AI processing failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-gradient mb-8">Upload MRI Report</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 ml-1">Report Type</label>
                        <select
                            value={bodyPart}
                            onChange={(e) => setBodyPart(e.target.value)}
                            className="input-field appearance-none cursor-pointer"
                        >
                            <option value="General MRI">General MRI</option>
                            <option value="Brain MRI">Brain MRI</option>
                            <option value="Spine MRI">Spine MRI</option>
                            <option value="Joint/Musculoskeletal">Joint/Musculoskeletal</option>
                            <option value="Abdominal/Pelvic">Abdominal/Pelvic</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 ml-1">Patient Age (Optional)</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 45"
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">MRI Report Text</label>
                    <div className="relative">
                        <textarea
                            required
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                            placeholder="Paste the technical MRI report here..."
                            rows={10}
                            className="input-field font-mono text-sm leading-relaxed resize-none"
                        ></textarea>
                        <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 uppercase tracking-widest">
                            {reportText.length} characters
                        </div>
                    </div>
                </div>

                <div className="bg-blue-500/5 rounded-xl p-4 flex gap-3 text-sm text-cyan-400/80 border border-cyan-500/10">
                    <Info className="w-5 h-5 flex-shrink-0 text-cyan-500" />
                    <p className="leading-relaxed">
                        This tool simplifies medical reports for better documentation. It does not provide medical diagnosis or replace professional medical interpretation.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center gap-2 text-sm border border-red-500/20">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !reportText.trim()}
                    className="btn-primary w-full py-4 uppercase tracking-widest text-sm"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5 font-bold" />
                            Processing with AI...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 fill-white" />
                            Process Report
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
