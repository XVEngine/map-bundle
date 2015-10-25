(function(namespace, app, globals) {


    namespace.elementAbstract = function(){

    };



    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.getMap = function() {
        return this.container.map;
    };


    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.getLeaflet = function() {
        return this.container.leaflet;
    };




    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.setContainer = function(container) {
        this.elements = {};
        this.container = container;
        return this;
    };



    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.getContainer = function(container) {
        return this.container;
    };

    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.init = function() {
        return this;
    };

    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.addElement = function(element) {
        if(this.elements[element.id]){
            return false;
        }

        if(!element.tags){
            element.tags = [];
        }

        this.elements[element.id]  = element;

        return true;
    };



    namespace.elementAbstract.prototype.has = function(id){
        return !!this.elements[id];
    };



    namespace.elementAbstract.prototype.get = function(id){
        if(this.elements[id]){
            return this.elements[id];
        }
        return null;
    };


    namespace.elementAbstract.prototype.getAll = function(){
        return this.elements;
    };




    namespace.elementAbstract.prototype.findById = function(id){
        return this.get(id);
    };




    namespace.elementAbstract.prototype.findByTag = function(tagName){
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


    namespace.elementAbstract.prototype.hide = function(id){
        var el = this.get(id);
        if(!el){
            return false;
        }

        this._hide(el);
        return true;
    };


    namespace.elementAbstract.prototype._hide = function(element){
        element.obj && element.obj.setMap(null);
        return true;
    };



    namespace.elementAbstract.prototype.show = function(id){
        var el = this.get(id);
        if(!el){
            return false;
        }

        this._show(el);
        return true;
    };




    namespace.elementAbstract.prototype._show = function(element){
        element.obj && element.obj.setMap(this.getMap());
        return true;
    };



    namespace.elementAbstract.prototype.hideByTag = function(tagName){
        var self = this;


        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.hide(id);
        });
        return this;
    };

    namespace.elementAbstract.prototype.hideAll = function(){
        var self = this;

        var elements = this.getAll();

        Object.keys(elements).forEach(function(id){
            self.hide(id);
        });
        return this;
    };


    namespace.elementAbstract.prototype.showByTag = function(tagName){
        var self = this;

        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.show(id);
        });
        return this;
    };

    namespace.elementAbstract.prototype.showAll = function(){
        var self = this;

        var elements = this.getAll();
        Object.keys(elements).forEach(function(id){
            self.show(id);
        });
        return this;
    };



    namespace.elementAbstract.prototype.delete = function(id){
        var el = this.get(id);
        if(!el){
            return false;
        }
        this._delete(this.elements[id]);
        delete this.elements[id];
        return this;
    };


    namespace.elementAbstract.prototype._delete = function(element){
        element.obj && element.obj.setMap(null);
    };


    namespace.elementAbstract.prototype.deleteByTag = function(tagName){
        var self = this;


        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.delete(elements[id].id);
        });

        return this;
    };


    namespace.elementAbstract.prototype.deleteAll = function(){
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
    namespace.elementAbstract.prototype.add = function() {
        return this;
    };


    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.setStyle = function(id, options) {
        var el = this.get(id);
        if(!el){
            return false;
        }

        this._setStyle(this.elements[id], options);
        return this;
    };


    namespace.elementAbstract.prototype._setStyle = function(element, options) {
        element["obj"].setStyle(options);
        return true;
    };


    /**
     *
     * @returns {$}
     */
    namespace.elementAbstract.prototype.setStyleByTag = function(tagName, options) {
        var self = this;


        var elements = this.findByTag(tagName);
        Object.keys(elements).forEach(function(id){
            self.setStyle(elements[id].id, options);
        });

        return this;
    };


    namespace.elementAbstract.prototype.triggerFromEvents  = function(events, eventName){
        var handlers = events[eventName];
        if(!handlers){
            handlers = [];
        }

        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(handlers);
        return handlerParser.parse();
    };

    return namespace.elementAbstract;
})(__ARGUMENT_LIST__);