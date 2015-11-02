<?php

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Utils;


use XVEngine\Bundle\MapBundle\Component\Utils\Map\Element\AbstractElement;

/**
 * Class ElementSelector
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\MapBundle\Component\Utils\Map\Utils
 * @method $this delete() Delete element
 */
class ElementSelector extends AbstractElement
{

    /**
     * @var array
     */
    protected $calls = [

    ];


    /**
     * @var Selector
     */
    protected $selector;



    /**
     * @author Krzysztof Bednarczyk
     * @param Selector $selector
     * @return $this
     */
    public function setSelector(Selector $selector){
        $this->selector = $selector;
        return $this;
    }



    /**
     * @author Krzysztof Bednarczyk
     * @param string $name
     * @param mixed[] $arguments
     * @return $this
     */
    public function __call($name, $arguments)
    {
        $this->calls[] = [
            "method" => $name,
            "arguments" => $arguments
        ];
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $eventName
     * @return $this
     */
    public function off($eventName){
        parent::off($eventName);
        $this->calls[] = [
            "method" => __FUNCTION__,
            "arguments" => func_get_args()
        ];
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function export()
    {
        return [
            "events" => $this->getEvents(),
            "selector" => $this->selector,
            "calls" => $this->calls
        ];
    }

    /**
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getType()
    {
        return "selector";
    }

    /**
     * @inheritdoc
     */
    public function setTags($tags)
    {
        return $this->__call(__FUNCTION__, func_get_args());
    }

    /**
     * @inheritdoc
     */
    public function addTag($tag)
    {
        return $this->__call(__FUNCTION__, func_get_args());
    }


    /**
     * @inheritdoc
     */
    public function setOptions($options)
    {
        return $this->__call(__FUNCTION__, func_get_args());
    }


    /**
     * @inheritdoc
     */
    public function show($value = true)
    {
        return $this->__call(__FUNCTION__, func_get_args());
    }



    /**
     * @author Krzysztof Bednarczyk
     * @return array
     */
    function jsonSerialize()
    {
        return $this->export();
    }



}