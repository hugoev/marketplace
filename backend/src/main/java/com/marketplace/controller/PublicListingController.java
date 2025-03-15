package com.marketplace.controller;

import com.marketplace.dto.ListingDTO;
import com.marketplace.dto.ListingDetailDTO;
import com.marketplace.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public/listings")
public class PublicListingController {
    
    @Autowired
    private ListingService listingService;

    @GetMapping
    public ResponseEntity<List<ListingDTO>> getListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(listingService.getListings(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDetailDTO> getListingDetail(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListingDetail(id));
    }
} 