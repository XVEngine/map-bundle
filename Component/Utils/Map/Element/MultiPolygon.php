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
    protected $html;

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


    public function setHtml($value = null){
        $this->html = $value;
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
            "html" => $this->html,
        ];
    }

    /**
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getType()
    {
        return "multiPolygon";
    }
}