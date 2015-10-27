(function(namespace, app, globals) {


    namespace.mapComponent = app.newClass({
        extend: function () {
            return app.core.component.abstractComponent;
        }
    });
    
    


    /**
     * 
     * @returns {$}
     */
    namespace.mapComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                    <xv-map>
                        <div class="map">
                            <div class="container"></div>
                        </div>
                        <div class="right-panel">
                            <div>
                                <div class="toggle">
                                    <div class="breadcrumb">

                                    </div>
                                    <a href="#">
                                        <i class="icon icon-arrow-left"></i>
                                    </a>
                                </div>


                                <div class="content">

                                </div>
                            </div>
                        </div>
                    </xv-map>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };
    

    /**
     * 
     * @returns {object}
     */
    namespace.mapComponent.prototype.getDefaultParams = function() {
        return {
            apiKey: "",
            mapOptions : {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            },

            topRightComponent: null,
            showPanel : true,
            leafletLibs: [
            ],

            leafletLibCss: [
            ]
        };
    };

  
    /**
     * 
     * @returns {undefined}
     */
    namespace.mapComponent.prototype.init = function() {
        this.modules = {};
        this.layers = {};
        this.tiles = {};
        this.elements = {
        };

    };

    namespace.mapComponent.prototype.getElement = function() {
        var self = this;

        return app.service.ui.jsLoader.load(self.params.leafletLibs).then(function(){
            return app.service.ui.cssLoader.load(self.params.leafletLibCss);
        }).then(function(){
            self.leaflet = L;
            return app.service.api.google.maps.getApi();
        }).then(function(){
            setTimeout(function(){
                self.init2();
            }, 10);

            return self.$element;
        }).fail(function(){
            console.error(arguments);
        });
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.mapComponent.prototype.init2 = function() {

        this.$rightPanel = this.$element.find("> div.right-panel");
        this.$map = this.$element.find("> div.map");
        this.$breadcrumb = this.$element.find("> .right-panel > div > .toggle > div.breadcrumb");

        this.$mapContainer = this.$map.find(" > div.container");
        this.$mapContainer.attr("id", app.utils.getRandomString(10));
        this.showPanel(this.params.showPanel);


        this.map = this.leaflet
            .map(this.$mapContainer[0], this.params.mapOptions);


        this.leaflet.control.mousePosition().addTo(this.map); //mose position in left bottom corner

        this.leaflet.control.zoomBox({ //zoom
            modal: false,
            className : "icon-search"
        }).addTo(this.map);


        for(var i in namespace.map.elements){
            var element = new namespace.map.elements[i]();
            element.setContainer(this).init();
            this.elements[i] = element;
        }


        this.params.tiles && this.setTiles(this.params.tiles);
        this.params.miniMap && this.setMiniMap(this.params.miniMap.tile, this.params.miniMap.options);
        this.params.rightPanelComponent && this.setRightPanelComponent(this.params.rightPanelComponent);
        this.params.breadCrumbComponent && this.setBreadCrumbComponent(this.params.breadCrumbComponent);
        this.initEvents();
        this.trigger("onMapReady");

    };



    namespace.mapComponent.prototype.setTiles = function(tiles){
        var self = this;
        this.removeAllTiles();
        tiles.forEach(function(tile){
            self.addTile(tile);
        });

        return true;
    };


    /**
     *
     * @param tile
     * @param options
     * @returns {boolean}
     */
    namespace.mapComponent.prototype.setMiniMap = function(tile, options){
        this._miniMap = new this.leaflet
            .Control
            .MiniMap(
                this._renderTile(tile),
                options
            );

        this._miniMap.addTo(this.map);
        return true;
    };


    namespace.mapComponent.prototype.addTile = function(tile){
        if(this.tiles[tile.id]){
            return this;
        }


        this.tiles[tile.id] = this._renderTile(tile).addTo(this.map);

        return true;
    };

    namespace.mapComponent.prototype._renderTile = function(tile){
        return this.leaflet
            .tileLayer(tile.url, tile.options);
    };


    namespace.mapComponent.prototype.removeTile = function(id){
        if(!this.tiles[id]){
            return false;
        }

        this.map.removeLayer(this.tiles[id]);
        return true;
    };

    namespace.mapComponent.prototype.removeAllTiles = function(){
        var self = this;
        Object.keys(this.tiles).forEach(function(id){
            self.removeTile(id);
        });

        return true;
    };


    namespace.mapComponent.prototype.initEvents = function() {
        var self = this;

        this.map.on('move', function() {
            self.trigger("onChange");
        });


        this.$rightPanel.find(".toggle > a:first").on("click", function () {
            self.showPanel(!self.isPanelShowed());
            return false;
        });

    };

    /**
     *
     */
    namespace.mapComponent.prototype.showPanel = function(value) {
        this.$element[value ? 'addClass' : 'removeClass']("panel-show");
        return this;
    };

       namespace.mapComponent.prototype.isPanelShowed = function() {
        return this.$element.is(".panel-show");
    };


    namespace.mapComponent.prototype.getBounds = function() {
        var bounds = this.map.getBounds();

        return {
            "northEast": {
                "lat": bounds.getNorthEast().lat,
                "lng": bounds.getNorthEast().lng
            },
            "southWest": {
                "lat": bounds.getSouthWest().lat,
                "lng": bounds.getSouthWest().lng
            },
            "center": {
                "lat": bounds.getCenter().lat,
                "lng": bounds.getCenter().lng
            },
            "zoom": this.map.getZoom()
        };
    };


    namespace.mapComponent.prototype.centerToUserPosition = function() {
        if(!navigator.geolocation){
            return false;
        }
        var self = this;
        var deferred = Q.defer();

        navigator.geolocation.getCurrentPosition(function(position){
            self.panTo({
                lat : position.coords.latitude,
                lng : position.coords.longitude
            });
            deferred.resolve(true);
        });

        return deferred.promise;
    };


    namespace.mapComponent.prototype.panTo = function(data, options) {
        this.map.panTo(data, options);
        return true;
    };

    namespace.mapComponent.prototype.getZoom = function() {
        return this.map.getZoom();
    };

    namespace.mapComponent.prototype.setZoom = function(zoom, options) {
        return this.map.setZoom(zoom, options);
    };


    namespace.mapComponent.prototype.setMapOptions = function(options) {
        this.map.setOptions(options);
        return true;
    };





    namespace.mapComponent.prototype.element = function(element, method){
        if(!this.elements[element]){
            console.error("Map: Undefined element "+element);
            return false;
        }

        if(!this.elements[element][method]){
            console.error("Map: Undefined method "+ method + " in "+element);
            return false;
        }


        return this.elements[element][method].apply(
            this.elements[element],
            Array.prototype.splice.call(arguments, 2)
        );
    };



    namespace.mapComponent.prototype.setRightPanelComponent  = function(component){
        var self = this;
        return app.utils.buildComponent(component).then(function($html){
            self.$rightPanel.find(".content:first").html($html);
            return true;
        });
    };

    namespace.mapComponent.prototype.setBreadCrumbComponent  = function(component){
        var self = this;
        return app.utils.buildComponent(component).then(function($html){
            self.$breadcrumb.html($html);
            return true;
        });
    };





    return namespace.mapComponent;
})(__ARGUMENT_LIST__);