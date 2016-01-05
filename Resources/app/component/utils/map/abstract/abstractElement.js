(function(namespace, app, globals) {


    namespace.abstractElement = app.newClass({
        extend : function () {
            return app.core.events;
        }
    });


    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.__construct = function(id, data, layer, container) {
        this.id = id;
        this.data = data;
        this.layer = layer;
        this.container = container;
        this.__object = null;
        this._tags = [];
        this.setEvents(data.events);
    };

    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getLayer = function() {
        return this.layer;
    };



    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getLeaflet = function() {
        return this.getContainer().leaflet;
    };

    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getId = function() {
        return this.id;
    };



    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getContainer = function() {
        return this.container;
    };


    namespace.abstractElement.prototype.getObject = function(){
        return this.__object;
    };

    namespace.abstractElement.prototype.setObject = function(obj){
        this.__object = obj;
        return this;
    };


    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.create = function() {
        return this;
    };






    namespace.abstractElement.prototype.show = function(value){
        value = app.utils.ifsetor(value , true);
        this.getLayer()[value ? 'addLayer' : 'removeLayer'](this.getObject());
        return this;
    };



    namespace.abstractElement.prototype.delete = function(){
        this.getLayer().removeLayer(this.getObject());
        this.getContainer().remove(this);
        return this;
    };


    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.setStyle = function(options) {
        this.getObject().setStyle(options);
        return this;
    };


    namespace.abstractElement.prototype.setTags = function(tags){
        this._tags = tags;
        return this;
    };


    namespace.abstractElement.prototype.getTags = function(){
        return this._tags;
    };


    namespace.abstractElement.prototype.addTag = function(tag){
        this._tags.push(tag);
        return this;
    };

    namespace.abstractElement.prototype.setOptions = function(options){
        this.getObject().setStyle(options);
        return this;
    };


    return namespace.abstractElement;
})(__ARGUMENT_LIST__);
