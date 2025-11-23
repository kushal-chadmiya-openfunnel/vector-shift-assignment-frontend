// submit.js

import { useStore } from './store';
import { Send, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const dagStatus = data.is_dag ? '✓ Yes' : '✗ No';
            const dagColor = data.is_dag ? '#10B981' : '#EF4444';

            const message = `Pipeline Analysis Results:\n\n` +
                `📊 Number of Nodes: ${data.num_nodes}\n` +
                `🔗 Number of Edges: ${data.num_edges}\n` +
                `${data.is_dag ? '✅' : '❌'} Is a Valid DAG: ${dagStatus}`;

            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(
                `❌ Error submitting pipeline!\n\n` +
                `Please make sure the backend server is running.\n` +
                `Error: ${error.message}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 32px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.3px',
                    opacity: isLoading ? 0.7 : 1,
                    position: 'relative',
                    overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.4)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.3)';
                    }
                }}
            >
                {isLoading ? (
                    <>
                        <div style={{
                            width: '18px',
                            height: '18px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <span>Analyzing...</span>
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        <span>Analyze Pipeline</span>
                    </>
                )}

                {!isLoading && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        animation: 'shimmer 3s infinite',
                        pointerEvents: 'none'
                    }} />
                )}
            </button>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

