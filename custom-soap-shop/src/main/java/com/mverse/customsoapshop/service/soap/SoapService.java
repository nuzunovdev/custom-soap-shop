package com.mverse.customsoapshop.service.soap;

import com.mverse.customsoapshop.dto.soap.SoapResponse;

import java.util.List;

public interface SoapService {
    List<SoapResponse> getAll();
}
