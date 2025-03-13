package com.marketplace.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "listing_images")
public class ListingImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @Column(nullable = false)
    private String imageUrl;

    @Column
    private Integer displayOrder;
} 