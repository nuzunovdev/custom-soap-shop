package com.mverse.customsoapshop.service.soap;

import com.mverse.customsoapshop.dto.order.CreateOrderItemRequest;
import com.mverse.customsoapshop.dto.soap.SoapResponse;
import com.mverse.customsoapshop.entity.soap.Soap;

import java.util.List;

public interface SoapService {
    List<SoapResponse> getAll();

    Soap getReadySoap(Long soapId);

    Soap createCustomSoap(CreateOrderItemRequest itemRequest);
}
