// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const container = document.getElementById('obj');
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(0x000000, 0); // Set background color to transparent

// Append the renderer to the div
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-5, -5, -5);
scene.add(pointLight);

// Load the GLTF model
const loader = new THREE.GLTFLoader();
loader.load('obj/astronauta/scene.gltf', function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    
    // Optional: scale and position the model
    model.scale.set(2, 2, 2); // Adjust the scale if necessary
    model.position.set(0, 0, 0); // Center the model
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the model for some basic animation
        model.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
}, undefined, function(error) {
    console.error(error);
});

// Position the camera
camera.position.z = 5;

// Add OrbitControls for interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});