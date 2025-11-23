// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{
                margin: '0 0 16px 0',
                fontSize: '18px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.5px'
            }}>
                Node Palette
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='file' label='File' />
                <DraggableNode type='httpRequest' label='HTTP Request' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='randomChoice' label='Random Choice' />
                <DraggableNode type='timestamp' label='Timestamp' />
            </div>
        </div>
    );
};
