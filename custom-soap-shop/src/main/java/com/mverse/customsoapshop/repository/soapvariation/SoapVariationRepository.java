package com.mverse.customsoapshop.repository.soapvariation;

import com.mverse.customsoapshop.entity.soapvariation.SoapVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoapVariationRepository extends JpaRepository<SoapVariation, Long> {
}
