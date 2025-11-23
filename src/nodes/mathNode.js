import React from 'react';
import BaseNode from './baseNode';

export const MathNode = ({ id, data = {} }) => {
    const fields = [
        { key: 'expr', type: 'text', label: 'Expression', default: data.expr || 'a + b' },
        { key: 'a', type: 'text', label: 'a', default: data.a || '1' },
        { key: 'b', type: 'text', label: 'b', default: data.b || '2' }
    ];
    const handles = [{ id: 'out', type: 'source', position: 'right' }, { id: 'in', type: 'target', position: 'left' }];

    const renderBody = (state) => {
        let result = '—';
        try {
            const a = Number(state.a || 0);
            const b = Number(state.b || 0);
            const expr = (state.expr || 'a + b').replace(/\ba\b/g, a).replace(/\bb\b/g, b);
            result = eval(expr);
        } catch (e) {
            result = 'err';
        }
        return (
            <div>
                <div style={{ marginBottom: 6 }}>Expr: <small style={{ opacity: 0.7 }}>{state.expr}</small></div>
                <div>Result: <strong>{String(result)}</strong></div>
            </div>
        );
    };

    return <BaseNode id={id} data={data} title="Math" fields={fields} handles={handles} renderBody={renderBody} nodeType="math" />;
};
