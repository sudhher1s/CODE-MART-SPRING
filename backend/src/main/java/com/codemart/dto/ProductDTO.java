package com.codemart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private BigDecimal price;
    private String language;
    private String difficulty;
    private String features;
    private String previewUrl;
    private UserDTO seller;
    private LocalDateTime createdAt;
    private int downloads;
    private double rating;
    private boolean active;
}
