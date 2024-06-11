import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function DesertScene3D() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xfdaf40 );
    const camera = new THREE.PerspectiveCamera( 1, window.innerWidth / window.innerHeight, 1, 500 );
    
    camera.position.z = 200;
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight( 0x99ddff, 0.9 );
    scene.add( light );
    
    const loader = new GLTFLoader();
    let model: any;

    loader.load( 'models/model.gltf', function ( gltf ) {
        model = gltf.scene;

        scene.add( model );
        model.rotation.x = 0.4;
        model.rotation.z = 0;
        }, undefined, function ( error ) {
        console.error( error );
    } );

    const directionalLight = new THREE.DirectionalLight( 0xffee22, 3 );

    scene.add( directionalLight );

    function animate() {
        if (model) model.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

    renderer.setAnimationLoop( animate );

    return null
}