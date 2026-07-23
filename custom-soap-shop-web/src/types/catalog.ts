export type SoapVariation = {
    id: number;
    code: string;
    name: string;
    description: string | null;
};

export type SoapFragrance = {
    id: number;
    code: string;
    name: string;
    description: string | null;
};

export type Soap = {
    id: number;
    name: string;
    description: string | null;
    soapVariation: SoapVariation;
    fragrances: SoapFragrance[];
    initials: string | null;
    custom: boolean;
    price: number;
};