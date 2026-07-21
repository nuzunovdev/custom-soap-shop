package com.mverse.customsoapshop.service.soapvariation;

import com.mverse.customsoapshop.dto.soapvariation.SoapVariationResponse;
import com.mverse.customsoapshop.repository.soapvariation.SoapVariationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SoapVariationServiceImpl implements SoapVariationService {
    private static final ModelMapper mapper = new ModelMapper();
    private final SoapVariationRepository soapVariationRepository;

    @Override
    public List<SoapVariationResponse> getAll() {
        return soapVariationRepository.findAll().stream()
          .map(soapVariation -> mapper.map(soapVariation, SoapVariationResponse.class))
          .toList();
    }
}
