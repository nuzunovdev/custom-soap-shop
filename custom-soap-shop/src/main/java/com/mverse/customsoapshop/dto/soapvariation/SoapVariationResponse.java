package com.mverse.customsoapshop.dto.soapvariation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoapVariationResponse {
    Long id;
    String code;
    String name;
    String description;
}
