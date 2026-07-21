package com.mverse.customsoapshop.dto.soapfragrances;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoapFragranceResponse {
    private Long id;
    private String code;
    private String name;
    private String description;
}
