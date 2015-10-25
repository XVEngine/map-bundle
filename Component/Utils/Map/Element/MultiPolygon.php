<?php

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Element;


/**
 * Class MultiPolygon
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\MapBundle\Component\Utils\Map\Element
 */
class MultiPolygon extends AbstractElement
{

    /**
     * @var float[][][]
     */
    protected $polygons = [];

    /**
     * @var string
     */
    protected $title;

    /**
     * @author Krzysztof Bednarczyk
     * @param float[][][] $polygons
     * @return $this
     */
    public function setPolygons(array $polygons){
        $this->polygons = $polygons;
        return $this;
    }

    /**
     * @author Krzysztof Bednarczyk
     * @return float[][][]
     */
    public function getPolygons(){
        return $this->polygons;
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
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function export()
    {
        return [
            "points" => $this->polygons,
            "title" => $this->title
        ];
    }
}