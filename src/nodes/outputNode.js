import React from 'react';
import BaseNode from './baseNode';

export const OutputNode = ({ id, data = {} }) => {
  const fields = [
    { key: 'outputName', type: 'text', label: 'Name', default: id.replace('customOutput-', 'output_') },
    { key: 'outputType', type: 'select', label: 'Type', options: ['Text', 'Image'], default: data.outputType || 'Text' },
  ];

  const handles = [
    { id: 'value', type: 'target', position: 'left', top: '50%' }
  ];

  return <BaseNode id={id} data={data} title="Output" fields={fields} handles={handles} nodeType="customOutput" />;
};
