<?php

namespace XVEngine\Bundle\MapBundle\Component\Utils;


use XVEngine\Bundle\MapBundle\Component\Utils\Map\Tile;
use XVEngine\Core\Component\AbstractComponent;

/**
 * Class MapComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\ComponentsBundle\Component\Utils
 */
class MapComponent extends AbstractComponent
{

    /**
     * @var Tile[]
     */
    protected $tiles = [];

    public function initialize()
    {
        $this->setComponentName('utils.mapComponent');

        $this->setParam("leafletLibs", [
            "//cdn.rawgit.com/bordeux/Leaflet/Version0.7.5/dist/leaflet-src.js",
            "//cdn.rawgit.com/bordeux/Leaflet.markercluster/d4e9127/dist/leaflet.markercluster-src.js",
            //"//cdn.rawgit.com/bordeux/leaflet-plugins/master/layer/tile/Google.js", we dont need this commercial shit
            //"//cdn.rawgit.com/bordeux/leaflet-plugins/master/layer/tile/Bing.js",
            "//cdn.rawgit.com/bordeux/Leaflet-MiniMap/master/dist/Control.MiniMap.min.js",
            "//cdn.rawgit.com/bordeux/Leaflet.MousePosition/master/src/L.Control.MousePosition.js",
            "//cdn.rawgit.com/bordeux/Leaflet.ZoomBox/master/L.Control.ZoomBox.js",
            "//cdn.rawgit.com/bordeux/Leaflet.zoomslider/master/src/L.Control.Zoomslider.js"
        ]);

        $this->setParam("leafletLibCss", [
            "//cdn.rawgit.com/bordeux/Leaflet/Version0.7.5/dist/leaflet.css",
            "//cdn.rawgit.com/bordeux/Leaflet.markercluster/master/dist/MarkerCluster.css",
            "//cdn.rawgit.com/bordeux/Leaflet.markercluster/master/dist/MarkerCluster.Default.css",
            "//cdn.rawgit.com/bordeux/Leaflet-MiniMap/master/dist/Control.MiniMap.min.css",
            "//cdn.rawgit.com/bordeux/Leaflet.MousePosition/master/src/L.Control.MousePosition.css",
            "//cdn.rawgit.com/bordeux/Leaflet.ZoomBox/master/L.Control.ZoomBox.css",
            "//cdn.rawgit.com/bordeux/Leaflet.zoomslider/4ca32ae/src/L.Control.Zoomslider.css",
        ]);

        $this->setParamByRef("tiles", $this->tiles);

    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $key
     * @return $this
     */
    public function setApiKey($key)
    {
        return $this->setParam("apiKey", $key);
    }

    /**
     * Get tiles value
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function getTiles()
    {
        return $this->tiles;
    }

    /**
     * Set tiles value
     * @author Krzysztof Bednarczyk
     * @param array $tiles
     * @return  $this
     */
    public function setTiles($tiles)
    {
        $this->tiles = $tiles;
        return $this;
    }




    /**
     * @author Krzysztof Bednarczyk
     * @param $options
     * @return $this
     */
    public function setMapOptions($options)
    {
        return $this->setParam("mapOptions", $options);
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param Tile $tile
     * @param array $options
     * @return $this
     */
    public function setMiniMap(Tile $tile, array $options  = [])
    {
        return $this->setParam("miniMap", [
            "tile" => $tile,
            "options" => $options
        ]);
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param AbstractComponent|null $component
     * @return $this
     */
    public function setRightPanelComponent(AbstractComponent $component = null){
        return $this->setParam("rightPanelComponent", $component);
    }



}
