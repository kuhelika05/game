import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
socket.on('playerDisconnected', (id) => {
    scene.remove(otherPlayers[id]);
    delete otherPlayers[id];
});

function addOtherPlayer(data) {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(data.x, data.y, data.z);

    scene.add(mesh);

    otherPlayers[data.id] = mesh;
}

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function movePlayer() {
    const speed = 0.1;

    if (keys['w']) player.position.z -= speed;
    if (keys['s']) player.position.z += speed;
    if (keys['a']) player.position.x -= speed;
    if (keys['d']) player.position.x += speed;

    socket.emit('playerMovement', {
        x: player.position.x,
        y: player.position.y,
        z: player.position.z
    });
}

function animate() {
    requestAnimationFrame(animate);

    movePlayer();

    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 5;

    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

animate();
