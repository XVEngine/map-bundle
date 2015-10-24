(function(namespace, app, globals) {


    namespace.polygon = app.newClass({
        extend: function () {
            return namespace.multiPolygon;
        }
    });


    namespace.polygon.prototype._getObj = function(points, options){
        return this.getLeaflet().polygon(points, options);
    };

    return namespace.polygon;
})(__ARGUMENT_LIST__);