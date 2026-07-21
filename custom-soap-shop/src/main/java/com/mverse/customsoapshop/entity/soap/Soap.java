package com.mverse.customsoapshop.entity.soap;

import com.mverse.customsoapshop.entity.soapfragrance.SoapFragrance;
import com.mverse.customsoapshop.entity.soapvariation.SoapVariation;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "soaps")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Soap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "soap_variation_id", nullable = false)
    private SoapVariation soapVariation;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
      name = "soap_fragrance_mappings",
      joinColumns = @JoinColumn(name = "soap_id"),
      inverseJoinColumns = @JoinColumn(name = "soap_fragrance_id")
    )
    private Set<SoapFragrance> fragrances = new LinkedHashSet<>();

    @Column(length = 5)
    private String initials;

    @Column(name = "is_custom", nullable = false)
    private boolean custom = false;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private boolean active = true;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;
}
