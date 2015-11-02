(function(namespace, app, globals) {


    namespace.heatMap = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.abstractElement;
        }
    });


    namespace.heatMap.prototype.create = function(){
        var obj = new HeatmapOverlay(this.data.options);
        this.setObject(obj);
        this.setData(this.data.data);
        this.data.show && this.show();

        return this;
    };

    namespace.heatMap.prototype.setData = function(data){
        this.getObject().setData(data);
        return this;
    };

    namespace.heatMap.prototype.setRadius = function( radius){
        this.getObject().cfg.radius = radius;
        this.getObject()._draw();
        return this;
    };


    return namespace.heatMap;
})(__ARGUMENT_LIST__);