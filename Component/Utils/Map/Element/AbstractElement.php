<?php
/**
 * @author Krzysztof Bednarczyk
 * User: NoName
 * Date: 14.10.2015
 * Time: 10:06
 */

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Element;


use JsonSerializable;
use XVEngine\Core\Component\Events;


/**
 * Class Point
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\ComponentsBundle\Component\Utils\Map
 */
abstract class AbstractElement  extends Events implements JsonSerializable
{

    /**
     * @var string
     */
    protected $id;

    /**
     * @var string[]
     */
    protected $tags = [];


    /**
     * @var true
     */
    protected $show = true;


    /**
     * @var array
     */
    protected $options;

    /**
     * Point constructor.
     * @author Krzysztof Bednarczyk
     */
    public function __construct($id)
    {
        $this->id = $id;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $tags
     * @return $this
     */
    public function setTags($tags){
        $this->tags = array_values($tags);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $tag
     * @return $this
     */
    public function addTag($tag){
        $this->tags[] = $tag;
        return $this;
    }




    /**
     * Get options value
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Set options value
     * @author Krzysztof Bednarczyk
     * @param array $options
     * @return  $this
     */
    public function setOptions($options)
    {
        $this->options = $options;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param bool|true $value
     * @return $this
     */
    public function show($value = true){
        $this->show = (bool) $value;
        return $this;
    }




    public abstract function export();

    /**
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public abstract function getType();


    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    function jsonSerialize()
    {
        $data = $this->export();
        $data["id"] = $this->id;
        $data["tags"] = array_unique($this->tags);
        $data["show"] = $this->show;
        $data["type"] = $this->getType();
        $data["events"] = $this->getEvents();
        $data["options"] = $this->options;

        return $data;
    }
}