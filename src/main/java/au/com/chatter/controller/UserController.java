package au.com.chatter.controller;

import au.com.chatter.controller.dto.UserSessionDto;
import au.com.chatter.domain.AppUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/session")
    public ResponseEntity<UserSessionDto> getSession(@AuthenticationPrincipal AppUserDetails user) {
        UserSessionDto response = new UserSessionDto(user.id(), user.username());

        return ResponseEntity.ok(response);
    }
}
