import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import ProgressIndicator from './ProgressIndicator';

// Simplified indicator for map nodes
const NodeStatusIndicator = ({ status }) => {
  if (status === 'completed') {
    return <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#4CAF50" />; // Green check circle
  } else if (status === 'in-progress') {
    return <circle cx="0" cy="0" r="4" fill="#FFC107" />; // Yellow dot
  }
  return null; // Locked or not started
};

const VisualNavMap = ({ mapData }) => {
  const navigate = useNavigate();
  const { userProgress } = useUserProgress();
  const svgRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef({ x: 0, y: 0 });
  const transformOrigin = useRef({ x: 0, y: 0 });
  
  // Handle zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(transform.scale * scaleFactor, 0.5), 3);
    
    // Zoom toward cursor position
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate new position to zoom toward mouse
    const newX = transform.x - (mouseX - transform.x) * (scaleFactor - 1);
    const newY = transform.y - (mouseY - transform.y) * (scaleFactor - 1);
    
    setTransform({ x: newX, y: newY, scale: newScale });
  };
  
  // Handle drag start
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    setIsDragging(true);
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    transformOrigin.current = { x: transform.x, y: transform.y };
    e.preventDefault();
  };
  
  // Handle drag move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragOrigin.current.x;
    const dy = e.clientY - dragOrigin.current.y;
    
    setTransform({
      ...transform,
      x: transformOrigin.current.x + dx,
      y: transformOrigin.current.y + dy
    });
  };
  
  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add event listeners
  useEffect(() => {
    const svg = svgRef.current;
    
    svg.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      svg.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, transform]);
  
  // Center the map initially
  useEffect(() => {
    if (!svgRef.current || !mapData?.nodes?.length) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setTransform({ x: centerX, y: centerY, scale: 0.8 });
  }, [mapData]);
  
  const handleNodeClick = (nodeId) => {
    navigate(`/scene/${nodeId}`);
  };
  
  // If no map data, display loading
  if (!mapData || !mapData.nodes || !mapData.links) {
    return <div className="flex items-center justify-center h-screen">Loading galaxy map...</div>;
  }
  
  return (
    <div className="w-full h-full overflow-hidden touch-none">
      <svg
        ref={svgRef}
        className="w-full h-full bg-gradient-to-b from-gray-900 to-indigo-900 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <g
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
          }}
        >
          {/* Background clusters */}
          {mapData.clusters?.map((cluster) => {
            // Calculate convex hull or simple bounding area for the cluster nodes
            const clusterNodes = cluster.nodes.map(nodeId => 
              mapData.nodes.find(node => node.id === nodeId)
            ).filter(Boolean);
            
            if (clusterNodes.length < 3) return null;
            
            // Simple approach: just create a circle encompassing all nodes
            const centerX = clusterNodes.reduce((sum, node) => sum + node.x, 0) / clusterNodes.length;
            const centerY = clusterNodes.reduce((sum, node) => sum + node.y, 0) / clusterNodes.length;
            
            // Find radius that encompasses all nodes plus some padding
            const radius = Math.max(
              ...clusterNodes.map(node => 
                Math.sqrt(Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2))
              )
            ) + 100;
            
            return (
              <motion.circle
                key={cluster.id}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill={cluster.color}
                fillOpacity={0.15}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            );
          })}
          
          {/* Edges/Links */}
          {mapData.links.map((link, i) => {
            const source = mapData.nodes.find(node => node.id === link.source);
            const target = mapData.nodes.find(node => node.id === link.target);
            
            if (!source || !target) return null;
            
            return (
              <motion.line
                key={`link-${i}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={link.type === 'implements' ? '#64B5F6' : 
                       link.type === 'uses' ? '#81C784' : 
                       link.type === 'related' ? '#FFB74D' : '#E0E0E0'}
                strokeWidth={link.width || 1}
                strokeOpacity={0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: i * 0.01 }}
              />
            );
          })}
          
          {/* Nodes */}
          {mapData.nodes.map((node, i) => {
            // Determine node status from userProgress
            let status = 'locked';
            if (userProgress.completedScenes.includes(node.id)) {
              status = 'completed';
            } else if (userProgress.inProgressScenes.includes(node.id)) {
              status = 'in-progress';
            }
            // Optional: Implement unlocking logic visualization here if needed
            // For now, just showing completed/in-progress

            return (
              <g key={node.id} onClick={() => handleNodeClick(node.id)} className="cursor-pointer" role="button" tabIndex="0" aria-label={`Navigate to ${node.label} scene`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius || 40}
                  fill={node.color || '#4A90E2'} // Default color
                  fillOpacity={status === 'locked' ? 0.4 : 0.8} // Dim locked nodes
                  stroke={status === 'completed' ? '#4CAF50' : status === 'in-progress' ? '#FFC107' : '#fff'} // Highlight border based on status
                  strokeWidth={status === 'locked' ? 1 : 3}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5 + i * 0.05
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    fillOpacity: 1,
                    transition: { duration: 0.2 } 
                  }}
                  className="cursor-pointer"
                />
                
                {/* Add Status Indicator Icon */}
                <g transform={`translate(${node.x + (node.radius || 40) * 0.6}, ${node.y - (node.radius || 40) * 0.6}) scale(1.5)`}>
                   <NodeStatusIndicator status={status} />
                </g>

                <motion.text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontWeight="bold"
                  fontSize={node.radius / 3 + 5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                  className="pointer-events-none"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}
          
          {/* Legend */}
          <g transform="translate(20, 20)" className="text-sm">
            <rect x="0" y="0" width="180" height="120" fill="rgba(0,0,0,0.6)" rx="5" />
            
            <text x="10" y="20" fill="white" fontSize="12">Data Structures</text>
            <circle cx="20" cy="40" r="6" fill="#4285F4" />
            <text x="35" y="44" fill="white" fontSize="12">Arrays</text>
            
            <circle cx="20" cy="60" r="6" fill="#34A853" />
            <text x="35" y="64" fill="white" fontSize="12">Linked Lists</text>
            
            <text x="10" y="84" fill="white" fontSize="12">Algorithms</text>
            <circle cx="20" cy="104" r="6" fill="#3498DB" />
            <text x="35" y="108" fill="white" fontSize="12">Sorting</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default VisualNavMap; 