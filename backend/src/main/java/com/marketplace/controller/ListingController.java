package com.marketplace.controller;

import com.marketplace.dto.ListingDTO;
import com.marketplace.service.ListingService;
import com.marketplace.service.UserService;
import com.marketplace.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/listings")
@Tag(name = "Listings", description = "Listing management APIs")
public class ListingController {
    
    @Autowired
    private ListingService listingService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<?> createListing(@RequestBody ListingDTO listingDTO) {
        try {
            // TODO: Get actual user from security context
            return ResponseEntity.ok(listingService.createListing(
                listingDTO, 
                userService.getUserByEmail("test@example.com")
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getListing(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(listingService.getListing(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Search listings", description = "Search listings with filters")
    @GetMapping("/search")
    public ResponseEntity<?> searchListings(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        return ResponseEntity.ok(listingService.searchListings(
            keyword, location, minPrice, maxPrice, categoryId, pageRequest));
    }

    @Operation(summary = "Upload image", description = "Upload an image for a listing")
    @PostMapping("/{listingId}/images")
    public ResponseEntity<?> uploadImage(
            @PathVariable Long listingId,
            @RequestParam("file") MultipartFile file) {
        try {
            String fileName = imageService.storeFile(file);
            // Here you would also save the image reference to the listing
            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 