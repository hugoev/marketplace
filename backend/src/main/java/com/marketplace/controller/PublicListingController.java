package com.marketplace.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/public/listings")
@Tag(name = "Public Listings", description = "Public endpoints for viewing listings")
public class PublicListingController {

    @Autowired
    private ListingService listingService;

    @Operation(summary = "Get all listings", description = "View all listings without authentication")
    @GetMapping
    public ResponseEntity<Page<ListingDTO>> getListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location) {
        return ResponseEntity.ok(listingService.getPublicListings(page, size, category, location));
    }

    @Operation(summary = "Get listing details", description = "View single listing with contact information")
    @GetMapping("/{id}")
    public ResponseEntity<ListingDetailDTO> getListingDetail(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getPublicListingDetail(id));
    }
} 