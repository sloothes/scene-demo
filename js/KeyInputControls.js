//  KeyInputControls.js

var keyInputControls = new MW.KeyInputControl();

keyInputControls.On = function(){
    if ( !keyInputControls.isOff ) return;
    $(keyInputControls).on( "movekeyon", onMoveKeyOn );
    $(keyInputControls).on( "movekeyoff", onMoveKeyOff );
    $(keyInputControls).on( "jumpkeypress", onJumpInput );
    $(keyInputControls).on( "movekeychange", onMoveKeyChange );
    keyInputControls.isOff = false;
    debugMode && console.log( "keyInputControls are ON." );
};

keyInputControls.Off = function(){
    if ( keyInputControls.isOff ) return;
    $(keyInputControls).off( "movekeyon", onMoveKeyOn );
    $(keyInputControls).off( "movekeyoff", onMoveKeyOff );
    $(keyInputControls).off( "jumpkeypress", onJumpInput );
    $(keyInputControls).off( "movekeychange", onMoveKeyChange );
    keyInputControls.isOff = true;
    debugMode && console.log( "keyInputControls are OFF." );
};

keyInputControls.update = function(){

    if ( keyInputControls.isOff ) return;

    if ( keyInputControls.isMoveKeyHolded 
      || localPlayer.controller.isJumping 
      || !localPlayer.controller.isGrounded 
      || localPlayer.controller.isOnSlope ){

        this.dispatchEvent({type:"update"});
    }
};

keyInputControls.Off(); 
keyInputControls.inRun = true;

function onMoveKeyOn() { 
    debugMode && console.log("move key on");

    if ( !!AnimationPanelControls ) {
        AnimationPanelControls.isActive = false;
    }

    if (  localPlayer.controller.isJumping 
      || !localPlayer.controller.isGrounded 
      ||  localPlayer.controller.isOnSlope ) {
        return;
    }

    localPlayer.controller.direction = (2 * Math.PI) - cameraControls.getFrontAngle() + this.frontAngle;

    localPlayer.outfit.AnimationsHandler.stop();
    localPlayer.controller.isRunning = true; 
    localPlayer.controller.isWalking = true;
    localPlayer.controller.movementSpeed = 28;
    localPlayer.outfit.AnimationsHandler.play("walk");

}

function onMoveKeyChange() {
    debugMode && console.log("move key changed");
    localPlayer.controller.direction = (2 * Math.PI) - cameraControls.getFrontAngle() + this.frontAngle;
}

function onMoveKeyOff() {
    debugMode && console.log("move key off");

    if (  localPlayer.controller.isJumping 
      || !localPlayer.controller.isGrounded 
      ||  localPlayer.controller.isOnSlope ) {
        return;
    }

    var finalDirection = (2 * Math.PI) - cameraControls.getFrontAngle() + this.frontAngle;

    localPlayer.controller.direction = finalDirection;
    localPlayer.outfit.AnimationsHandler.stop();
    localPlayer.controller.isRunning = false;
    localPlayer.controller.isWalking = false;
    localPlayer.controller.isIdling  = true;
    localPlayer.controller.movementSpeed = 0;
    localPlayer.outfit.AnimationsHandler.play("idle");
    localPlayer.controller.dispatchEvent({type:"startIdling"});

}

function onJumpInput() {
    debugMode && console.log("jump key on");

    if (  localPlayer.controller.isJumping 
      || !localPlayer.controller.isGrounded 
      ||  localPlayer.controller.isOnSlope ) {
        return;
    }

    localPlayer.controller.jump();
    localPlayer.outfit.AnimationsHandler.jump();

}

