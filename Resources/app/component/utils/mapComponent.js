(function (namespace, app, globals) {


    namespace.mapComponent = app.newClass({
        extend: function () {
            return app.core.component.abstractComponent;
        }
    });


    /**
     *
     * @returns {$}
     */
    namespace.mapComponent.prototype.getTemplate = function () {
        var tmplString = app.utils.getString(function () {
            //@formatter:off
            /**<string>
                    <xv-map class="event-insert">
                        <div class="map">
                            <div class="container">
                                <div class="view"></div>
                                <div class="panes bottom-left"></div>
                                <div class="panes top-left"></div>
                                <div class="panes bottom"></div>
                            </div>
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
    namespace.mapComponent.prototype.getDefaultParams = function () {
        return {
            apiKey: "",
            mapOptions: {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            },

            topRightComponent: null,
            bottomLeftComponent: null,
            topLeftComponent: null,
            showPanel: true,
            leafletLibs: [],

            leafletLibCss: [],
            elements : []
        };
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.mapComponent.prototype.init = function () {
        this.modules = {};
        this.layers = {};
        this.tiles = {};
        this.elements = {};
        this.incrementalId = 1;

    };

    namespace.mapComponent.prototype.getElement = function () {
        var self = this;

        return app.service.ui.jsLoader.load(self.params.leafletLibs).then(function () {
            return app.service.ui.cssLoader.load(self.params.leafletLibCss);
        }).then(function () {
            self.leaflet = L;

            self.$element.one("event-insert", function(){
                self.init2();
            });


            return self.$element;
        }).fail(function () {
            console.error(arguments);
        });
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.mapComponent.prototype.init2 = function () {

        this.$rightPanel = this.$element.find("> div.right-panel");
        this.$map = this.$element.find("> div.map");
        this.$breadcrumb = this.$element.find("> .right-panel > div > .toggle > div.breadcrumb");
        this.$panes = this.$map.find("> .container > .panes");
        this.$mapContainer = this.$map.find(" > div.container > div.view");
        this.$mapContainer.attr("id", app.utils.getRandomString(10));
        this.showPanel(this.params.showPanel);


        this.map = this.leaflet
            .map(this.$mapContainer[0], this.params.mapOptions);


        this.leaflet.control.mousePosition().addTo(this.map); //mose position in left bottom corner

        this.leaflet.control.zoomBox({ //zoom
            modal: false,
            className: "icon-search"
        }).addTo(this.map);


        /*
        for (var i in namespace.map.elements) {
            var element = new namespace.map.elements[i]();
            element.setContainer(this).init();
            this.elements[i] = element;
        }*/


        this.params.tiles && this.setTiles(this.params.tiles);
        this.params.miniMap && this.setMiniMap(this.params.miniMap.tile, this.params.miniMap.options);
        this.params.rightPanelComponent && this.setRightPanelComponent(this.params.rightPanelComponent);
        this.params.breadCrumbComponent && this.setBreadCrumbComponent(this.params.breadCrumbComponent);
        this.params.bottomLeftComponent && this.setBottomLeftComponent(this.params.bottomLeftComponent);
        this.params.topLeftComponent && this.setTopLeftComponent(this.params.topLeftComponent);
        this.params.bottomComponent && this.setBottomComponent(this.params.bottomComponent);

        this.initEvents();



        var self = this;
        this.params.elements.forEach(function(el){
            self.add(el.layer, el.element);
        });

        this.trigger("onMapReady");
    };


    namespace.mapComponent.prototype.setTiles = function (tiles) {
        var self = this;
        this.removeAllTiles();
        tiles.forEach(function (tile) {
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
    namespace.mapComponent.prototype.setMiniMap = function (tile, options) {
        this._miniMap = new this.leaflet
            .Control
            .MiniMap(
            this._renderTile(tile),
            options
        );

        this._miniMap.addTo(this.map);
        return true;
    };


    namespace.mapComponent.prototype.addTile = function (tile) {
        if (this.tiles[tile.id]) {
            return this;
        }


        this.tiles[tile.id] = this._renderTile(tile).addTo(this.map);

        return true;
    };

    namespace.mapComponent.prototype._renderTile = function (tile) {
        return this.leaflet
            .tileLayer(tile.url, tile.options);
    };


    namespace.mapComponent.prototype.removeTile = function (id) {
        if (!this.tiles[id]) {
            return false;
        }

        this.map.removeLayer(this.tiles[id]);
        return true;
    };

    namespace.mapComponent.prototype.removeAllTiles = function () {
        var self = this;
        Object.keys(this.tiles).forEach(function (id) {
            self.removeTile(id);
        });

        return true;
    };


    namespace.mapComponent.prototype.initEvents = function () {
        var self = this;

        this.map.on('move', function () {
            self.trigger("onChange");
        });



        this.$element.on("event-insert", function(){

        });

        this.$rightPanel.find(".toggle > a:first").on("click", function () {
            self.showPanel(!self.isPanelShowed());
            return false;
        });

    };

    /**
     *
     */
    namespace.mapComponent.prototype.showPanel = function (value) {
        this.$element[value ? 'addClass' : 'removeClass']("panel-show");

        var self = this;
        for (var i = 0; i < 30; i++) {
            setTimeout(function () {
                self.map.invalidateSize();
            }, i * 5);
        }
        return this;
    };

    namespace.mapComponent.prototype.isPanelShowed = function () {
        return this.$element.is(".panel-show");
    };


    namespace.mapComponent.prototype.getBounds = function () {
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


    namespace.mapComponent.prototype.centerToUserPosition = function () {
        if (!navigator.geolocation) {
            return false;
        }
        var self = this;
        var deferred = Q.defer();

        navigator.geolocation.getCurrentPosition(function (position) {
            self.panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            deferred.resolve(true);
        });

        return deferred.promise;
    };


    namespace.mapComponent.prototype.panTo = function (data, options) {
        this.map.panTo(data, options);
        return true;
    };



    namespace.mapComponent.prototype.fitBounds = function (bounds, options) {
        this.map.fitBounds(bounds, options);
        return true;
    };



    namespace.mapComponent.prototype.getZoom = function () {
        return this.map.getZoom();
    };

    namespace.mapComponent.prototype.setZoom = function (zoom, options) {
        return this.map.setZoom(zoom, options);
    };


    namespace.mapComponent.prototype.setMapOptions = function (options) {
        this.map.setOptions(options);
        return true;
    };


    namespace.mapComponent.prototype.add = function (layerName, elements) {
        if(!elements.forEach){
            elements = [];
        }

        var self = this;

        elements.forEach(function(item){
            self._add(layerName, item);
        });

        return this;
    };

    namespace.mapComponent.prototype._add = function (layerName, element) {
        if (!namespace.map.elements[element.type]) {
            console.error("Undefined element type " + element.type, element);
            return false;
        }


        var el = new namespace.map.elements[element.type](
            element.id,
            element,
            this.getLayer(layerName),
            this
        );


        el.__id = this.incrementalId++;
        this.elements[el.__id] = el;
        return el.create();
    };


    namespace.mapComponent.prototype.remove = function (el) {
        if(!el.__id){
            return false;
        }

        if(this.elements[el.__id]){
            delete this.elements[el.__id];
        }
        return true;
    };

    namespace.mapComponent.prototype.getLayer = function (layerName, element) {
        if(this.layers[layerName]){
            return this.layers[layerName];
        }
        this.layers[layerName] = this.leaflet.layerGroup();
        this.layers[layerName].__name = layerName;

        this.layers[layerName].addTo(this.map);
        return this.layers[layerName];
    };


    namespace.mapComponent.prototype.execute = function (item) {
        var promises = [];

        var items = this.getElements(item.selector);

        items.forEach(function(element){
            item.calls.forEach(function(exec){
                if(!element[exec.method]){
                    console.error("Not found method "+ exec.method, exec);
                    return false;
                }

                promises.push( app.utils.parseArguments(exec.arguments).then(function(args){
                    element[exec.method].apply(element, args)
                }));
            });
        });

        return Q.all(promises);
    };


    namespace.mapComponent.prototype.getElements = function (selector) {
        var result = [];
        var el = null;
        for(var i in this.elements){
            el = this.elements[i];
            if(this.checkSelector(el, selector)){
                result.push(el);
            }
        }

        return result;
    };


    namespace.mapComponent.prototype.checkSelector = function (el, selector) {
        if(selector.id && selector.id != el.getId()){
            return false;
        }


        if(selector.inLayers){
            if(selector.inLayers.indexOf(el.getLayer().__name) === -1){
                return false;
            }
        }


        if(selector.tags){
            var tags = el.getTags();
            for(var i in selector.tags){
                if(tags.indexOf(selector.tags[i]) === -1){
                    return false;
                }
            }
        }

        if(selector.notTags){
            var tags = el.getTags();
            for(var i in selector.notTags){
                if(tags.indexOf(selector.notTags[i]) !== -1){
                    return false;
                }
            }
        }

        return  true;
    };


    namespace.mapComponent.prototype.setRightPanelComponent = function (component) {
        var self = this;
        return app.utils.buildComponent(component).then(function ($html) {
            self.$rightPanel.find(".content:first").html($html);
            return true;
        });
    };

    namespace.mapComponent.prototype.setBottomLeftComponent = function (component) {
        var self = this;
        return app.utils.buildComponent(component).then(function ($html) {
            self.$panes.filter(".bottom-left").html($html);
            return true;
        });
    };

    namespace.mapComponent.prototype.setTopLeftComponent = function (component) {
        var self = this;
        return app.utils.buildComponent(component).then(function ($html) {
            self.$panes.filter(".top-left").html($html);
            return true;
        });
    };

    namespace.mapComponent.prototype.setBottomComponent = function (component) {
        var self = this;
        return app.utils.buildComponent(component).then(function ($html) {
            self.$panes.filter(".bottom").html($html);
            return true;
        });
    };


    namespace.mapComponent.prototype.setBreadCrumbComponent = function (component) {
        var self = this;
        return app.utils.buildComponent(component).then(function ($html) {
            self.$breadcrumb.html($html);
            return true;
        });
    };

    namespace.mapComponent.prototype.setLayerOption = function (layer, optionName, value) {
        this.getLayer(layer)[optionName](value);

        return this;
    };


    return namespace.mapComponent;
})(__ARGUMENT_LIST__);