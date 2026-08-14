package com.mverse.customsoapshop.service.soap;

import com.mverse.customsoapshop.dto.order.CreateOrderItemRequest;
import com.mverse.customsoapshop.dto.soap.SoapResponse;
import com.mverse.customsoapshop.entity.soap.Soap;
import com.mverse.customsoapshop.entity.soapfragrance.SoapFragrance;
import com.mverse.customsoapshop.entity.soapvariation.SoapVariation;
import com.mverse.customsoapshop.repository.soap.SoapRepository;
import com.mverse.customsoapshop.repository.soapfragrances.SoapFragranceRepository;
import com.mverse.customsoapshop.repository.soapvariation.SoapVariationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SoapServiceImpl implements SoapService {

    private static final BigDecimal CUSTOM_SOAP_PRICE = new BigDecimal("16.99");
    private static final ModelMapper mapper = new ModelMapper();

    private final SoapRepository soapRepository;
    private final SoapVariationRepository soapVariationRepository;
    private final SoapFragranceRepository soapFragranceRepository;

    @Override
    public List<SoapResponse> getAll() {
        return soapRepository.findAllWithDetails().stream()
          .map(soap -> mapper.map(soap, SoapResponse.class))
          .toList();
    }

    @Override
    public Soap getReadySoap(Long soapId) {
        if (soapId == null) {
            throw new IllegalArgumentException("soapId is required for ready soap item.");
        }

        Soap soap = soapRepository.findById(soapId)
          .orElseThrow(() -> new IllegalArgumentException("Soap not found."));

        if (soap.isCustom()) {
            throw new IllegalArgumentException("Ready soap item cannot use custom soap.");
        }

        if (!soap.isActive()) {
            throw new IllegalArgumentException("Soap is not active.");
        }

        return soap;
    }

    @Override
    public Soap createCustomSoap(CreateOrderItemRequest itemRequest) {
        if (itemRequest.getSoapVariationId() == null) {
            throw new IllegalArgumentException("soapVariationId is required for custom soap.");
        }

        if (itemRequest.getSoapFragranceIds() == null || itemRequest.getSoapFragranceIds().isEmpty()) {
            throw new IllegalArgumentException("At least one fragrance is required for custom soap.");
        }

        if (itemRequest.getSoapFragranceIds().size() > 2) {
            throw new IllegalArgumentException("Maximum two fragrances are allowed.");
        }

        SoapVariation variation = soapVariationRepository.findById(itemRequest.getSoapVariationId())
          .orElseThrow(() -> new IllegalArgumentException("Soap variation not found."));

        List<SoapFragrance> fragrances = soapFragranceRepository.findAllById(itemRequest.getSoapFragranceIds());

        if (fragrances.size() != itemRequest.getSoapFragranceIds().size()) {
            throw new IllegalArgumentException("One or more fragrances were not found.");
        }

        String soapName = buildCustomSoapName(variation, fragrances);

        Soap customSoap = Soap.builder()
          .name(soapName)
          .description("Custom handmade soap")
          .soapVariation(variation)
          .fragrances(new LinkedHashSet<>(fragrances))
          .initials(itemRequest.getInitials())
          .custom(true)
          .price(CUSTOM_SOAP_PRICE)
          .active(true)
          .imageUrl("/images/soaps/custom.jpg")
          .build();

        return soapRepository.save(customSoap);
    }

    private String buildCustomSoapName(SoapVariation variation, List<SoapFragrance> fragrances) {
        String fragranceNames = fragrances.stream()
          .map(SoapFragrance::getName)
          .sorted()
          .reduce((first, second) -> first + " + " + second)
          .orElse("");

        return variation.getName() + " - " + fragranceNames;
    }
}
