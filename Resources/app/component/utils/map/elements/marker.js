(function(namespace, app, globals) {


    namespace.marker = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.abstractElement;
        }
    });




    //app.core.events


    namespace.marker.prototype.create = function(){
        var obj = this.getLeaflet().marker(
            this.data.position,
            this.prepareOptions(this.data.options)
        );
        this.setObject(obj);
        this.data.show && this.show();

        var self = this;
        obj.on("click", function(){
            self.trigger( "onClick");
        });



    };


    namespace.marker.prototype.prepareOptions = function(options){
        if(!options.icon){
            return options;
        }


        if(!options.icon.html){
            return options;
        }

        options.icon = L.divIcon(options.icon);

        return options;
    };



    namespace.marker.prototype.getCluster = function(name){
        if(!this.getLayer().__clusters){
            this.getLayer().__clusters = {};
        }
        if (this.getLayer().__clusters[name]) {
            return this.getLayer().__clusters[name];
        }

        var self = this;
        var cluster = this.getLeaflet()
            .markerClusterGroup({
                spiderfyDistanceMultiplier: 2,
                iconCreateFunction: function (cluster) {
                    var value = 0;
                    cluster.getAllChildMarkers().forEach(function(marker){
                        value += typeof marker.options.clusterValue === "undefined"
                            ? 1 :
                            marker.options.clusterValue;
                    });

                    return self.getLeaflet().divIcon({
                        html: '<b>' + Math.round(value) + '</b>',
                        iconSize: [40, 40],
                        className: "map-cluster-marker"
                    });
                }
            });

        this.getLayer().addLayer(cluster);
        this.getLayer().__clusters[name] = cluster;
        return cluster;
    };



    namespace.marker.prototype.show = function(value){
        value = app.utils.ifsetor(value , true);
        this.data.cluster && this.getCluster(this.data.cluster)[value ? 'addLayer' : 'removeLayer'](this.getObject());
        !this.data.cluster && this.getLayer()[value ? 'addLayer' : 'removeLayer'](this.getObject());
        return this;
    };



    namespace.marker.prototype.delete = function(){
        this.data.cluster && this.getCluster(this.data.cluster)['removeLayer'](this.getObject());
        this.getLayer().removeLayer(this.getObject());
        this.getContainer().remove(this);
        return this;
    };





    return namespace.marker;
})(__ARGUMENT_LIST__);