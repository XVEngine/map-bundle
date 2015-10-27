<?php

namespace XVEngine\Bundle\MapBundle\Component\Utils\Map\Element;


/**
 * Class MultiPolygon
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\MapBundle\Component\Utils\Map\Element
 */
class HeatMap extends AbstractElement
{

    /**
     * @var array
     */
    protected $data;

    /**
     * Get data value
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set data value
     * @author Krzysztof Bednarczyk
     * @param array $data
     * @return  $this
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function export()
    {
        return [
            "data" => $this->getData()
        ];
    }
}