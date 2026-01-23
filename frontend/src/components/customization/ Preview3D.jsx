import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Preview3D.css';

const Preview3D = ({ 
  product, 
  customization = {}, 
  isRotating = false,
  onLoadComplete 
}) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [controls, setControls] = useState(null);
  const [productMesh, setProductMesh] = useState(null);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'front', 'side', 'top'

  // Default product if none provided
  const defaultProduct = {
    id: 1,
    name: 'Handwoven Saree',
    type: 'saree', // saree, pottery, jewelry, etc.
    dimensions: { width: 5.5, height: 1.1, depth: 0.02 }
  };

  // Default customization
  const defaultCustomization = {
    color: '#8B4513',
    pattern: 'traditional',
    material: 'silk',
    embroidery: 'zari'
  };

  const currentProduct = product || defaultProduct;
  const currentCustomization = { ...defaultCustomization, ...customization };

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0xf0f0f0);
    
    // Camera
    const newCamera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    newCamera.position.z = 5;
    newCamera.position.y = 2;
    
    // Renderer
    const newRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(newRenderer.domElement);
    
    // Controls
    const newControls = new OrbitControls(newCamera, newRenderer.domElement);
    newControls.enableDamping = true;
    newControls.dampingFactor = 0.05;
    newControls.rotateSpeed = 0.5;
    newControls.maxPolarAngle = Math.PI;
    newControls.minPolarAngle = 0;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    newScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    newScene.add(directionalLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-5, -5, -5);
    newScene.add(backLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x000000);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    newScene.add(gridHelper);
    
    // Axes helper
    const axesHelper = new THREE.AxesHelper(5);
    newScene.add(axesHelper);
    
    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
    setControls(newControls);
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !newCamera || !newRenderer) return;
      
      newCamera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && newRenderer.domElement) {
        mountRef.current.removeChild(newRenderer.domElement);
      }
      newRenderer.dispose();
    };
  }, []);

  // Create product mesh based on product type
  useEffect(() => {
    if (!scene) return;

    // Remove existing product mesh
    if (productMesh) {
      scene.remove(productMesh);
      setProductMesh(null);
    }

    let newMesh;
    
    switch (currentProduct.type) {
      case 'saree':
        newMesh = createSareeMesh(currentCustomization);
        break;
      case 'pottery':
        newMesh = createPotteryMesh(currentCustomization);
        break;
      case 'jewelry':
        newMesh = createJewelryMesh(currentCustomization);
        break;
      case 'woodwork':
        newMesh = createWoodworkMesh(currentCustomization);
        break;
      default:
        newMesh = createSareeMesh(currentCustomization);
    }

    scene.add(newMesh);
    setProductMesh(newMesh);

    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [scene, currentProduct.type, currentCustomization]);

  // Animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer) return;

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Auto rotation
      if (productMesh && rotationSpeed !== 0) {
        productMesh.rotation.y += rotationSpeed;
      }
      
      if (controls) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene, camera, renderer, controls, productMesh, rotationSpeed]);

  // Create saree mesh
  const createSareeMesh = (customization) => {
    const group = new THREE.Group();
    
    // Base saree (curved plane)
    const sareeGeometry = new THREE.PlaneGeometry(5, 1, 32, 32);
    
    // Create curved effect
    const positions = sareeGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const y = Math.sin(x * 0.8) * 0.3 + Math.cos(z * 2) * 0.1;
      positions.setY(i, y);
    }
    sareeGeometry.computeVertexNormals();
    
    // Create texture based on customization
    const texture = createFabricTexture(customization);
    
    const sareeMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(customization.color || '#8B4513'),
      map: texture,
      shininess: 30,
      specular: new THREE.Color(0x222222)
    });
    
    const sareeMesh = new THREE.Mesh(sareeGeometry, sareeMaterial);
    sareeMesh.rotation.x = -Math.PI / 2;
    group.add(sareeMesh);
    
    // Pallu (end piece)
    const palluGeometry = new THREE.PlaneGeometry(1.5, 0.8, 16, 16);
    const palluMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(customization.color || '#8B4513'),
      map: createPatternTexture(customization.pattern || 'traditional'),
      shininess: 50,
      specular: new THREE.Color(0x444444)
    });
    
    const palluMesh = new THREE.Mesh(palluGeometry, palluMaterial);
    palluMesh.position.set(0, 0.1, 2.5);
    palluMesh.rotation.x = -Math.PI / 2;
    group.add(palluMesh);
    
    // Border (zari work)
    if (customization.embroidery) {
      const borderGeometry = new THREE.TorusKnotGeometry(0.05, 0.01, 64, 8, 2, 3);
      const borderMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#FFD700'),
        emissive: new THREE.Color('#FFA500'),
        emissiveIntensity: 0.2,
        shininess: 100
      });
      
      const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
      borderMesh.position.set(0, 0.15, 0);
      borderMesh.scale.set(10, 1, 1);
      group.add(borderMesh);
    }
    
    return group;
  };

  // Create pottery mesh
  const createPotteryMesh = (customization) => {
    const group = new THREE.Group();
    
    // Vase shape using lathe geometry
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new THREE.Vector2(
        Math.sin(i * 0.2) * 0.5 + 0.5,
        (i - 5) * 0.2
      ));
    }
    
    const potteryGeometry = new THREE.LatheGeometry(points, 32);
    const potteryMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(customization.color || '#A0522D'),
      shininess: 80,
      specular: new THREE.Color(0x333333)
    });
    
    const potteryMesh = new THREE.Mesh(potteryGeometry, potteryMaterial);
    group.add(potteryMesh);
    
    // Add patterns if specified
    if (customization.pattern) {
      const patternGeometry = new THREE.TorusGeometry(0.6, 0.05, 16, 100);
      const patternMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#D2691E'),
        shininess: 100
      });
      
      for (let i = 0; i < 3; i++) {
        const patternMesh = new THREE.Mesh(patternGeometry, patternMaterial);
        patternMesh.position.y = i * 0.8 - 1;
        group.add(patternMesh);
      }
    }
    
    return group;
  };

  // Create jewelry mesh
  const createJewelryMesh = (customization) => {
    const group = new THREE.Group();
    
    // Necklace base
    const necklaceGeometry = new THREE.TorusGeometry(1, 0.05, 16, 100);
    const necklaceMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(customization.color || '#C0C0C0'),
      shininess: 100,
      specular: new THREE.Color(0x666666)
    });
    
    const necklaceMesh = new THREE.Mesh(necklaceGeometry, necklaceMaterial);
    group.add(necklaceMesh);
    
    // Pendant
    const pendantGeometry = new THREE.OctahedronGeometry(0.3, 0);
    const pendantMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#FFD700'),
      emissive: new THREE.Color('#FFA500'),
      emissiveIntensity: 0.3,
      shininess: 120
    });
    
    const pendantMesh = new THREE.Mesh(pendantGeometry, pendantMaterial);
    pendantMesh.position.y = -1;
    group.add(pendantMesh);
    
    // Gems/Stones
    if (customization.embroidery === 'kundan') {
      const gemGeometry = new THREE.DodecahedronGeometry(0.1, 0);
      const gemMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#FF0000'),
        emissive: new THREE.Color('#660000'),
        emissiveIntensity: 0.2,
        shininess: 150
      });
      
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const gemMesh = new THREE.Mesh(gemGeometry, gemMaterial);
        gemMesh.position.set(Math.cos(angle) * 1.1, Math.sin(angle) * 0.3, 0);
        group.add(gemMesh);
      }
    }
    
    return group;
  };

  // Create woodwork mesh
  const createWoodworkMesh = (customization) => {
    const group = new THREE.Group();
    
    // Box base
    const boxGeometry = new THREE.BoxGeometry(2, 1, 1);
    
    // Create wood texture
    const woodTexture = createWoodTexture(customization);
    
    const boxMaterial = new THREE.MeshPhongMaterial({
      map: woodTexture,
      shininess: 40,
      specular: new THREE.Color(0x111111)
    });
    
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    group.add(boxMesh);
    
    // Carving details
    if (customization.pattern) {
      const carvingGeometry = new THREE.TorusKnotGeometry(0.3, 0.05, 64, 8);
      const carvingMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#5D4037'),
        shininess: 60
      });
      
      const carvingMesh = new THREE.Mesh(carvingGeometry, carvingMaterial);
      carvingMesh.position.set(0, 0.5, 0.5);
      carvingMesh.scale.set(0.5, 0.5, 0.5);
      group.add(carvingMesh);
    }
    
    return group;
  };

  // Create fabric texture
  const createFabricTexture = (customization) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base color
    ctx.fillStyle = customization.color || '#8B4513';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Fabric weave pattern
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    
    return texture;
  };

  // Create pattern texture
  const createPatternTexture = (patternType) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    switch (patternType) {
      case 'traditional':
        // Traditional paisley pattern
        ctx.fillStyle = '#FFD700';
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            drawPaisley(ctx, i * 64 + 32, j * 64 + 32, 20);
          }
        }
        break;
      case 'modern':
        // Modern geometric pattern
        ctx.fillStyle = '#3498db';
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
              ctx.fillRect(i * 32, j * 32, 16, 16);
            }
          }
        }
        break;
      case 'floral':
        // Floral pattern
        ctx.fillStyle = '#e74c3c';
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            drawFlower(ctx, i * 64 + 32, j * 64 + 32, 15);
          }
        }
        break;
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    
    return texture;
  };

  // Create wood texture
  const createWoodTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Wood grain
    const woodColors = ['#8B4513', '#A0522D', '#D2691E'];
    
    for (let i = 0; i < canvas.width; i++) {
      const colorIndex = Math.floor(Math.random() * woodColors.length);
      ctx.fillStyle = woodColors[colorIndex];
      ctx.fillRect(i, 0, 1, canvas.height);
      
      // Add grain lines
      if (i % 50 === 0) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + Math.random() * 30 - 15, canvas.height);
        ctx.stroke();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Helper function to draw paisley
  const drawPaisley = (ctx, x, y, size) => {
    ctx.save();
    ctx.translate(x, y);
    
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size, -size, size, size, 0, size);
    ctx.bezierCurveTo(-size, size, -size, -size, 0, -size);
    ctx.closePath();
    ctx.fill();
    
    // Inner detail
    ctx.fillStyle = '#B8860B';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  // Helper function to draw flower
  const drawFlower = (ctx, x, y, size) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Petals
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(size * 0.8, 0, size * 0.6, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    
    // Center
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  // Handle view change
  const handleViewChange = (mode) => {
    setViewMode(mode);
    
    if (!camera || !productMesh) return;
    
    switch (mode) {
      case 'front':
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        break;
      case 'side':
        camera.position.set(5, 0, 0);
        camera.lookAt(0, 0, 0);
        break;
      case 'top':
        camera.position.set(0, 5, 0);
        camera.lookAt(0, 0, 0);
        break;
      case '3d':
      default:
        camera.position.set(5, 2, 5);
        camera.lookAt(0, 0, 0);
        break;
    }
    
    if (controls) {
      controls.update();
    }
  };

  // Handle zoom
  const handleZoom = (direction) => {
    const newZoom = direction === 'in' ? zoomLevel * 0.8 : zoomLevel * 1.2;
    setZoomLevel(Math.max(0.5, Math.min(3, newZoom)));
    
    if (camera) {
      camera.zoom = newZoom;
      camera.updateProjectionMatrix();
    }
  };

  // Toggle auto rotation
  const toggleRotation = () => {
    setRotationSpeed(rotationSpeed === 0 ? 0.005 : 0);
  };

  // Reset view
  const resetView = () => {
    setViewMode('3d');
    setZoomLevel(1);
    setRotationSpeed(0);
    
    if (camera && controls) {
      camera.position.set(5, 2, 5);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      controls.reset();
    }
  };

  // Take screenshot
  const takeScreenshot = () => {
    if (!renderer) return;
    
    const dataUrl = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `design-preview-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="preview-3d">
      {/* Controls */}
      <div className="preview-controls">
        <div className="control-group">
          <button 
            className={`control-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => handleViewChange('3d')}
            title="3D View"
          >
            <i className="fas fa-cube"></i>
          </button>
          <button 
            className={`control-btn ${viewMode === 'front' ? 'active' : ''}`}
            onClick={() => handleViewChange('front')}
            title="Front View"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            className={`control-btn ${viewMode === 'side' ? 'active' : ''}`}
            onClick={() => handleViewChange('side')}
            title="Side View"
          >
            <i className="fas fa-arrows-alt-h"></i>
          </button>
          <button 
            className={`control-btn ${viewMode === 'top' ? 'active' : ''}`}
            onClick={() => handleViewChange('top')}
            title="Top View"
          >
            <i className="fas fa-arrows-alt-v"></i>
          </button>
        </div>
        
        <div className="control-group">
          <button 
            className="control-btn"
            onClick={() => handleZoom('in')}
            title="Zoom In"
          >
            <i className="fas fa-search-plus"></i>
          </button>
          <button 
            className="control-btn"
            onClick={() => handleZoom('out')}
            title="Zoom Out"
          >
            <i className="fas fa-search-minus"></i>
          </button>
        </div>
        
        <div className="control-group">
          <button 
            className={`control-btn ${rotationSpeed !== 0 ? 'active' : ''}`}
            onClick={toggleRotation}
            title="Auto Rotate"
          >
            <i className="fas fa-sync-alt"></i>
          </button>
          <button 
            className="control-btn"
            onClick={resetView}
            title="Reset View"
          >
            <i className="fas fa-redo"></i>
          </button>
          <button 
            className="control-btn"
            onClick={takeScreenshot}
            title="Take Screenshot"
          >
            <i className="fas fa-camera"></i>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="preview-canvas" ref={mountRef}>
        <div className="loading-overlay">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading 3D Preview...</span>
        </div>
      </div>

      {/* Customization Info */}
      <div className="preview-info">
        <h4>3D Preview</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Product:</span>
            <span className="info-value">{currentProduct.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Color:</span>
            <span className="info-value">
              <div 
                className="color-preview" 
                style={{ backgroundColor: currentCustomization.color }}
              />
              {currentCustomization.color}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Pattern:</span>
            <span className="info-value">{currentCustomization.pattern}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Material:</span>
            <span className="info-value">{currentCustomization.material}</span>
          </div>
        </div>
        
        <div className="instructions">
          <p>
            <i className="fas fa-mouse-pointer"></i>
            Click and drag to rotate
          </p>
          <p>
            <i className="fas fa-arrows-alt"></i>
            Scroll to zoom
          </p>
          <p>
            <i className="fas fa-undo"></i>
            Right-click and drag to pan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview3D;