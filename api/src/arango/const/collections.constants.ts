export enum Collections {
    COUNTRIES = 'Countries',
    REGIONS = 'Regions',
    CITIES = 'Cities',
    PLACE_TYPES = 'PlaceTypes',
    PLACES = 'Places',
    SENSORIDS = 'SensorIds',
}

export enum EdgeCollections {
    COUNTRY_REGION = 'CountryRegionEdges',
    REGION_CITY = 'RegionCityEdges',
    CITY_PLACE_TYPE = 'CityPlaceTypeEdges',
    PLACE_TYPE_PLACE = 'PlaceTypePlaceEdges',
    PLACE_SENSORID = 'PlaceSensorIdEdges',
}

export  enum GraphName {
   GRAPH = "Graph"
}
