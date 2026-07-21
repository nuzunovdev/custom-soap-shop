package com.mverse.customsoapshop.repository.soap;

import com.mverse.customsoapshop.entity.soap.Soap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoapRepository extends JpaRepository<Soap, Long> {

    @Query("""
        select distinct s
        from Soap s
        left join fetch s.soapVariation
        left join fetch s.fragrances
        """)
    List<Soap> findAllWithDetails();
}
