import React from 'react';
import BaseNode from './baseNode';

export const HTTPRequestNode = ({ id, data = {} }) => {
    const fields = [
        { key: 'method', type: 'select', label: 'Method', options: ['GET', 'POST', 'PUT', 'DELETE'], default: data.method || 'GET' },
        { key: 'url', type: 'text', label: 'URL', default: data.url || 'https://api.example.com' }
    ];
    const handles = [{ id: 'response', type: 'source', position: 'right' }, { id: 'trigger', type: 'target', position: 'left' }];

    const renderBody = (state) => (
        <div>
            <div style={{ marginBottom: 6 }}><small style={{ opacity: 0.7 }}>{state.method} {state.url}</small></div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>This node demonstrates HTTP config. Execution should be handled by the engine.</div>
        </div>
    );

    return <BaseNode id={id} data={data} title="HTTP Request" fields={fields} handles={handles} renderBody={renderBody} nodeType="httpRequest" />;
};
