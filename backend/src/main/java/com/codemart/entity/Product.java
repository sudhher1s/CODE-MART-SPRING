package com.codemart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category; // WEB_PROJECT, MOBILE_APP, CODE_SNIPPET, DESIGN, etc.

    @Column(nullable = false)
    private BigDecimal price;

    private String language; // Java, Python, C++, JavaScript, etc.

    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED

    @Column(columnDefinition = "TEXT")
    private String features;

    private String fileUrl;

    private String previewUrl;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    private int downloads = 0;

    private double rating = 0;

    @Column(nullable = false)
    private boolean active = true;
}
