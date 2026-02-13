package com.codemart.service;

import com.codemart.dto.ProductDTO;
import com.codemart.entity.Product;
import com.codemart.entity.User;
import com.codemart.repository.ProductRepository;
import com.codemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public ProductDTO createProduct(ProductDTO productDTO, Long sellerId) {
        Optional<User> seller = userRepository.findById(sellerId);
        if (seller.isEmpty()) {
            return null;
        }

        Product product = new Product();
        product.setTitle(productDTO.getTitle());
        product.setDescription(productDTO.getDescription());
        product.setCategory(productDTO.getCategory());
        product.setPrice(productDTO.getPrice());
        product.setLanguage(productDTO.getLanguage());
        product.setDifficulty(productDTO.getDifficulty());
        product.setFeatures(productDTO.getFeatures());
        product.setPreviewUrl(productDTO.getPreviewUrl());
        product.setSeller(seller.get());
        product.setActive(true);

        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findByActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(this::convertToDTO).orElse(null);
    }

    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .filter(Product::isActive)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsBySeller(Long sellerId) {
        return productRepository.findBySellerId(sellerId)
                .stream()
                .filter(Product::isActive)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository.findByTitleContainingIgnoreCase(keyword)
                .stream()
                .filter(Product::isActive)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO, Long sellerId) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty() || !product.get().getSeller().getId().equals(sellerId)) {
            return null;
        }

        Product existingProduct = product.get();
        existingProduct.setTitle(productDTO.getTitle());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setCategory(productDTO.getCategory());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setLanguage(productDTO.getLanguage());
        existingProduct.setDifficulty(productDTO.getDifficulty());
        existingProduct.setFeatures(productDTO.getFeatures());
        existingProduct.setUpdatedAt(LocalDateTime.now());

        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDTO(updatedProduct);
    }

    public void deleteProduct(Long id, Long sellerId) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent() && product.get().getSeller().getId().equals(sellerId)) {
            product.get().setActive(false);
            productRepository.save(product.get());
        }
    }

    private ProductDTO convertToDTO(Product product) {
        AuthService authService = new AuthService();
        return new ProductDTO(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getLanguage(),
                product.getDifficulty(),
                product.getFeatures(),
                product.getPreviewUrl(),
                null,
                product.getCreatedAt(),
                product.getDownloads(),
                product.getRating(),
                product.isActive()
        );
    }
}
