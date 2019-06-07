//  cameraControl.js

var cameraControls = new MW.TPSCameraControl(camera, localPlayer.holder, {
    el: renderer.domElement,               // html renderer element.
    offset: new THREE.Vector3( 0, 15, 0 ), // camera eye height.
    radius: 40,                            // default: 37 // (distance of the character to the camera).
    minRadius: 6,                          // default: 10 // (can take and negative values, yes!!!).
    maxRadius: 100,                        // default: 64, runtime: 40.
    rigidObjects: [],                      // collition objects for the camera.
});

cameraControls.getforward = function(){ 
    return -this.theta 
};

cameraControls.setVerticalOffset = function(offset){ 
    this.offset.y = offset; 
};

(cameraControls.frontAngleUpdate = function(){
    windowAnimationFrameRequestID = requestAnimationFrame( cameraControls.frontAngleUpdate );
    cameraControls.forward = -cameraControls.theta;
})();
