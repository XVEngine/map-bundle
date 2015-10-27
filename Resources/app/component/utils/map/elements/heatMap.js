(function(namespace, app, globals) {


    namespace.heatMap = app.newClass({
        extend: function () {
            return app.component.utils.map.abstract.elementAbstract;
        }
    });


    namespace.heatMap.prototype.init = function(){

    };

    namespace.heatMap.prototype.add = function(element){
        if(!element.forEach){
            return this._add(element);
        }

        var self = this;
        element.forEach(function(p){
            self._add(p);
        });

        return this;
    };

    namespace.heatMap.prototype._getObj = function(data, options){
        var heatMap =  new HeatmapOverlay(options);
        heatMap.setData(data);
        return heatMap;
    };

    namespace.heatMap.prototype._add = function(element){
        if(this.has(element.id)){
            return this;
        }

        var self = this;
        var options = element.options || {};


        var obj = this._getObj(element.data, options);




        this.getMap().addLayer(obj);
        element["obj"] = obj;
        element.hidden = false;
        this.addElement(element);
        return true;
    };



    namespace.heatMap.prototype._delete = function(element){
        element.obj && this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.heatMap.prototype._hide = function(element){
        if(element.hidden){
            return true;
        }
        element.hidden = true;
        this.getMap().removeLayer(element.obj);
        return true;
    };

    namespace.heatMap.prototype._show = function(element){
        if(!element.hidden){
            return true;
        }

        element.hidden = false;
        element.obj.addTo(this.getMap());
        return true;
    };


    return namespace.heatMap;
})(__ARGUMENT_LIST__);