package com.mverse.customsoapshop.repository.soapfragrances;

import com.mverse.customsoapshop.entity.soapfragrance.SoapFragrance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoapFragranceRepository extends JpaRepository<SoapFragrance, Long> {
}
