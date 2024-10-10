export enum Collections {
    COUNTRIES = 'Countries',
    REGIONS = 'Regions',
    CITIES = 'Cities',
    PLACE_TYPES = 'PlaceTypes',
    PLACES = 'Places',
    SENSOR_IDS = 'SensorIds',
    SENSORS = 'Sensors',
}

export const EdgeCollections = {
    COUNTRY_REGION: {
        ADGE_NAME: 'CountryRegionEdges',
        FROM: Collections.COUNTRIES,
        TO: Collections.REGIONS
    },
    REGION_CITY: {
        ADGE_NAME: 'RegionCityEdges',
        FROM: Collections.REGIONS,
        TO: Collections.CITIES
    },
    CITY_PLACE_TYPE: {
        ADGE_NAME: 'CityPlaceTypeEdges',
        FROM: Collections.CITIES,
        TO: Collections.PLACE_TYPES
    },
    PLACE_TYPE_PLACE: {
        ADGE_NAME: 'PlaceTypePlaceEdges',
        FROM: Collections.PLACE_TYPES,
        TO: Collections.PLACES
    },
    PLACE_SENSOR_ID: {
        ADGE_NAME: 'PlaceSensorIdEdges',
        FROM: Collections.PLACES,
        TO: Collections.SENSOR_IDS
    },
    SENSOR_ID_SENSOR: {
        ADGE_NAME: 'SensorIdSensorEdges',
        FROM: Collections.SENSOR_IDS,
        TO: Collections.SENSORS
    },
};

export enum GraphName {
    GRAPH = 'Graph',
}