//  jquery-update-engine.js

var bodySelector = "body";
var updatesSelector = "#updates";
$("body").append('<div class="hidden" id="updates"></div>');

$(updatesSelector).append('<input type="hidden" id="localPlayerOutfit">');
$(updatesSelector).append('<input type="hidden" id="world">');
$(updatesSelector).append('<input type="hidden" id="cameraControls">');
$(updatesSelector).append('<input type="hidden" id="keyInputControls">');
$(updatesSelector).append('<input type="hidden" id="joystick1Contols">');
$(updatesSelector).append('<input type="hidden" id="joystick2Contols">');
$(updatesSelector).append('<input type="hidden" id="AnimationPanelControls">');
$(updatesSelector).append('<input type="hidden" id="ThreeAnimationHandler">');

var localPlayerOutfitSelector = "#localPlayerOutfit";
var worldSelector = "#world";
var cameraControlsSelector = "#cameraControls";
var keyInputControlsSelector = "#keyInputControls";
var joystick1ContolsSelector  = "#joystick1Contols";
var joystick2ContolsSelector = "#joystick2Contols";
var AnimationPanelControlsSelector = "#AnimationPanelControls";
var ThreeAnimationHandlerSelector = "#ThreeAnimationHandler";

var $outfitUpdater = $(localPlayerOutfitSelector).get(0);
var $worldUpdater = $(worldSelector).get(0);
var $cameraUpdater = $(cameraControlsSelector).get(0);
var $keyInputUpdater = $(keyInputControlsSelector).get(0);
var $controlsJoystickUpdater = $(joystick1ContolsSelector).get(0);
var $cameraJoystickUpdater = $(joystick2ContolsSelector).get(0);
var $actionsPanelUpdater = $(AnimationPanelControlsSelector).get(0);
var $animationHandlerUpdater = $(ThreeAnimationHandlerSelector).get(0);

$outfitUpdater.update = function(delta){ localPlayer.outfit.update(); };
$worldUpdater.update = function(delta){ world.step( delta ); };
$cameraUpdater.update = function(delta){ cameraControls.update(); };
$keyInputUpdater.update = function(delta){ keyInputControls.update(); };
$controlsJoystickUpdater.update = function(delta){ joystick1.update(); };
$cameraJoystickUpdater.update = function(delta){ joystick2.update(); };
$actionsPanelUpdater.update = function(delta){ AnimationPanelControls.update(); };
$animationHandlerUpdater.update = function(delta){ THREE.AnimationHandler.update( delta ); };

$(worldSelector).addClass("update");
$(cameraControlsSelector).addClass("update");
$(keyInputControlsSelector).addClass("update");
$(joystick1ContolsSelector).addClass("update");
$(joystick2ContolsSelector).addClass("update");
$(localPlayerOutfitSelector).addClass("update");
$(ThreeAnimationHandlerSelector).addClass("update");

keyInputControls.On();
