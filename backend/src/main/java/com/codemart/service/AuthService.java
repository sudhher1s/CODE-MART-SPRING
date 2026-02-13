package com.codemart.service;

import com.codemart.dto.AuthRequest;
import com.codemart.dto.AuthResponse;
import com.codemart.dto.RegisterRequest;
import com.codemart.dto.UserDTO;
import com.codemart.entity.User;
import com.codemart.repository.UserRepository;
import com.codemart.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse register(RegisterRequest request) {
        try {
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                return new AuthResponse(null, null, "Email is required");
            }
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return new AuthResponse(null, null, "Password is required");
            }
            if (request.getFullName() == null || request.getFullName().isEmpty()) {
                return new AuthResponse(null, null, "Full name is required");
            }

            if (userRepository.existsByEmail(request.getEmail())) {
                return new AuthResponse(null, null, "Email already exists");
            }

            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName());
            user.setRole(request.getRole() != null ? request.getRole() : "STUDENT");
            user.setActive(true);

            User savedUser = userRepository.save(user);
            String token = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail());
            UserDTO userDTO = convertToDTO(savedUser);

            return new AuthResponse(token, userDTO, "Registration successful");
        } catch (Exception e) {
            e.printStackTrace();
            return new AuthResponse(null, null, "Error: " + e.getMessage());
        }
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isEmpty()) {
            return new AuthResponse(null, null, "User not found");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return new AuthResponse(null, null, "Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.get().getId(), user.get().getEmail());
        UserDTO userDTO = convertToDTO(user.get());

        return new AuthResponse(token, userDTO, "Login successful");
    }

    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(this::convertToDTO).orElse(null);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return null;
        }

        User existingUser = user.get();
        if (userDTO.getFullName() != null) {
            existingUser.setFullName(userDTO.getFullName());
        }
        if (userDTO.getBio() != null) {
            existingUser.setBio(userDTO.getBio());
        }
        if (userDTO.getProfileImage() != null) {
            existingUser.setProfileImage(userDTO.getProfileImage());
        }

        User updatedUser = userRepository.save(existingUser);
        return convertToDTO(updatedUser);
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getProfileImage(),
                user.getBio(),
                user.getCreatedAt(),
                user.isActive()
        );
    }
}
