<?php
/**
 * @author Krzysztof Bednarczyk
 * User: NoName
 * Date: 14.10.2015
 * Time: 10:06
 */

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Element;


/**
 * Class Marker
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\ComponentsBundle\Component\Utils\Map
 */
class Marker  extends AbstractElement
{

    /**
     * @var float
     */
    protected $lat;

    /**
     * @var float
     */
    protected $lng;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var string|array
     */
    protected $icon;


    /**
     * @var string
     */
    protected $cluster;


    /**
     * @var array
     */
    protected $customOptions;


    /**
     * @author Krzysztof Bednarczyk
     * @param float $lat
     * @param float $lng
     * @return $this
     */
    public function setPosition($lat, $lng){
        $this->setLat($lat);
        $this->setlng($lng);
        return $this;
    }


    /**
     * Get lat value
     * @author Krzysztof Bednarczyk
     * @return mixed
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lat value
     * @author Krzysztof Bednarczyk
     * @param mixed $lat
     * @return  $this
     */
    public function setLat($lat)
    {
        $this->lat = $lat;
        return $this;
    }

    /**
     * Get lng value
     * @author Krzysztof Bednarczyk
     * @return mixed
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Set lng value
     * @author Krzysztof Bednarczyk
     * @param mixed $lng
     * @return  $this
     */
    public function setLng($lng)
    {
        $this->lng = $lng;
        return $this;
    }

    /**
     * Get title value
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set title value
     * @author Krzysztof Bednarczyk
     * @param string $title
     * @return  $this
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }


    /**
     * Get icon value
     * @author Krzysztof Bednarczyk
     * @return array|string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set icon value
     * @author Krzysztof Bednarczyk
     * @param array|string $icon
     * @return  $this
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;
        return $this;
    }

    /**
     * Get cluster value
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getCluster()
    {
        return $this->cluster;
    }

    /**
     * Set cluster value
     * @author Krzysztof Bednarczyk
     * @param string $cluster
     * @return  $this
     */
    public function setCluster($cluster)
    {
        $this->cluster = $cluster;
        return $this;
    }

    /**
     * Get customOptions value
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function getCustomOptions()
    {
        return $this->customOptions;
    }

    /**
     * Set customOptions value
     * @author Krzysztof Bednarczyk
     * @param array $customOptions
     * @return  $this
     */
    public function setCustomOptions($customOptions)
    {
        $this->customOptions = $customOptions;
        return $this;
    }



    public function export(){
        return [
            "lat" => $this->lat,
            "lng" => $this->lng,
            "title" => $this->title,
            "icon" => $this->icon,
            "cluster" => $this->cluster,
            "customOptions" => $this->customOptions
        ];
    }

}