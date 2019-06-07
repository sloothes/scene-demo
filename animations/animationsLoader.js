//  animationsLoader.js

    var debugMode;

    var Animations       = {}; // object.
    var MaleAnimations   = {}; // object.
    var FemaleAnimations = {}; // object.
    
    var animationsFolder = "./animations/";

    function $getAnimation( options ){

    //  version: 1.1
        var url = options.url;
        var key = options.key;
        var name = options.name;
        var object = options.obj;

    //  return $.getJSON( url, function( json ){
        w3.getHttpObject(url, function( json ){

            object[ name ] = json;

            if ( !!localPlayer && !!localPlayer.outfit ) {
                localPlayer.outfit.AnimationsHandler.refresh();
            }

        });

    }

//  Skeleton.
    var idleUrl = animationsFolder + "basic_idle_animation_3sec.js";
    var walkUrl = animationsFolder + "basic_walkcycle_animation_1sec_v1.js";
    var runUrl  = animationsFolder + "basic_running_animation_1sec_v4.js";
    var jumpUrl = animationsFolder + "basic_jumping_animation_1.5sec.js";

    $getAnimation({
        url:idleUrl, 
        key:"idle", 
        name:"idle", 
        obj:Animations
    });

    $getAnimation({
        url:walkUrl, 
        key:"walk", 
        name:"walk", 
        obj:Animations
    });

    $getAnimation({
        url:runUrl, 
        key:"run", 
        name:"run", 
        obj:Animations
    });

    $getAnimation({
        url:jumpUrl, 
        key:"jump", 
        name:"jump", 
        obj:Animations
    });

//  Male.
    var hmIdleUrl = animationsFolder + "male_idle_animation_3sec.js";
    var hmWalkUrl = animationsFolder + "male_walkcycle_animation_1sec_v1.js";
    var hmRunUrl  = animationsFolder + "male_running_animation_1sec_v6.js";
    var hmJumpUrl = animationsFolder + "male_jumping_animation_2sec_v5.js";

    $getAnimation({
        url:hmIdleUrl, 
        key:"aw3d.animation.male.idle", 
        name:"idle", 
        obj:MaleAnimations
    });

    $getAnimation({
        url:hmWalkUrl, 
        key:"aw3d.animation.male.walk", 
        name:"walk", 
        obj:MaleAnimations
    });

    $getAnimation({
        url:hmRunUrl, 
        key:"aw3d.animation.male.run", 
        name:"run", 
        obj:MaleAnimations
    });

    $getAnimation({
        url:hmJumpUrl, 
        key:"aw3d.animation.male.jump", 
        name:"jump", 
        obj:MaleAnimations
    });

//  Female.
    var hfIdleUrl = animationsFolder + "female_idle_animation_3sec_v2.js";
    var hfWalkUrl = animationsFolder + "female_walkcycle_animation_1sec_v4.js";
    var hfRunUrl  = animationsFolder + "female_running_animation_1sec_v6.js";
    var hfJumpUrl = animationsFolder + "female_jumping_animation_2sec_v8.js";

    $getAnimation({
        url:hfIdleUrl, 
        key:"aw3d.animation.female.idle", 
        name:"idle", 
        obj:FemaleAnimations
    });

    $getAnimation({
        url:hfWalkUrl, 
        key:"aw3d.animation.female.walk", 
        name:"walk", 
        obj:FemaleAnimations
    });

    $getAnimation({
        url:hfRunUrl, 
        key:"aw3d.animation.female.run", 
        name:"run", 
        obj:FemaleAnimations
    });

    $getAnimation({
        url:hfJumpUrl, 
        key:"aw3d.animation.female.jump", 
        name:"jump", 
        obj:FemaleAnimations
    });
