package com.mverse.customsoapshop.service.soapfragrance;

import com.mverse.customsoapshop.dto.soapfragrances.SoapFragranceResponse;
import com.mverse.customsoapshop.repository.soapfragrances.SoapFragranceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SoapFragranceServiceImpl implements SoapFragranceService {
    private static final ModelMapper mapper = new ModelMapper();

    private final SoapFragranceRepository soapFragranceRepository;

    @Override
    public List<SoapFragranceResponse> getAll() {
        return soapFragranceRepository.findAll().stream()
          .map(soapFragrance -> mapper.map(soapFragrance, SoapFragranceResponse.class))
          .toList();
    }
}
