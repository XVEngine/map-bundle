(function(namespace, app, globals) {


    namespace.multiPolygon = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.abstractElement;
        }
    });


    namespace.multiPolygon.prototype.create = function(){
        var obj = this.getLeaflet().multiPolygon(this.data.points);
        this.setObject(obj);
        this.setOptions(this.data.options);
        var self = this;
        obj.on("click", function(){
            self.trigger("onClick");
        });

        obj.on("mouseover", function(){
            self.trigger( "onMouseOver");
        });

        obj.on("mouseout", function(){
            self.trigger("onMouseOut");
        });

        this.data.show && this.show();


        return this;
    };

    return namespace.multiPolygon;
})(__ARGUMENT_LIST__);