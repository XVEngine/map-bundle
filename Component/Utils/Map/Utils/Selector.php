<?php

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Utils;
use JsonSerializable;


/**
 * Class Selector
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\MapBundle\Component\Utils\Map\Utils
 */
class Selector implements  JsonSerializable
{

    /**
     * @var array
     */
    protected $layers;

    /**
     * @var string
     */
    protected $id = null;

    /**
     * @var string[]
     */
    protected $tags = [];


    /**
     * @var string[]
     */
    protected $notTags = [];


    /**
     * Selector constructor.
     * @author Krzysztof Bednarczyk
     * @param $layer
     */
    public function __construct()
    {
    }

    public static function create(){
        return new self();
    }



    /**
     * @author Krzysztof Bednarczyk
     * @param $id
     * @return $this
     */
    public function hasId($id){
        $this->id = $id;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string[] $tags
     * @return $this
     */
    public function hasTags(array $tags){
        $this->tags = $tags;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string[] $tags
     * @return $this
     */
    public function hasNotTags(array $tags){
        $this->notTags = $tags;
        return $this;
    }

    /**
     * @author Krzysztof Bednarczyk
     * @param array $layers
     * @return $this
     */
    public function inLayers(array $layers){
        $this->layers = $layers;
        return $this;
    }

    /**
     * @author Krzysztof Bednarczyk
     * @return ElementSelector
     */
    public function then(){
        $element =  new ElementSelector(null);
        $element->setSelector($this);
        return $element;
    }


    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    function jsonSerialize()
    {
        return array_filter([
            "id" => $this->id,
            "tags" => $this->tags,
            "notTags" => $this->notTags,
            "inLayers" => $this->layers
        ]);
    }
}