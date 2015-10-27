(function(namespace, app, globals) {


    namespace.abstractElement = function(){

    };



    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getMap = function() {
        return this.container.map;
    };


    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getLeaflet = function() {
        return this.container.leaflet;
    };




    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.setContainer = function(container) {
        this.elements = {};
        this.container = container;
        return this;
    };



    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.getContainer = function(container) {
        return this.container;
    };

    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.init = function() {
        return this;
    };

    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.addElement = function(element) {
        if(this.elements[element.id]){
            return false;
        }

        if(!element.tags){
            element.tags = [];
        }

        this.elements[element.id]  = element;

        return true;
    };



    namespace.abstractElement.prototype.has = function(id){
        return !!this.elements[id];
    };



    namespace.abstractElement.prototype.get = function(id){
        if(this.elements[id]){
            return this.elements[id];
        }
        return null;
    };


    namespace.abstractElement.prototype.getAll = function(){
        return this.elements;
    };




    namespace.abstractElement.prototype.findById = function(id){
        return this.get(id);
    };




    namespace.abstractElement.prototype.findByTag = function(tagName){
        var elements = {};
        var self = this;

        var y = null;
        var i = null;
        var el = null;
        var result = null;
        var name = null;
        var negation = null;
        var isInTags = null;
        var tag = null;

        if(!tagName.forEach){
            tagName = [tagName];
        }

        for(i in tagName){
            result = tagName[i].split(/[\s,]+/);

            for(y in result){
                name = result[y];
                negation = false;

                if(name[0] === "!"){
                    negation = true;
                    name = name.substr(1);
                }

                result[y] = {
                    "tag" : name,
                    "negation" : negation
                };

            }

            tagName[i] = result;
        }


        Object.keys(this.elements).forEach(function(id){
            el = self.elements[id];
            for(var i in tagName){
                result = true;
                for (y = 0; y < tagName[i].length; y++) {
                    tag = tagName[i][y];
                    isInTags = el.tags.indexOf(tag.tag) !== -1;

                    result = tag.negation ?  !isInTags : isInTags;
                    if(!result){
                        break;
                    }
                }

                result && (elements[id] = el);
            }

        });

        return elements;
    };


    namespace.abstractElement.prototype.hide = function(id){
        var el = this.get(id);
        if(!el){
            return false;
        }

        this._hide(el);
        return true;
    };


    namespace.abstractElement.prototype._hide = function(element){
        element.obj && element.obj.setMap(null);
        return true;
    };



    namespace.abstractElement.prototype.show = function(id){
        var el = this.get(id);
        if(!el){
            return false;
        }

        this._show(el);
        return true;
    };




    namespace.abstractElement.prototype._show = function(element){
        element.obj && element.obj.setMap(this.getMap());
        return true;
    };



    namespace.abstractElement.prototype.hideByTag = function(tagName){
        var self = this;


        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.hide(id);
        });
        return this;
    };

    namespace.abstractElement.prototype.hideAll = function(){
        var self = this;

        var elements = this.getAll();

        Object.keys(elements).forEach(function(id){
            self.hide(id);
        });
        return this;
    };


    namespace.abstractElement.prototype.showByTag = function(tagName){
        var self = this;

        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.show(id);
        });
        return this;
    };

    namespace.abstractElement.prototype.showAll = function(){
        var self = this;

        var elements = this.getAll();
        Object.keys(elements).forEach(function(id){
            self.show(id);
        });
        return this;
    };



    namespace.abstractElement.prototype.delete = function(id){
        var el = this.get(id);
        if(!el){
            return false;
        }
        this._delete(this.elements[id]);
        delete this.elements[id];
        return this;
    };


    namespace.abstractElement.prototype._delete = function(element){
        element.obj && element.obj.setMap(null);
    };


    namespace.abstractElement.prototype.deleteByTag = function(tagName){
        var self = this;


        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.delete(elements[id].id);
        });

        return this;
    };


    namespace.abstractElement.prototype.deleteAll = function(){
        var self = this;

        var elements = this.getAll();
        Object.keys(elements).forEach(function(id){
            self.delete(elements[id].id);
        });
        return this;
    };

    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.add = function() {
        return this;
    };


    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.setStyle = function(id, options) {
        var el = this.get(id);
        if(!el){
            return false;
        }

        this._setStyle(this.elements[id], options);
        return this;
    };


    namespace.abstractElement.prototype._setStyle = function(element, options) {
        element["obj"].setStyle(options);
        return true;
    };


    /**
     *
     * @returns {$}
     */
    namespace.abstractElement.prototype.setStyleByTag = function(tagName, options) {
        var self = this;


        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.setStyle(elements[id].id, options);
        });

        return this;
    };


    namespace.abstractElement.prototype.triggerFromEvents  = function(events, eventName){
        var handlers = events[eventName];
        if(!handlers){
            handlers = [];
        }

        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(handlers);
        return handlerParser.parse();
    };

    return namespace.abstractElement;
})(__ARGUMENT_LIST__);