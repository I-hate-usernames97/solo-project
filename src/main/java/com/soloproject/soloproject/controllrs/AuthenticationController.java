package com.soloproject.soloproject.controllrs;

import com.soloproject.soloproject.ApiResponse;
import com.soloproject.soloproject.controllrs.models.User;
import com.soloproject.soloproject.controllrs.models.dto.LoginFormDTO;
import com.soloproject.soloproject.controllrs.models.dto.RegisterFormDTO;
import com.soloproject.soloproject.data.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.security.Key;
import java.sql.Date;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.POST})
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<ApiResponse> processRegistrationForm(@RequestBody @Valid RegisterFormDTO registerForm, HttpServletRequest request) {

        // Check if a user with the username already exists
        User existingUser = userRepository.findByUsername(registerForm.getUsername());
        if (existingUser != null) {
            ApiResponse response = new ApiResponse("A user with that username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if a user with the email already exists
        User existingEmail = userRepository.findByEmail(registerForm.getEmail());
        if (existingEmail != null) {
            ApiResponse response = new ApiResponse("This email is already in use");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if passwords match
        String password = registerForm.getPassword();
        String verifyPassword = registerForm.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            ApiResponse response = new ApiResponse("Passwords do not match");
            return ResponseEntity.badRequest().body(response);
        }

        // saves the user
        User newUser = new User(registerForm.getUsername(), registerForm.getEmail(), registerForm.getPassword());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        ApiResponse response = new ApiResponse("Registration successful" );
        return ResponseEntity.ok(response);

    }



    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<ApiResponse> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO, HttpServletRequest request) {
        User user = userRepository.findByUsername(loginFormDTO.getUsername());

        if (user == null) {
            ApiResponse response = new ApiResponse("The given username does not exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        String password = loginFormDTO.getPassword();

        if (!user.isMatchingPassword(password)) {
            ApiResponse response = new ApiResponse("Invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Generate JWT token with expiration time (e.g., 1 hour)
        String secretKey = System.getenv("MY_APP_SECRET_KEY");
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                .signWith(key)
                .compact();

        // Log statement for demonstration purposes
        System.out.println("Generated token: " + token);

        ApiResponse response = new ApiResponse("Login successful");
        System.out.println(ResponseEntity.ok().header("Authorization", "Bearer " + token).body(response));
        return ResponseEntity.ok().header("Authorization", "Bearer " + token).body(response);
    }


    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        ApiResponse response = new ApiResponse("Logout successful");
        return ResponseEntity.ok(response);
    }


}
