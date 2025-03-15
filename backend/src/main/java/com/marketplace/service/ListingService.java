package com.marketplace.service;

import com.marketplace.entity.Listing;
import com.marketplace.entity.User;
import com.marketplace.repository.ListingRepository;
import com.marketplace.repository.CategoryRepository;
import com.marketplace.dto.ListingDTO;
import com.marketplace.dto.ListingDetailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingService {
    
    @Autowired
    private ListingRepository listingRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;

    public Listing createListing(ListingDTO listingDTO, User user) {
        Listing listing = new Listing();
        listing.setTitle(listingDTO.getTitle());
        listing.setDescription(listingDTO.getDescription());
        listing.setPrice(listingDTO.getPrice());
        listing.setLocation(listingDTO.getLocation());
        listing.setUser(user);
        listing.setCategory(categoryRepository.findById(listingDTO.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found")));
        
        return listingRepository.save(listing);
    }

    public Listing getListing(Long id) {
        return listingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Listing not found"));
    }

    public Page<Listing> searchListings(
            String keyword,
            String location,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Long categoryId,
            Pageable pageable) {
        
        Specification<Listing> spec = Specification.where(null);
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                cb.or(
                    cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + keyword.toLowerCase() + "%")
                )
            );
        }
        
        if (location != null && !location.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%")
            );
        }
        
        if (minPrice != null) {
            spec = spec.and((root, query, cb) ->
                cb.greaterThanOrEqualTo(root.get("price"), minPrice)
            );
        }
        
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) ->
                cb.lessThanOrEqualTo(root.get("price"), maxPrice)
            );
        }
        
        if (categoryId != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("category").get("id"), categoryId)
            );
        }
        
        return listingRepository.findAll(spec, pageable);
    }

    public Page<ListingDTO> getPublicListings(int page, int size, String category, String location) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        Specification<Listing> spec = Specification.where(null);
        
        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("category").get("name"), category));
        }
        
        if (location != null && !location.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
        }
        
        return listingRepository.findAll(spec, pageRequest)
            .map(this::convertToDTO);
    }

    public ListingDetailDTO getListingDetail(Long id) {
        Listing listing = getListing(id);
        ListingDetailDTO dto = new ListingDetailDTO();
        dto.setId(listing.getId());
        dto.setTitle(listing.getTitle());
        dto.setDescription(listing.getDescription());
        dto.setPrice(listing.getPrice());
        dto.setLocation(listing.getLocation());
        dto.setCategory(listing.getCategory().getName());
        dto.setCreatedAt(listing.getCreatedAt());
        dto.setSellerName(listing.getUser().getFirstName() + " " + listing.getUser().getLastName());
        dto.setSellerEmail(listing.getUser().getEmail());
        dto.setSellerPhone(listing.getUser().getPhoneNumber());
        return dto;
    }

    public List<ListingDTO> getListings(int page, int size) {
        Page<Listing> listingPage = listingRepository.findAll(PageRequest.of(page, size));
        return listingPage.getContent().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private ListingDTO convertToDTO(Listing listing) {
        ListingDTO dto = new ListingDTO();
        dto.setTitle(listing.getTitle());
        dto.setDescription(listing.getDescription());
        dto.setPrice(listing.getPrice());
        dto.setCategoryId(listing.getCategory().getId());
        dto.setLocation(listing.getLocation());
        return dto;
    }
} 