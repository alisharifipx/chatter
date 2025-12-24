package au.com.chatter.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST API controller for Users.
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    @GetMapping("/welcome")
    public String welcome(@AuthenticationPrincipal UserDetails user) {
        return String.format("Welcome, %s!", user.getUsername());
    }
}
