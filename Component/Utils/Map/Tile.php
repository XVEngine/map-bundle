<?php
/**
 * @author Krzysztof Bednarczyk
 * User: NoName
 * Date: 14.10.2015
 * Time: 10:06
 */

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map;


use JsonSerializable;


class Tile  implements JsonSerializable
{

    /**
     * @var string
     */
    protected $id;

    /**
     * @var string
     */
    protected $url;


    /**
     * @var array
     */
    protected $options = [];


    /**
     * Tile constructor.
     * @author Krzysztof Bednarczyk
     */
    public function __construct($id, $url = null, $options = null)
    {
        $this->setId($id);
        $url && $this->setUrl($url);
        $options && $this->setOptions($options);
    }

    /**
     * Get id value
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set id value
     * @author Krzysztof Bednarczyk
     * @param string $id
     * @return  $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get url value
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set url value
     * @author Krzysztof Bednarczyk
     * @param string $url
     * @return  $this
     */
    public function setUrl($url)
    {
        $this->url = $url;
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
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    function jsonSerialize()
    {
        return array(
            "id" => $this->getId(),
            "url" => $this->getUrl(),
            "options" => $this->getOptions(),
        );
    }
}