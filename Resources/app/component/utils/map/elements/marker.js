(function(namespace, app, globals) {


    namespace.marker = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.elementAbstract;
        }
    });


    namespace.marker.prototype.init = function(){
        this.clusters = {};
        this.cluterOptions = {};
    };

    namespace.marker.prototype.add = function(element){
        if(!element.forEach){
            return this._add(element);
        }

        var self = this;
        element.forEach(function(p){
            self._add(p);
        });

        return this;
    };


    namespace.marker.prototype.setClusterOptions = function(clusterName, options){
        if(this.cluterOptions[clusterName]){
            this.cluterOptions[clusterName] = {
                "template" : "{0}"
            };
        }

        this.cluterOptions[clusterName] = $.extend( true, this.cluterOptions[clusterName], options );
        return this;
    };


    namespace.marker.prototype.getClusterOptions = function(clusterName){
        if(this.cluterOptions[clusterName]){
            return this.cluterOptions[clusterName];
        }

        this.setClusterOptions(clusterName, {});
        return this.cluterOptions[clusterName];
    };

    namespace.marker.prototype._add = function(element){
        if(this.has(element.id)){
            return this;
        }


        var self = this;
        var options = element.options || {};

        if(element.title){
            options.title = element.title;
        }

        if(element.icon){
            options.icon = this.getLeaflet()[element.icon.type === "div" ? "divIcon" : "icon"](element.icon);
        }

        var obj = this.getLeaflet().marker({
            lat: element.lat,
            lng: element.lng
        }, options);


        obj.on("click", function(){
            self.triggerFromEvents(element.events, "onClick");
        });


        if(element.cluster){
            this.getCluster(element.cluster).addLayer(obj);
        }else{
            obj.addTo(this.getMap());
        }

        element["obj"] = obj;
        element.hidden = false;
        this.addElement(element);
        return true;
    };


    namespace.marker.prototype.getCluster = function (name) {
        if (this.clusters[name]) {
            return this.clusters[name]
        }
        var self = this;

        var cluster = this.getLeaflet()
            .markerClusterGroup({
                spiderfyDistanceMultiplier: 2,
                iconCreateFunction: function (cluster) {
                    var value = 0;
                    var options = self.getClusterOptions(name);
                    cluster.getAllChildMarkers().forEach(function(marker){
                        value += typeof marker.options.clusterValue === "undefined"
                            ? 1 :
                            marker.options.clusterValue;
                    });

                    return self.getLeaflet().divIcon({
                        html: '<b>' +options.template.format(Math.round(value)) + '</b>',
                        iconSize: [40, 40],
                        className: "map-cluster-marker"
                    });
                }
            });

        this.getMap().addLayer(cluster);
        this.clusters[name] = cluster;
        return cluster;
    };


    namespace.marker.prototype._delete = function(element){
        element.cluster && this.getCluster(element.cluster).removeLayer(element.obj);
        element.obj && this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.marker.prototype._hide = function(element){
        if(element.hidden){
            return true;
        }
        element.hidden = true;

        if(element.cluster){
            this.getCluster(element.cluster).removeLayer(element.obj);
        }
        this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.marker.prototype._show = function(element){
        if(!element.hidden){
            return true;
        }

        element.hidden = false;
        if(element.cluster){
            this.getCluster(element.cluster).addLayer(element.obj);
        }else{
            element.obj.addTo(this.getMap());
        }
        return true;
    };


    return namespace.marker;
})(__ARGUMENT_LIST__);