package com.marketplace.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ListingDetailDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String location;
    private String category;
    private LocalDateTime createdAt;
    
    // Contact information
    private String contactEmail;
    private String contactPhone;
    private String preferredContact; // "email", "phone", or "both"
    
    // Images
    private List<String> imageUrls;

    private String sellerName;
    private String sellerEmail;
    private String sellerPhone;
} 