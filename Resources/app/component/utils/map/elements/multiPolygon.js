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
        this.setHtml(this.data.html);


        var self = this;
        obj.on("click", function(){
            self.trigger("onClick");
        });

        obj.on("mouseover", function(e){
            self.trigger( "onMouseEnter");
            self.onMouseEnter(e);
        });

        obj.on("mouseout", function(e){
            self.trigger("onMouseLeave");
            self.onMouseLeave(e);
        });

        obj.on("mousemove", function(e){
            self.onMouseMove(e);
        });

        this.data.show && this.show();


        return this;
    };

    namespace.multiPolygon.prototype.setHtml = function(value){
        this._htmlIcon && this.getLayer().removeLayer(this._htmlIcon);
        if(!value){

            this._htmlIcon = null;
            return this;
        }


        this._htmlIcon = this.getLeaflet().marker([50.505, 30.57], {
            icon: this.getLeaflet().divIcon({
                className: 'polygon-container',
                html : "<div class='polygon-html'>"+value+"</div>"
            })
        });

        return this;
    };



    namespace.multiPolygon.prototype.onMouseEnter = function(e){
        if(!this._htmlIcon){
            return;
        }

        this._htmlIcon.setLatLng(e.latlng);
        this.getLayer().addLayer(this._htmlIcon);
    };

    namespace.multiPolygon.prototype.onMouseLeave = function(e){
        if(!this._htmlIcon){
            return;
        }

        this.getLayer().removeLayer(this._htmlIcon);
    };

    namespace.multiPolygon.prototype.onMouseMove = function(e){
        if(!this._htmlIcon){
            return;
        }
        this._htmlIcon.setLatLng(e.latlng);
    };

    return namespace.multiPolygon;
})(__ARGUMENT_LIST__);