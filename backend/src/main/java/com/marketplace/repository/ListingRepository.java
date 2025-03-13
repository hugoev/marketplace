package com.marketplace.repository;

import com.marketplace.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Long>, JpaSpecificationExecutor<Listing> {
    List<Listing> findByCategoryId(Long categoryId);
    List<Listing> findByUserId(Long userId);
    List<Listing> findByLocationContainingIgnoreCase(String location);
} 