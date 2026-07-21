package com.mverse.customsoapshop.controller;

import com.mverse.customsoapshop.dto.soap.SoapResponse;
import com.mverse.customsoapshop.dto.soapfragrances.SoapFragranceResponse;
import com.mverse.customsoapshop.dto.soapvariation.SoapVariationResponse;
import com.mverse.customsoapshop.service.soap.SoapService;
import com.mverse.customsoapshop.service.soapfragrance.SoapFragranceService;
import com.mverse.customsoapshop.service.soapvariation.SoapVariationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CatalogController {
    private final SoapVariationService soapVariationService;
    private final SoapFragranceService soapFragranceService;
    private final SoapService soapService;

    @RequestMapping("/soap-variations")
    public List<SoapVariationResponse> getSoapVariations() {
        return soapVariationService.getAll();
    }

    @RequestMapping("/soap-fragrances")
    public List<SoapFragranceResponse> getSoapFragrances() {
        return soapFragranceService.getAll();
    }

    @RequestMapping("/soaps")
    public List<SoapResponse> getSoaps() {
        return soapService.getAll();
    }
}
