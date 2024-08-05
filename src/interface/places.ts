export interface PlacesAPI {
    type:        string;
    features:    Feature[];
    query:       string[];
    attribution: string;
}

export interface Feature {
    type:            string;
    properties:      Properties;
    geometry:        Geometry;
    bbox:            number[];
    center:          number[];
    place_name:      string;
    place_type:      string[];
    relevance:       number;
    id:              string;
    text:            string;
    place_type_name: null[];
    language:        string;
    text_es:         string;
    language_es:     string;
    place_name_es:   string;
}

export interface Geometry {
    type:        string;
    coordinates: Array<Array<Array<number[]>>>;
}

export interface Properties {
    ref:             string;
    country_code:    string;
    wikidata:        string;
    kind:            string;
    place_type_name: null[];
}
