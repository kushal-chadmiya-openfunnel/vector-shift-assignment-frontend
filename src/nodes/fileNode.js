import React from 'react';
import BaseNode from './baseNode';

export const FileNode = ({ id, data = {} }) => {
    const fields = [
        { key: 'fileName', type: 'text', label: 'Filename', default: data.fileName || 'file.txt' },
        { key: 'accept', type: 'text', label: 'Accept (mime)', default: data.accept || '*' }
    ];
    const handles = [{ id: 'file', type: 'source', position: 'right' }];

    const renderBody = (state) => (
        <div>
            <div style={{ marginBottom: 6 }}>Filename: <strong>{state.fileName}</strong></div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Accept: {state.accept}</div>
        </div>
    );

    return <BaseNode id={id} data={data} title="File" fields={fields} handles={handles} renderBody={renderBody} nodeType="file" />;
};
