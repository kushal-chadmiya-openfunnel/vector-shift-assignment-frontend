import React from 'react';
import BaseNode from './baseNode';

export const TimestampNode = ({ id, data = {} }) => {
    const fields = [
        { key: 'label', type: 'text', label: 'Label', default: data.label || 'now' }
    ];
    const handles = [{ id: 'ts', type: 'source', position: 'right' }];

    const renderBody = (state) => {
        const now = new Date().toISOString();
        return (
            <div>
                <div style={{ marginBottom: 6 }}>Emits current ISO timestamp when executed</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{now}</div>
            </div>
        );
    };

    return <BaseNode id={id} data={data} title="Timestamp" fields={fields} handles={handles} renderBody={renderBody} nodeType="timestamp" />;
};
