// nodeStyles.js
// Centralized styling configuration for all node types

import {
    Cpu,
    FileText,
    Globe,
    Calculator,
    Shuffle,
    Clock,
    Terminal,
    ArrowRight,
    Sparkles
} from 'lucide-react';

// Color schemes for each node type
export const nodeColors = {
    customInput: {
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        shadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
        hoverShadow: '0 12px 32px rgba(16, 185, 129, 0.35)',
        border: 'rgba(16, 185, 129, 0.3)',
        icon: Terminal,
        iconColor: '#10B981'
    },
    llm: {
        gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
        shadow: '0 8px 24px rgba(168, 85, 247, 0.25)',
        hoverShadow: '0 12px 32px rgba(168, 85, 247, 0.35)',
        border: 'rgba(168, 85, 247, 0.3)',
        icon: Sparkles,
        iconColor: '#A855F7'
    },
    customOutput: {
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        shadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
        hoverShadow: '0 12px 32px rgba(59, 130, 246, 0.35)',
        border: 'rgba(59, 130, 246, 0.3)',
        icon: ArrowRight,
        iconColor: '#3B82F6'
    },
    text: {
        gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        shadow: '0 8px 24px rgba(249, 115, 22, 0.25)',
        hoverShadow: '0 12px 32px rgba(249, 115, 22, 0.35)',
        border: 'rgba(249, 115, 22, 0.3)',
        icon: FileText,
        iconColor: '#F97316'
    },
    file: {
        gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        shadow: '0 8px 24px rgba(236, 72, 153, 0.25)',
        hoverShadow: '0 12px 32px rgba(236, 72, 153, 0.35)',
        border: 'rgba(236, 72, 153, 0.3)',
        icon: FileText,
        iconColor: '#EC4899'
    },
    httpRequest: {
        gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        shadow: '0 8px 24px rgba(20, 184, 166, 0.25)',
        hoverShadow: '0 12px 32px rgba(20, 184, 166, 0.35)',
        border: 'rgba(20, 184, 166, 0.3)',
        icon: Globe,
        iconColor: '#14B8A6'
    },
    math: {
        gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        shadow: '0 8px 24px rgba(99, 102, 241, 0.25)',
        hoverShadow: '0 12px 32px rgba(99, 102, 241, 0.35)',
        border: 'rgba(99, 102, 241, 0.3)',
        icon: Calculator,
        iconColor: '#6366F1'
    },
    randomChoice: {
        gradient: 'linear-gradient(135deg, #D946EF 0%, #C026D3 100%)',
        shadow: '0 8px 24px rgba(217, 70, 239, 0.25)',
        hoverShadow: '0 12px 32px rgba(217, 70, 239, 0.35)',
        border: 'rgba(217, 70, 239, 0.3)',
        icon: Shuffle,
        iconColor: '#D946EF'
    },
    timestamp: {
        gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        shadow: '0 8px 24px rgba(6, 182, 212, 0.25)',
        hoverShadow: '0 12px 32px rgba(6, 182, 212, 0.35)',
        border: 'rgba(6, 182, 212, 0.3)',
        icon: Clock,
        iconColor: '#06B6D4'
    }
};

// Get color scheme for a node type
export const getNodeColor = (nodeType) => {
    return nodeColors[nodeType] || nodeColors.customInput;
};

// Draggable node styles
export const draggableNodeColors = {
    customInput: 'linear-gradient(135deg, #10B981, #059669)',
    llm: 'linear-gradient(135deg, #A855F7, #7C3AED)',
    customOutput: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    text: 'linear-gradient(135deg, #F97316, #EA580C)',
    file: 'linear-gradient(135deg, #EC4899, #DB2777)',
    httpRequest: 'linear-gradient(135deg, #14B8A6, #0D9488)',
    math: 'linear-gradient(135deg, #6366F1, #4F46E5)',
    randomChoice: 'linear-gradient(135deg, #D946EF, #C026D3)',
    timestamp: 'linear-gradient(135deg, #06B6D4, #0891B2)'
};

export const getDraggableNodeGradient = (type) => {
    return draggableNodeColors[type] || draggableNodeColors.customInput;
};
