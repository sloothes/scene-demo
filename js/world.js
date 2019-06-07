//  world.js

//  MESHWALK WORLD.
    var world = new MW.World();

//  OCTREE.
    var partition = 1;
    var min = new THREE.Vector3( -1000, -1000, -1000 );
    var max = new THREE.Vector3(  1000,  1000,  1000 );
    var octree = new MW.Octree( min, max, partition );
    world.add( octree );

//  GROUND.
    var ground = new THREE.Mesh(
        new THREE.PlaneGeometry( 2500, 2500, 1, 1 ),
        new THREE.MeshPhongMaterial({ 
            color:0x829ec4,
            transparent:false,
            opacity:1, 
            shininess: 80,
            wireframe:false,
        })
    );

    ground.rotation.x = THREE.Math.degToRad( -90 ); // -Math.PI/2

    scene.add( ground );
//  ground.visible = false;
//  ground.receiveShadow = true;
    octree.importThreeMesh( ground );
