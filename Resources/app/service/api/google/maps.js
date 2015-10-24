/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.maps = new namespace.maps();
    });




    namespace.maps = function() {
        this.loaded = false;
        var functionName = "map_"+app.utils.getRandomString();
        this._url = "//maps.googleapis.com/maps/api/js?libraries=places&callback="+functionName;
        this.apiDefer =  Q.defer();


        var self = this;
        globals[functionName] = function(){
            self.loaded = true;
            self.apiDefer.resolve(globals.google);
        };

    };


    namespace.maps.prototype.loadApi = function(){
        $.getScript( this._url );
    };



    namespace.maps.prototype.getApi = function(){
        if(!this.loaded){
            this.loadApi();
        }
        this.loaded = true;
        return this.apiDefer.promise;
    };


    return namespace.maps;
})(__ARGUMENT_LIST__);