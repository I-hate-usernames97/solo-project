package com.soloproject.soloproject.controllrs;

import com.soloproject.soloproject.ApiResponse;
import com.soloproject.soloproject.controllrs.models.User;
import com.soloproject.soloproject.controllrs.models.dto.LoginFormDTO;
import com.soloproject.soloproject.controllrs.models.dto.RegisterFormDTO;
import com.soloproject.soloproject.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
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

    @GetMapping("/register")
    public String displayRegistrationForm(Model model) {
        model.addAttribute(new RegisterFormDTO());
        model.addAttribute("title", "Register");
        return "register";
    }


    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<ApiResponse> processRegistrationForm(@RequestBody @Valid RegisterFormDTO registerFormDTO, HttpServletRequest request) {

//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Register");
//            return ResponseEntity.ok(errors.toString());
//        }

        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());

        if (existingUser != null) {
//            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
//            model.addAttribute("title", "Register");
            ApiResponse response = new ApiResponse("A user with that username already exists");
            return ResponseEntity.ok(response);
        }

        User existingEmail = userRepository.findByEmail(registerFormDTO.getEmail());

        if(existingEmail != null){
//            errors.rejectValue("email", "eamil.alreadyexists", "This email is already in uses");
//            model.addAttribute("title", "Register");
            ApiResponse response = new ApiResponse("This email is already in uses");
            return ResponseEntity.ok(response);
        }

        String password = registerFormDTO.getPassword();
        String verifyPassword = registerFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
//            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
//            model.addAttribute("title", "Register");
            ApiResponse response = new ApiResponse("Passwords do not match");
            return ResponseEntity.ok(response);

        }

        User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getEmail(), registerFormDTO.getPassword());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        ApiResponse response = new ApiResponse("Registration successful");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/login")
    public String displayLoginForm(Model model) {
        model.addAttribute(new LoginFormDTO());
        model.addAttribute("title", "Log In");
        return "login";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO, HttpServletRequest request) {

//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Log In");
//            return "login";
//        }

        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());

        if (theUser == null) {
//            errors.rejectValue("username", "user.invalid", "The given username does not exist");
//            model.addAttribute("title", "Log In");
            return ResponseEntity.ok("The given username does not exist");
        }

        String password = loginFormDTO.getPassword();

        if (!theUser.isMatchingPassword(password)) {
//            errors.rejectValue("password", "password.invalid", "Invalid password");
//            model.addAttribute("title", "Log In");
            return ResponseEntity.ok("Invalid password");
        }

        setUserInSession(request.getSession(), theUser);

        return ResponseEntity.ok("Registration successful");
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "redirect:/login";
    }


}
