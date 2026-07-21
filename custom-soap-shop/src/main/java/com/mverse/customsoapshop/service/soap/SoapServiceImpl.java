package com.mverse.customsoapshop.service.soap;

import com.mverse.customsoapshop.dto.soap.SoapResponse;
import com.mverse.customsoapshop.repository.soap.SoapRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SoapServiceImpl implements SoapService {
    private static final ModelMapper mapper = new ModelMapper();

    private final SoapRepository soapRepository;

    @Override
    public List<SoapResponse> getAll() {
        return soapRepository.findAllWithDetails().stream()
          .map(soap -> mapper.map(soap, SoapResponse.class))
          .toList();
    }
}
