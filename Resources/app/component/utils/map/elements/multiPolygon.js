(function(namespace, app, globals) {


    namespace.multiPolygon = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.elementAbstract;
        }
    });


    namespace.multiPolygon.prototype.init = function(){

    };

    namespace.multiPolygon.prototype.add = function(element){
        if(!element.forEach){
            return this._add(element);
        }

        var self = this;
        element.forEach(function(p){
            self._add(p);
        });

        return this;
    };


    namespace.multiPolygon.prototype._add = function(element){
        if(this.has(element.id)){
            return this;
        }


        var self = this;
        var options = element.customOptions || {};

        if(element.title){
            options.title = element.title;
        }

        var obj = this.getLeaflet().multiPolygon(
                element.points,
            options);


        obj.on("click", function(){
            self.triggerFromEvents(element.events, "onClick");
        });

        obj.on("mouseover", function(){
            self.triggerFromEvents(element.events, "onMouseOver");
        });

        obj.on("mouseout", function(){
            self.triggerFromEvents(element.events, "onMouseOut");
        });



        obj.addTo(this.getMap());
        element["obj"] = obj;
        element.hidden = false;
        this.addElement(element);
        return true;
    };



    namespace.multiPolygon.prototype._delete = function(element){
        element.obj && this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.multiPolygon.prototype._hide = function(element){
        if(element.hidden){
            return true;
        }
        element.hidden = true;
        this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.multiPolygon.prototype._show = function(element){
        if(!element.hidden){
            return true;
        }

        element.hidden = false;
        element.obj.addTo(this.getMap());
        return true;
    };
    return namespace.multiPolygon;
})(__ARGUMENT_LIST__);