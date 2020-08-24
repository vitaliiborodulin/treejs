window.onload = function(){
    var width, height, canvas, renderer, scene, camera, light;
    var cubeSettings, gui;
    var cube_geometry, cube_texture, cube_material, cube;

    init();
    gui();
    animation();

    function init(){
        width = window.innerWidth;
        height = window.innerHeight;
        canvas = document.getElementById('canvas');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        renderer = new THREE.WebGLRenderer({canvas: canvas});
        renderer.setClearColor(0xffffff);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.set(0, 0, 1000);

        light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        cube_geometry = new THREE.CubeGeometry(300, 300, 300);
        cube_texture = new THREE.Texture();
        cube_texture = new THREE.TextureLoader().load( "../img/wood-box.png" );

        // cube_material = new THREE.MeshNormalMaterial();
        cube_material = new THREE.MeshBasicMaterial({map: cube_texture, overdraw: true});
        cube = new THREE.Mesh(cube_geometry, cube_material);
        scene.add(cube);



    }

    function gui(){
        cubeSettings = {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
        }

        gui = new dat.GUI();
        gui.add(cubeSettings, 'rotationX').min(-0.2).max(0.2).step(0.001);
        gui.add(cubeSettings, 'rotationY').min(-0.2).max(0.2).step(0.001);
        gui.add(cubeSettings, 'rotationZ').min(-0.2).max(0.2).step(0.001);

    }

    function animation(){
        cube.rotation.x += cubeSettings.rotationX;
        cube.rotation.y += cubeSettings.rotationY;
        cube.rotation.z += cubeSettings.rotationZ;

        requestAnimationFrame(animation);
        renderer.render(scene, camera);
    }
}

