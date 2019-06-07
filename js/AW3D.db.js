//  AW3D.db.js

    const VERSION = 1;
    const DB_NAME = "AW3D";

    db = new zango.Db( DB_NAME, VERSION, {

        male:     true,
        female:   true,
        skeleton: true,
        gallery:  true,

    });

    db.open(function(err, database){
        if (err) console.error(err);
    }).then( function(){
        debugMode && console.log( 
        `Database ${db.name} (v${db.version}) ready for use.`);
    }).catch(function(err){
        console.error(err);
    });
