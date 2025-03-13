package com.marketplace.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ListingDTO {
    private String title;
    private String description;
    private BigDecimal price;
    private Long categoryId;
    private String location;
} 