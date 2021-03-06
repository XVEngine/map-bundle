<?php

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Element;


/**
 * Class Polygon
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\MapBundle\Component\Utils\Map\Element
 */
class Polygon extends MultiPolygon
{

    /**
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getType()
    {
        return "polygon";
    }
}