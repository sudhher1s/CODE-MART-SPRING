package com.codemart.repository;

import com.codemart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findBySellerId(Long sellerId);
    List<Product> findByActiveTrue();
    List<Product> findByTitleContainingIgnoreCase(String title);
    List<Product> findByLanguageAndActiveTrue(String language);
}
