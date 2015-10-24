(function(namespace, app, globals) {


    namespace.point = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.elementAbstract;
        }
    });


    namespace.point.prototype.init = function(){
        this.clusters = {};
    };

    namespace.point.prototype.add = function(point){
        if(!point.forEach){
            return this._add(point);
        }

        var self = this;
        point.forEach(function(p){
            self._add(p);
        });

        return this;
    };


    namespace.point.prototype._add = function(point){
        if(this.has(point.id)){
            return this;
        }


        var self = this;
        var options = point.customOptions || {};

        if(point.title){
            options.title = point.title;
        }

        if(point.icon){
            options.icon = this.getLeaflet()[point.icon.type === "div" ? "divIcon" : "icon"](point.icon);
        }

        var marker = this.getLeaflet().marker({
            lat: point.lat,
            lng: point.lng
        }, options);


        marker.on("click", function(){
            self.triggerFromEvents(point.events, "onClick");
        });


        if(point.cluster){
            this.getCluster(point.cluster).addLayer(marker);
        }else{
            marker.addTo(this.getMap());
        }

        marker.addTo(this.getMap());
        point["obj"] = marker;
        point.hidden = false;
        this.addElement(point);
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