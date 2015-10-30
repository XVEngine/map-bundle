(function(namespace, app, globals) {


    namespace.polygon = app.newClass({
        extend: function () {
            return namespace.multiPolygon;
        }
    });


    return namespace.polygon;
})(__ARGUMENT_LIST__);