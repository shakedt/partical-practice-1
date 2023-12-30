import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/10.png')

// particales
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
 
const count = 50000;

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for ( let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)


// Points
 const particalesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color('#ff88cc'),
    alphaMap: particleTexture,
    transparent: true,
    // alphaTest: 0.001,
    // depthTest: true
    // depthTest:false,
    depthWrite: false,
});


 const particales = new THREE.Points(particlesGeometry, particalesMaterial)

 scene.add(particales)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // particales.position.x = elapsedTime
    // particales.position.y = elapsedTime
    // particales.position.z = elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    w