package com.mverse.customsoapshop.dto.soap;

import com.mverse.customsoapshop.dto.soapfragrances.SoapFragranceResponse;
import com.mverse.customsoapshop.dto.soapvariation.SoapVariationResponse;
import com.mverse.customsoapshop.entity.soapvariation.SoapVariation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoapResponse {
    private Long id;
    private String name;
    private String description;
    private SoapVariationResponse soapVariation;
    private Set<SoapFragranceResponse> fragrances = new LinkedHashSet<>();
    private String initials;
    private boolean custom;
    private BigDecimal price;
}
