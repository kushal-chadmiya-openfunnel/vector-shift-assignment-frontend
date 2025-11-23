import React from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data = {} }) => {
  const handles = [
    { id: 'system', type: 'target', position: Position.Left, top: '35%', style: { transform: 'translateY(-50%)' } },
    { id: 'prompt', type: 'target', position: Position.Left, top: '65%', style: { transform: 'translateY(-50%)' } },
    { id: 'response', type: 'source', position: Position.Right, top: '50%', style: { transform: 'translateY(-50%)' } }
  ];

  const renderBody = () => (
    <div style={{ opacity: 0.8, fontSize: 12 }}>
      This is a LLM.
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      fields={[]}
      handles={handles}
      renderBody={renderBody}
      nodeType="llm"
    />
  );
};
