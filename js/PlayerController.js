var Player = function(radius){

    this.holder = AW3D.PlayerHolder();
    scene.add( this.holder );

    this.holderHelper = AW3D.PlayerHolderHelper();

    this.sphere = AW3D.PlayerSphere();
    this.sphere.position.y = 12;
    this.holder.add( this.sphere ); 

    var player = this;

    this.outfit = new AW3D.OutfitManager();

    this.outfit.update = function() {

    //  Update avatar rotation y.
        var direction = player.controller.direction - Math.PI;

    //  "this" is the "localPlayer.outfit".
        this.direction.rotation.y = direction;

    //  Update avatar position.
        var x = player.controller.center.x;
        var y = player.controller.center.y - player.controller.radius;
        var z = player.controller.center.z;

    //  "this" is the "localPlayer.outfit".
        this.direction.position.set( x, y, z );
    };

    var radius = radius || 3;
    this.controller = new MW.CharacterController( this.holder, radius );
    this.controller.isWalking = false;

    this.controller.getdata = function( action ){

        var data = {};
        data.playerid = socket.id;
        data.radius = this.radius;
        data.isGrounded = this.isGrounded;
        data.isOnSlope = this.isOnSlope;
        data.isIdling  = this.isIdling;
        data.isJumping = this.isJumping;
        data.isRunning = this.isRunning;
        data.isWalking = this.isWalking;
        data.direction = this.direction;
        data.movementSpeed = this.movementSpeed;
        data.jumpStartTime = this.jumpStartTime;
        data.position = this.center.toArray();
        if (!!action) data.action = action;

        return data;
    };

    function onStartJumping(){
        player.outfit.AnimationsHandler.weightOff("idle", "walk", "run");
    };

    function onEndJumping(){
        player.outfit.AnimationsHandler.weightOn("idle", "walk", "run");

        if ( player.controller.isRunning && player.controller.isWalking ) {

            player.outfit.AnimationsHandler.stop();
            player.controller.movementSpeed = 28;
            player.outfit.AnimationsHandler.play("walk");
            player.controller.dispatchEvent({type:"startRunning"});

        } else if ( player.controller.isRunning && !player.controller.isWalking ) {

            player.outfit.AnimationsHandler.stop();
            player.controller.movementSpeed = 45;
            player.outfit.AnimationsHandler.play("run");
            player.controller.dispatchEvent({type:"startRunning"});

        } else {

            player.outfit.AnimationsHandler.stop();
            player.controller.movementSpeed = 0;
            player.outfit.AnimationsHandler.play("idle");
            player.controller.dispatchEvent({type:"startIdling"});

        }
    }

    this.controller.addEventListener("endJumping",   onEndJumping);
    this.controller.addEventListener("startJumping", onStartJumping);

    world.add( this.controller );
    scene.add(this.outfit.direction);

};

Player.prototype = {

//  Collect position, direction, nickname, and gender.

    getdata: function( socket ){
        if ( !socket ) return;
        var data = {};
        data.playerid  = socket.id;
        data.nickname  = this.nickname;
        data.gender    = this.outfit.getGender();
        data.direction = this.outfit.direction.rotation.y;
        data.position  = this.outfit.direction.position.toArray();
        data.dna       = this.outfit.toDNA();
        debugMode && console.log("player data:", data);
        return data;
    },

//  Remote player set data.

    setdata: function( data ){
        if ( !data.playerid || data.playerid != this.playerid ) return;

        this.playerid = data.playerid;
        this.nickname = data.nickname;
        this.outfit.setGender( data.gender );
        this.outfit.direction.rotation.y = data.direction;
        this.outfit.direction.position.fromArray(data.position);

        if (data.action != undefined) {
            this.outfit.AnimationsHandler.stop();
            this.outfit.AnimationsHandler.play( data.action );
        }
    },

//  Create player outfit from dna data.

    fromDNA: function( dna ){
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        this.controller.direction = frontAngle;
        this.outfit.fromDNA( dna );
        scene.add(this.outfit.direction);
        this.outfit.update();
    },

//  Start remote player action.
    startAction: function( running, walking, idling, speed, name, eventType ){

        this.outfit.AnimationsHandler.stop();        
        this.controller.isRunning = running;
        this.controller.isWalking = walking;
        this.controller.isIdling  = idling;
        this.controller.movementSpeed = speed;
        this.outfit.AnimationsHandler.play( name );
        this.controller.dispatchEvent({type: eventType});

    },

//  Get local player action data.
    getActionData: function ( name ){
        return {
            playerid : socket.id,
            direction: this.outfit.direction.rotation.y,
            position : this.outfit.direction.position.toArray(),
            action   : name,
        };
    },

};

var localPlayer = new Player();
