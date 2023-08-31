package com.soloproject.soloproject.controllrs;

import com.soloproject.soloproject.ApiResponse;
import com.soloproject.soloproject.controllrs.models.User;
import com.soloproject.soloproject.controllrs.models.dto.LoginFormDTO;
import com.soloproject.soloproject.controllrs.models.dto.RegisterFormDTO;
import com.soloproject.soloproject.data.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Controller
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
    public ResponseEntity<ApiResponse> processRegistrationForm(@RequestBody @Valid RegisterFormDTO registerFormDTO, HttpServletRequest request) {


        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());

        if (existingUser != null) {

            ApiResponse response = new ApiResponse("A user with that username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        User existingEmail = userRepository.findByEmail(registerFormDTO.getEmail());

        if(existingEmail != null){

            ApiResponse response = new ApiResponse("This email is already in uses");
            return ResponseEntity.badRequest().body(response);
        }

        String password = registerFormDTO.getPassword();
        String verifyPassword = registerFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {

            ApiResponse response = new ApiResponse("Passwords do not match");
            return ResponseEntity.badRequest().body(response);

        }

        User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getEmail(), registerFormDTO.getPassword());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        ApiResponse response = new ApiResponse("Registration successful" );
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<ApiResponse> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO, HttpServletRequest request) {

        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());

        if (theUser == null) {
            ApiResponse response = new ApiResponse("The given username does not exist");
            return ResponseEntity.badRequest().body(response);
        }

        String password = loginFormDTO.getPassword();

        if (!theUser.isMatchingPassword(password)) {
            ApiResponse response = new ApiResponse("Invalid password");
            return ResponseEntity.badRequest().body(response);
        }

        // Generate JWT token

        String secretKey = System.getenv("MY_APP_SECRET_KEY");
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        String token = Jwts.builder()
                .setSubject(theUser.getUsername()) // Use the actual user identifier here
                .signWith(key)
                .compact();

        // Set the Authorization header
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        System.out.print(headers);
        ApiResponse response = new ApiResponse("Login successful");
        return ResponseEntity.ok().headers(headers).body(response);
    }



    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest request){
        request.getSession().invalidate();
        ApiResponse response = new ApiResponse("Logout successful");
        return ResponseEntity.ok(response);
    }


}
