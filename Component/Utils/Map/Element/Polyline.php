<?php
/**
 * @author Krzysztof Bednarczyk
 * User: devno
 * Date: 25.10.2015
 * Time: 00:48
 */

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Element;


class Polyline  extends MultiPolyline
{

    public function export()
    {
        // TODO: Implement export() method.
    }


    /**
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getType()
    {
        return "polyline";
    }
}