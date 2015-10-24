(function(namespace, app, globals) {


    namespace.point = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.elementAbstract;
        }
    });


    namespace.point.prototype.init = function(){
        this.clusters = {};
    };

    namespace.point.prototype.add = function(element){
        if(!element.forEach){
            return this._add(element);
        }

        var self = this;
        element.forEach(function(p){
            self._add(p);
        });

        return this;
    };


    namespace.point.prototype._add = function(element){
        if(this.has(element.id)){
            return this;
        }


        var self = this;
        var options = element.customOptions || {};

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

        obj.addTo(this.getMap());
        element["obj"] = obj;
        element.hidden = false;
        this.addElement(element);
        return true;
    };


    namespace.point.prototype.getCluster = function (name) {
        if (this.clusters[name]) {
            return this.clusters[name]
        }
        var self = this;
        var cluster = this.getLeaflet()
            .markerClusterGroup({
                spiderfyDistanceMultiplier: 2,
                iconCreateFunction: function (cluster) {
                    return self.getLeaflet().divIcon({
                        html: '<b>' + cluster.getChildCount() + '</b>',
                        iconSize: [40, 40],
                        className: "map-cluster-point"
                    });
                }
            });

        this.getMap().addLayer(cluster);
        this.clusters[name] = cluster;
        return cluster;
    };


    namespace.point.prototype._delete = function(element){
        element.cluster && this.getCluster(element.cluster).addLayer(element.obj);
        element.obj && this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.point.prototype._hide = function(element){
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

    namespace.point.prototype._show = function(element){
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
    return namespace.point;
})(__ARGUMENT_LIST__);