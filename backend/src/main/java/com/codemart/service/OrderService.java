package com.codemart.service;

import com.codemart.entity.Order;
import com.codemart.entity.Product;
import com.codemart.entity.User;
import com.codemart.repository.OrderRepository;
import com.codemart.repository.ProductRepository;
import com.codemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Order createOrder(Long buyerId, Long productId) {
        Optional<User> buyer = userRepository.findById(buyerId);
        Optional<Product> product = productRepository.findById(productId);

        if (buyer.isEmpty() || product.isEmpty()) {
            return null;
        }

        Order order = new Order();
        order.setBuyer(buyer.get());
        order.setProduct(product.get());
        order.setPrice(product.get().getPrice());
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        // Increment download count
        product.get().setDownloads(product.get().getDownloads() + 1);
        productRepository.save(product.get());

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findByProduct_SellerId(sellerId);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            return null;
        }

        Order existingOrder = order.get();
        existingOrder.setStatus(status);
        if ("COMPLETED".equals(status)) {
            existingOrder.setCompletedAt(LocalDateTime.now());
        }

        return orderRepository.save(existingOrder);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
