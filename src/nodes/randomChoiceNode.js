import React from 'react';
import BaseNode from './baseNode';

export const RandomChoiceNode = ({ id, data = {} }) => {
    const fields = [
        { key: 'choices', type: 'textarea', label: 'Choices (one per line)', default: data.choices || 'red\nblue\ngreen' }
    ];
    const handles = [{ id: 'choice', type: 'source', position: 'right' }, { id: 'trigger', type: 'target', position: 'left' }];

    const renderBody = (state) => {
        const choices = (state.choices || '').split('\n').map(s => s.trim()).filter(Boolean);
        const selection = choices.length ? choices[Math.floor(Math.random() * choices.length)] : '—';
        return (
            <div>
                <div style={{ marginBottom: 6 }}>Randomly picks one of the choices</div>
                <div><strong>{selection}</strong></div>
            </div>
        );
    };

    return <BaseNode id={id} data={data} title="Random Choice" fields={fields} handles={handles} renderBody={renderBody} nodeType="randomChoice" />;
};
