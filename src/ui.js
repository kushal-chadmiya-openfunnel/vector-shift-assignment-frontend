// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FileNode } from './nodes/fileNode';
import { HTTPRequestNode } from './nodes/httpRequestNode';
import { MathNode } from './nodes/mathNode';
import { RandomChoiceNode } from './nodes/randomChoiceNode';
import { TimestampNode } from './nodes/timestampNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  file: FileNode,
  httpRequest: HTTPRequestNode,
  math: MathNode,
  randomChoice: RandomChoiceNode,
  timestamp: TimestampNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{
        width: '100vw',
        height: '75vh',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(30,41,59,0.5) 100%)',
        borderRadius: '0'
      }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          connectionLineStyle={{
            stroke: '#7C3AED',
            strokeWidth: 2,
          }}
        >
          <Background
            color="rgba(124, 58, 237, 0.2)"
            gap={gridSize}
            style={{ background: 'transparent' }}
          />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const type = node.type || 'customInput';
              const colorMap = {
                customInput: '#10B981',
                llm: '#A855F7',
                customOutput: '#3B82F6',
                text: '#F97316',
                file: '#EC4899',
                httpRequest: '#14B8A6',
                math: '#6366F1',
                randomChoice: '#D946EF',
                timestamp: '#06B6D4'
              };
              return colorMap[type] || '#10B981';
            }}
            maskColor="rgba(15, 23, 42, 0.8)"
          />
        </ReactFlow>
      </div>
    </>
  )
}
